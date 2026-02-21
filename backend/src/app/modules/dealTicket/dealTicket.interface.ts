import { Types } from 'mongoose';

export type IDealTicket = {
  clientContact: {
    toObject(): {
      clientName?: string;
      title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
      firstName: string;
      lastName: string;
      email: string;
      identificationType?: 'Driving Licence' | 'Passport';
      documentNumber?: number;
      createdAt: Date;
      updatedAt: Date;
    };
    clientName?: string;
    title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
    firstName: string;
    lastName: string;
    email: string;
    identificationType?: 'Driving Licence' | 'Passport';
    documentNumber?: number;
    createdAt: Date;
    updatedAt: Date;
  };

  clientAddress: {
    toObject(): {
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
      postcode?: number;
      createdAt: Date;
      updatedAt: Date;
    };
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
    postcode?: number;
    createdAt: Date;
    updatedAt: Date;
  };

  dealDetails: {
    toObject(): {
      clientName: string;
      ticketNumber: string;
      security: 'Aviva 6.125%' | 'JP Morgan 8.81%';
      seller?: string;
      tradeAmount: number;
      settlementPeriod?: 'T0' | 'T1' | 'T3' | 'T5';
      investmentLength: 3 | 6 | 12 | 24 | 36 | 48 | 60 | 72;
      representative: string; // logged admin email
      createdAt: Date;
      updatedAt: Date;
    };
    clientName: string;
    ticketNumber: string;
    security: 'Aviva 6.125%' | 'JP Morgan 8.81%';
    seller?: string;
    tradeAmount: number;
    settlementPeriod?: 'T0' | 'T1' | 'T3' | 'T5';
    investmentLength: 3 | 6 | 12 | 24 | 36 | 48 | 60 | 72;
    representative: string; // logged admin email
    createdAt: Date;
    updatedAt: Date;
  };

  //   createdBy: string;
  createdBy: Types.ObjectId;
  // createdAt: Date;
  // updatedAt: Date;
};
