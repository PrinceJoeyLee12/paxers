const express = require('express');
const router = express.Router();
const ContactForm = require('../../models/ContactForm');

const validateContactFormInput = require('../../helpers/contactUsValidate');
const { last } = require('lodash');

// @route    POST api/contact-us
// @desc     get searched event by title
// @access   Public
router.post('/', async (req, res) => {
  const { isValid, errors } = validateContactFormInput(req.body);
  const {
    firstName,
    lastName,
    email,
    message,
    formated_contactNumber,
    dialCode,
  } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    concern = new ContactForm({
      firstName,
      lastName,
      number: dialCode.concat(formated_contactNumber),
      email,
      message,
    });
    await concern.save();

    res.json({
      msg: `We already sent your to one of our team please wait for there reply. Thank You!`,
    });
  } catch (err) {
    res.json({
      msg: `We have some difficulties logging your concern. Please try again later.`,
    });
  }
});

module.exports = router;
