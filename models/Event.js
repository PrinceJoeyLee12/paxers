const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  organizerId: { type: Schema.Types.ObjectId, ref: 'users' },
  title: { type: String, required: true },
  eventUri: { type: String },
  displayImg: { type: String },
  eventLocation: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isVirtual: { type: Boolean },
  categories: [
    {
      registrationAmount: { type: Number },
      distance: { type: String },
      totalRegistrants: { type: Number },
      slotsQuota: { type: Number },
      assemblyTime: { type: String },
      gunTime: { type: String },
      cutOffTime: { type: String },
      registrationShirt: {
        images: [
          {
            label: { type: String },
            imgPath: { type: String },
          },
        ],
        sizesAndAvailability: [
          {
            size: { type: String },
            availability: { type: Number },
          },
        ],
      },
      registrationKits: [
        {
          images: [
            {
              label: { type: String },
              imgPath: { type: String },
            },
          ],
          sizesAndAvailability: [
            {
              size: { type: String },
              availability: { type: Number },
            },
          ],
        },
      ],
      finishersShirt: {
        images: [
          {
            label: { type: String },
            imgPath: { type: String },
          },
        ],
        sizesAvailable: [
          {
            size: { type: String },
            availability: { type: Number },
          },
        ],
      },
      finishersKits: [
        {
          variant: { type: String },
          images: [
            {
              label: { type: String },
              imgPath: { type: String },
            },
          ],
          sizesAndAvailability: [
            {
              size: { type: String },
              availability: { type: Number },
            },
          ],
        },
      ],
      prizes: [
        {
          category: { type: String }, //male, female, overall, team, oldest, youngest
          rankingPrizes: [
            {
              rank: { type: String }, // 1st, 2nd, last
              prizes: [
                // hotel for 2, cash Prices, GC, buffet
                {
                  prizeTypeVariant: { type: String },
                  amountOrValue: { type: String },
                },
              ],
            },
          ],
        },
      ],
      route: {
        images: [
          {
            label: { type: String },
            imgPath: { type: String },
          },
        ],
      },
      medal: {
        images: [
          {
            label: { type: String },
            imgPath: { type: String },
          },
        ],
      },
      otherPrizes: [
        {
          category: { type: String }, //male, female, overall, team, oldest, youngest
          rankingPrizes: [
            {
              rank: { type: String }, // 1st, 2nd, last
              prizes: [
                // hotel for 2, cash Prices, GC, buffet
                {
                  prizeTypeVariant: { type: String },
                  amountOrValue: { type: String },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  distanceTypeIsKM: { type: Boolean },
  registrationStart: { type: Date },
  registrationEnd: { type: Date },
  eventImgs: [
    {
      label: { type: String },
      imgPath: { type: String },
    },
  ],
  description: { type: String },
  contactInfo: [
    {
      type: { type: String },
      address: { type: String },
    },
  ],
  likes: [
    {
      _id: { type: Schema.Types.ObjectId },
      avatar: { type: String },
    },
  ],
  siteTabs: [
    {
      tabLabel: { type: String },
    },
  ],
  rulesAndRegulation: {
    pdfFile: { type: String },
  },
  paymentOptions: [
    {
      optionType: { type: String },
      nameOfReceiver: { type: String },
      accountNumber: { type: String },

      note: { type: String },
    },
  ],
  paymentExpiresIn: { type: String },
  createdAt: { type: Date },
});

const Event = mongoose.model('events', EventSchema);
module.exports = Event;
