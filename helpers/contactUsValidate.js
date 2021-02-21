const Validator = require('validator');
const isEmpty = require('is-empty');
const { compareSync } = require('bcryptjs');

module.exports = function validateContactFormInput(data) {
  let errors = {};

  let number = data.formated_contactNumber;

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  number = !isEmpty(number) ? number : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // number checks
  if (Validator.isEmpty(number)) {
    errors.number = 'Number field is required';
  }

  if (!Validator.isLength(number, { min: 10, max: 10 })) {
    errors.number = 'Contact Number must be 10 digits (minus the country code)';
  }

  if (!Validator.isLength(data.message, { min: 20 })) {
    errors.message = 'Message must be at least 20 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
