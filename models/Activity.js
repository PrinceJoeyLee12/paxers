const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  titleOfActivity: { type: String },
  placeOfActivity: { type: String },
  paceAverage: { type: Number },
  fastestPace: { type: Number },
  hrAverage: { type: Number },
  totalTime: { type: String },
  totalDistance: { type: Number },
  totalCaloriesBurned: { type: Number },
  elevationAverage: { type: Number },
  maxElevation: { type: String },
  measurementUsedIsMetric: { type: Boolean },
  splits: [
    {
      distance: { type: Number },
      cumulativeTime: { type: String },
      averageHr: { type: String },
      averagePace: { type: Number },
      fastestPace: { type: Number },
      caloriesBurned: { type: Number },
      averageElevation: { type: String },
      averageCadence: { type: String },
    },
  ],
  dateActivityPerformed: { type: Date, default: Date.now },
});

const Activity = mongoose.model('activities', ActivitySchema);
module.exports = Activity;
