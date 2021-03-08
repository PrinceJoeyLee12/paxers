const Validator = require('validator');
const isEmpty = require('is-empty');
const moment = require('moment');

module.exports = function validateProfileDetailsInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName.trim() : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName.trim() : '';
  data.email = !isEmpty(data.email) ? data.email.trim() : '';
  data.birthDate = !isEmpty(data.birthDate) ? data.birthDate.trim() : '';
  data.contactNumber = !isEmpty(data.contactNumber)
    ? data.contactNumber.trim()
    : '';
  data.myLocation.barangay = !isEmpty(data.myLocation.barangay)
    ? data.myLocation.barangay.trim()
    : '';
  data.myLocation.city = !isEmpty(data.myLocation.city)
    ? data.myLocation.city.trim()
    : '';
  data.myLocation.country = !isEmpty(data.myLocation.country)
    ? data.myLocation.country.trim()
    : '';
  data.mySports = !isEmpty(data.mySports) ? data.mySports.trim() : '';
  data.dialCode = !isEmpty(data.dialCode) ? data.dialCode.trim() : '';

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

  // Birthdate
  if (Validator.isEmpty(data.birthDate)) {
    errors.birthDate = 'Birthdate field is required';
  } else if (!moment(data.birthDate).isValid()) {
    errors.birthDate = 'Birthdate is invalid';
  } else if (moment().diff(moment(data.birthDate), 'years') < 2) {
    errors.birthDate = 'Should be at least 2 years old';
  }

  // PhoneNumber
  if (Validator.isEmpty(data.dialCode)) {
    errors.contactNumber = 'Dial Code is not yet ready please wait';
  }
  if (Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = 'Contact Number field is required';
  }

  if (!Validator.isLength(data.contactNumber.trim(), { min: 10, max: 10 })) {
    errors.contactNumber =
      'Contact Number must be 10 digits (minus the country code)';
  }

  // Country, barangay, city
  if (Validator.isEmpty(data.myLocation.country)) {
    errors.country = 'Country field is required';
  }
  if (Validator.isEmpty(data.myLocation.barangay)) {
    errors.barangay = 'Barangay/District field is required';
  }

  if (Validator.isEmpty(data.myLocation.city)) {
    errors.city = 'City field is required';
  }

  //My Sports
  if (Validator.isEmpty(data.mySports)) {
    errors.mySports = 'Must have at least one sport';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
