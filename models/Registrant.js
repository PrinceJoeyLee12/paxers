const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrantSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'events' },
  userId: { type: Schema.Types.ObjectId, isRequired: true },
  transactionId: { type: String },
  status: { type: String },
  paymentImage: { type: String, default: '' },
  payment: {
    payThrough: { type: String },
    amountToPay: { type: Number },
    timeToExpire: { type: Date },
    datePaymentProcessed: { type: Date },
  },
  data: Schema.Types.Mixed,
  dateRegistered: { type: Date, default: Date.now },
});

const Registrant = mongoose.model('registrants', RegistrantSchema);
module.exports = Registrant;
