import { Schema, model } from 'mongoose';
import { IDealTicket } from './dealTicket.interface';

const DealTicketSchema = new Schema<IDealTicket>(
  {
    clientContact: {
      clientName: String,
      title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Rev', 'Other'],
        required: true,
      },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      identificationType: {
        type: String,
        enum: ['Driving Licence', 'Passport'],
      },
      documentNumber: Number,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },

    clientAddress: {
      houseNumberOrName: String,
      streetName: String,
      suburb: String,
      state: {
        type: String,
        enum: [
          'Aberdeenshire',
          'Angus',
          'Argyll and Bute',
          'Avon',
          'Barking and Dagenham',
          'Barnet',
          'Barnsley',
          'Bath and North East Somerset',
          'Bedfordshire',
          'Berkshire',
          'York',
        ],
      },
      postcode: Number,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },

    dealDetails: {
      clientName: String,
      ticketNumber: {
        type: String,
        required: true,
        unique: true,
      },
      security: {
        type: String,
        enum: ['Aviva 6.125%', 'JP Morgan 8.81%'],
        required: true,
      },
      seller: String,
      tradeAmount: { type: Number, required: true },
      settlementPeriod: {
        type: String,
        enum: ['T0', 'T1', 'T3', 'T5'],
      },
      investmentLength: {
        type: Number,
        enum: [3, 6, 12, 24, 36, 48, 60, 72],
        required: true,
      },
      representative: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// DealTicketSchema.pre('save', async function (next) {
//   if (!this.dealDetails.ticketNumber) {
//     const random = Math.floor(100000 + Math.random() * 900000);
//     this.dealDetails.ticketNumber = `DT-${Date.now()}-${random}`;
//   }

//   next();
// });

DealTicketSchema.pre('validate', function (next) {
  if (!this.dealDetails.ticketNumber) {
    const date = new Date();

    const now = new Date();

    if (this.isModified('clientContact')) this.clientContact.updatedAt = now;
    if (this.isModified('clientAddress')) this.clientAddress.updatedAt = now;
    if (this.isModified('dealDetails')) this.dealDetails.updatedAt = now;

    const yy = date.getFullYear().toString().slice(-2); // last 2 digits of year
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // month
    const dd = String(date.getDate()).padStart(2, '0'); // day

    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random

    this.dealDetails.ticketNumber = `DT-${yy}${mm}${dd}${random}`; // 12 chars
  }
  next();
});

export const DealTicket = model<IDealTicket>('DealTicket', DealTicketSchema);
