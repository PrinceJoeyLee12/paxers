const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const gravatar = require('gravatar');
const normalizeUrl = require('normalize-url');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
//utils
const passwordGenerator = require('../../utils/passwordGenerator');

//models
const User = require('../../models/User');

//helpers
const validateRegisterInput = require('../../helpers/registerValidate');
const {
  validateChangePasswordInput,
} = require('../../helpers/resetPasswordValidate');

const checkObjectId = require('../../middleware/checkObjectId');
const { headerCheckTokenMiddleware } = require('../../middleware/auth');
const validateProfileDetailsInput = require('../../helpers/updateProfileValidate');

// @route      POST api/user/register
// @desc       Register new user
// @access     public
router.post('/register', async (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      if (user.password.includes('password-')) {
        return res.status(400).json({
          email:
            "You've logged in using google. \n lately try to login with your google account",
        });
      }
      return res.status(400).json({ email: 'User already exist try Login' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    user.image = normalizeUrl(gravatar(email, { s: '200', r: 'pg', d: 'mm' }), {
      forceHttps: true,
    });

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err)
          return res.json({ msg: 'Cannot generate token as of the moment' });
        console.log(token);
        res.json({ token });
      },
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route      POST api/user/update-user-profile-picture/:userId
// @desc       Update profile picture
// @access     public
router.post(
  '/update-user-profile-picture/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    const { file } = req.body;
    try {
      const user = await User.findById(req.params.userId);

      if (!user)
        return res.status(404).json({ msg: 'Request denied, user not found' });

      if (!file)
        return res
          .status(404)
          .json({ msg: 'Request denied, file should not be empty' });

      console.log(file);
      cloudinary.image(file, {
        secure: true,
        transformation: [{ width: 200, height: 200 }],
      });

      //Upload file to cloudinary
      cloudinary.uploader.upload(file, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            msg:
              "There's something wrong saving your picture. Please try again later",
          });
        }
        try {
          // Using upsert option (creates new doc if no match is found):
          console.log(result);
          const image = normalizeUrl(result.secure_url, {
            forceHttps: true,
          });
          async () => {
            let updatedUser = await User.findOneAndUpdate(
              { _id },
              { image },
              { new: true, upsert: true, setDefaultsOnInsert: true },
            );
            console.log(updatedUser);
            res.json({ msg: 'Successfully Changed', user: updatedUser });
          };
        } catch (err) {
          console.error(err.message);
          return res.status(400).json({
            msg:
              "There's something wrong saving your picture. Please try again later",
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.json({
        msg: "There's an error saving you profile please try again later",
      });
    }
  },
);

// @route      POST api/user/update-user-profile-details/:userId
// @desc       Update profile picture
// @access     public
router.post(
  '/update-user-profile-details/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      contactNumber,
      myLocation,
      mySports,
      eventsLiked,
      dialCode,
    } = req.body;

    console.log(birthDate);

    const { isValid, errors } = validateProfileDetailsInput(req.body);

    if (!isValid) {
      console.log(errors);
      return res.status(403).json(errors);
    }

    try {
      const user = await User.findById(req.params.userId);

      if (!user)
        return res.status(404).json({ msg: 'Request denied, user not found' });

      const { _id } = user;

      const toUpdateUser = {
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        contactNumber: dialCode.concat(contactNumber).trim(),
        myLocation,
        mySports: Array.isArray(mySports)
          ? mySports
          : mySports.split(',').map(sport => ' ' + sport.trim()),
        eventsLiked,
      };
      console.log(birthDate);

      try {
        // Using upsert option (creates new doc if no match is found):
        let updatedUser = await User.findOneAndUpdate(
          { _id },
          { $set: toUpdateUser },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        ).select('-password');

        console.log(updatedUser.birthDate);

        res.json({ user: updatedUser, msg: 'Update success' });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          msg: "There's an error saving you profile please try again later",
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        msg: "There's an error saving you profile please try again later",
      });
    }
  },
);

// @route      PUT api/user/update-user-profile-details/:userId
// @desc       Update profile picture
// @access     public
router.put(
  '/settings/change-unit/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    const { preferredMeasurementIsMetric } = req.body;

    console.log(preferredMeasurementIsMetric);

    try {
      const user = await User.findById(req.params.userId);

      if (!user)
        return res.status(404).json({ msg: 'Request denied, user not found' });
      console.log(user);

      const { _id } = user;

      try {
        // Using upsert option (creates new doc if no match is found):
        let toUpdateUserSettings = await User.findOneAndUpdate(
          { _id },
          { preferredMeasurementIsMetric },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        ).select('-password');

        console.log(toUpdateUserSettings);

        res.json({ msg: 'Update success' });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          msg: "There's an error saving you profile please try again later",
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        msg: "There's an error saving you profile please try again later",
      });
    }
  },
);

// @route      POST api/user/change-password/:id
// @desc       Update password
// @access     private
router.post(
  '/settings/change-password/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    const { password } = req.body;

    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(400).json({ msg: 'User not found' });

      const { isValid, errors } = await validateChangePasswordInput(
        req.body,
        user.password,
      );

      if (!isValid) {
        return res.status(400).json(errors);
      }
      // Hash password before saving in database
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      //update new password
      await User.findOneAndUpdate(
        { _id: user._id },
        { password: newPassword },
        { new: true },
      )
        .then(result => {
          res.json({ msg: `Updated` });
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ msg: `Unable to update password. Please try again.` });
        });
    } catch (err) {
      console.log(err);
      res.json({ msg: `Error on updating settings` });
    }
  },
);

// @route      POST api/user/password/:id
// @desc       Update password
// @access     private
router.post(
  '/settings/send-temporary-password/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findById(req.params.userId);

      if (!user) return res.status(400).json({ msg: 'User not found' });

      try {
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

        const tempPasswordGenerator = passwordGenerator(7);
        console.log(`Password: ${tempPasswordGenerator}`);

        const emailData = {
          from: process.env.GOOGLE_EMAIL,
          to: email,
          subject: `Temporary Password`,
          html: `
                <h3>Your Temporary Password is </h3>
                <p><h2> ${tempPasswordGenerator} </h2></p>
                <hr />
                <p>You can use this password from now on. But if you wish to change this, make this one as your old password</p>
            `,
        };
        transporter.sendMail(emailData, async function (error, info) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              msg: `Cannot send link to ${email}. There's a failure in our side.`,
            });
          } else {
            // Hash password before saving in database
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(tempPasswordGenerator, salt);

            await User.findOneAndUpdate(
              { _id: req.params.userId },
              { password },
              { new: true },
            )
              .then(result => {
                console.log(result.password);
                res.json({
                  msg: `Password was successfully sent to ${email}. Please Check your Inbox`,
                });
              })
              .catch(err => {
                console.log(err);
                res.json({
                  msg:
                    'Please neglect using that password we sent to your email for we have field to save that on our database. Just try Again',
                });
              });
          }
        });
      } catch (err) {
        console.log(err);
        res.json({
          msg: `Cannot send link to ${data.email}. There's a failure in our side.`,
        });
      }
    } catch (err) {
      console.log(err);
      res.json({ msg: `Error on updating settings` });
    }
  },
);

module.exports = router;
