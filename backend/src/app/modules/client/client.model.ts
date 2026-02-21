import { Schema, model } from 'mongoose';

export type IClient = {
  clientName: string;
  title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
  firstName: string;
  lastName: string;
  email: string;
  identificationType?: 'Driving Licence' | 'Passport';
  documentNumber?: string;
  address?: {
    houseNumberOrName?: string;
    streetName?: string;
    suburb?: string;
    state?:
      | 'Aberdeenshire'
      | 'Angus'
      | 'Argyll and Bute'
      | 'Avon'
      | 'Barking and Dagenham'
      | 'Barnet'
      | 'Barnsley'
      | 'Bath and North East Somerset'
      | 'Bedfordshire'
      | 'Berkshire'
      | 'York';
    postcode?: string;
  };
};

const clientSchema = new Schema(
  {
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

    address: {
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
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Client = model('Client', clientSchema);
