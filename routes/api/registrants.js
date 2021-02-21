const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const uniqid = require('uniqid');
const moment = require('moment');
const normalizeUrl = require('normalize-url');

//Models
const Registrant = require('../../models/Registrant');
const User = require('../../models/User');

//Middleware
const { headerCheckTokenMiddleware } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

//helpers
const { charReplacer } = require('../../helpers/textFormater');

// @route      POST api/registrants/:eventId
// @desc       Register user to an event
// @access     public
router.post(
  '/data/:userId/:eventId',
  [
    headerCheckTokenMiddleware,
    checkObjectId('eventId'),
    checkObjectId('userId'),
  ],
  async (req, res) => {
    const {
      userId,
      eventId,
      eventTitle,
      dataFromPaymentSelected,
      data,
      payThrough,
      amountToPay,
    } = req.body;

    let user = await User.findById(req.params.userId);
    console.log(user.id);
    if (!user) {
      return res.status(404).json({ email: 'User not found!' });
    } else {
      try {
        console.log(
          moment()
            .add(process.env.REGISTRATION_EXPIRATION, 'days')
            .format('MMM DD, YYYY hh:mm a'),
        );
        let timeToExpire = moment().add(
          process.env.REGISTRATION_EXPIRATION,
          'days',
        );
        let transactionId = uniqid();
        registrant = new Registrant({
          userId,
          event: eventId,
          transactionId,
          status: 'unpaid',
          payment: {
            payThrough,
            amountToPay,
            timeToExpire,
          },
          data: data,
        });

        console.log(registrant);

        registrant.save();

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          type: 'SMTP',
          host: 'smtp.gmail.com',
          secure: true,
          auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_EMAIL_PASS,
          },
        });

        const emailData = {
          from: process.env.GOOGLE_EMAIL,
          to: data.email,
          subject: `Registration for ${eventTitle}`,
          html: `
                <h2>You can now process your payment through ${payThrough}</h2>
                <p>Receiver's Name:  ${
                  dataFromPaymentSelected.nameOfReceiver
                }</p>
                <p>Account Number :  ${
                  dataFromPaymentSelected.accountNumber
                }</p>
                <p>Transaction ID :  ${transactionId}</p>
                <p><h3>Here's your link:  <a href='${
                  process.env.NODE_ENV === 'development'
                    ? process.env.CLIENT_URL
                    : process.env.PORT
                }/${charReplacer(
            eventTitle,
            ' ',
            '-',
          ).toLowerCase()}/registration/${userId}/${transactionId}'>${
            process.env.NODE_ENV === 'development'
              ? process.env.CLIENT_URL
              : process.env.PORT
          }/${charReplacer(
            eventTitle,
            ' ',
            '-',
          ).toLowerCase()}/registration/${userId}/${transactionId}</a></h3></p>
                <hr />
                <h4 style='color: red'>NOTE: Your reservation will expire on <h3 style='color: red'>${moment(
                  timeToExpire,
                ).format('MMM DD, YYYY hh:mm a')}</h3>.</h4>
            `,
        };
        transporter.sendMail(emailData, function (error, info) {
          if (error) {
            return res.status(500).json({
              msg: `Cannot send link to ${data.email}. There's a failure in our side.`,
            });
          } else {
            return res.json({
              msg: `Link was successfully sent to ${data.email}. Please Check your Inbox`,
              timeToExpire,
              transactionId,
            });
          }
        });
      } catch (err) {
        console.log(err);
        res.json({
          msg: `We're sorry there's a failure in our side. Please try again later`,
        });
      }
    }
  },
);

// @route      GET api/user/get-upcoming-activity-by-transactionId/:userId/:transactionId
// @desc       Get upcoming registrants by transactionId
// @access     private
router.get(
  '/get-upcoming-activity-by-transactionId/:userId/:transactionId',
  [checkObjectId('userId')],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) return res.status(400).json({ msg: 'User not found' });
      const getRegistrantsByTransactionId = await Registrant.findOne({
        userId: user._id,
        transactionId: req.params.transactionId,
      }).populate('event', [
        'endDate',
        'title',
        'distanceTypeIsKM',
        'startDate',
      ]);
      console.log(getRegistrantsByTransactionId);
      res.json(getRegistrantsByTransactionId);
    } catch (err) {
      console.log(err);
      res.json({
        msg: `Error on getting registrants information. Please try again later`,
      });
    }
  },
);

// @route      POST api/registrants/upload-receipt-image/registrantsId
// @desc       Get upcoming activities
// @access     private
router.post(
  '/upload-receipt-image/:registrantsId',
  checkObjectId('registrantsId'),
  async (req, res) => {
    const { paymentImage } = req.body;
    console.log(paymentImage);
    try {
      const registrant = await Registrant.findById(req.params.registrantsId);
      console.log(registrant);
      //deconstructing registrant (response)
      const {
        _id,
        event,
        userId,
        transactionId,
        status,
        payment: { payThrough, amountToPay, timeToExpire },
        data,
        dateRegistered,
      } = registrant;
      const newRegistrantsInfo = {
        event,
        userId,
        transactionId,
        status: 'in-review',
        paymentImage: normalizeUrl(paymentImage, { forceHttps: true }),
        payment: {
          payThrough,
          amountToPay,
          timeToExpire,
          datePaymentProcessed: moment(),
        },
        data,
        dateRegistered,
      };
      //save or update a registrant
      let saveUpdatedRegistrant = await Registrant.findOneAndUpdate(
        { userId, _id },
        { $set: newRegistrantsInfo },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      console.log(saveUpdatedRegistrant);
      res.json({
        msg: 'Image was successfully saved to our database.',
        newRegistrantData: saveUpdatedRegistrant,
      });
    } catch (err) {
      console.log(err);
      res.json({ msg: `Error on saving picture. Please try again` });
    }
  },
);

module.exports = router;
