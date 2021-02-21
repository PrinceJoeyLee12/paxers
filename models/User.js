const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  myLocation: {
    barangay: { type: String },
    country: { type: String },
    city: { type: String },
  },
  eventsLiked: [{ type: Schema.Types.ObjectId, ref: 'events' }],
  mySports: [{ type: String, default: 'Running' }],
  personalRecords: [{ type: Schema.Types.ObjectId, ref: 'activities' }],
  preferredMeasurementIsMetric: { type: Boolean, default: true },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model('users', UserSchema);

module.exports = User;
