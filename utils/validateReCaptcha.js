const axios = require('axios');

module.exports = async function (token) {
  const secret = process.env.RECAPCHA_PRIVATE_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
  );
  return response.data.success;
};
