const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  eventId: { type: String, isRequired: true },
  formFields: [
    {
      type: { type: String }, //TextField, RadioButton, selection, datepicker, checkbox, autoComplete
      label: { type: String },
      isRequired: { type: Boolean },
      minimumOptionSelection: { type: Number },
      maximumOptionSelection: { type: Number },
      options: [
        {
          placeHolder: { type: String },
          optionName: { type: String },
        },
      ],
    },
  ],
});

const Form = mongoose.model('forms', FormSchema);
module.exports = Form;
