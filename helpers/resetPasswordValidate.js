const Validator = require('validator');
const isEmpty = require('is-empty');
const bcrypt = require('bcryptjs');
const passwordValidator = require('password-validator');

exports.validateResetPasswordEmailInput = data => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : '';

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
// exports.validateResetPasswordInput = ({ password, password2, token }) => {
exports.validateResetPasswordInput = data => {
  let errors = {};

  //Cover password to string if empty
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  const passwordSchema = new passwordValidator();
  passwordSchema.has().digits(1).has().letters().has().not().spaces();
  if (!passwordSchema.validate(data.password)) {
    errors.password =
      'Password must contain letter(s) and number(s) and must not have spaces';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// exports.validateResetPasswordInput = ({ password, password2, token }) => {
exports.validateChangePasswordInput = async (data, userPassword) => {
  let errors = {};
  //Cover password to string if empty
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //validate old password
  const isMatch = await bcrypt.compare(data.oldPassword.trim(), userPassword);
  if (!isMatch) {
    errors.oldPassword = 'Old password is incorrect';
  }

  // Password checks
  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = 'Old password field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  const passwordSchema = new passwordValidator();
  passwordSchema.has().digits(1).has().letters().has().not().spaces();

  if (!passwordSchema.validate(data.password)) {
    errors.password =
      'Password must contain letter(s) and number(s) and must not have spaces';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
