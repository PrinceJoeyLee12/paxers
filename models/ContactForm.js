const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
  firstName: { type: String, isRequired: true },
  lastName: { type: String, isRequired: true },
  number: { type: String, isRequired: true, trim: true },
  email: { type: String, isRequired: true, trim: true },
  message: { type: String, isRequired: true },
  dateOfConcern: { type: Date, default: Date.now },
});

const ContactForm = mongoose.model('concerns', ContactFormSchema);
module.exports = ContactForm;
