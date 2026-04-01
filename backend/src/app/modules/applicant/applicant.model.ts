/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { IApplicant } from './applicant.interface';
import { AdditionalInformation } from './applicant.types';

const phoneSchema = new Schema(
  {
    countryCode: { type: String, required: true },
    number: { type: String, required: true },
    type: {
      type: String,
      enum: ['mobile', 'home', 'work'],
      required: true,
    },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const individualAccountSchema = new Schema(
  {
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Rev', 'Other'],
      required: true,
    },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    occupation: { type: String, required: true },

    houseNumberOrName: { type: String, required: true },
    streetName: { type: String, required: true },
    town: { type: String, required: true },
    region: { type: String, required: true },
    postcode: { type: Number, required: true },
    country: { type: String, required: true },
    movedInDate: { type: Date, required: true },

    phones: {
      type: [phoneSchema],
      validate: [(val: any[]) => val.length > 0, 'At least one phone required'],
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
    confirmEmail: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
  },
  { timestamps: true }
);

const jointAccountSchema = new Schema(
  {
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Rev', 'Other'],
      required: true,
    },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    occupation: { type: String, required: true },

    houseNumberOrName: { type: String, required: true },
    streetName: { type: String, required: true },
    town: { type: String, required: true },
    region: { type: String, required: true },
    postcode: { type: Number, required: true },
    country: { type: String, required: true },
    movedInDate: { type: Date, required: true },

    phones: {
      type: [phoneSchema],
      validate: [(val: any[]) => val.length > 0, 'At least one phone required'],
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
    confirmEmail: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
  },
  { timestamps: true }
);

const companyOfficerSchema = new Schema(
  {
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Rev', 'Other'],
      required: true,
    },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    roleInCompany: {
      type: String,
      enum: [
        'Director',
        'Sole Director & Company Secretary',
        'Company Secretary',
        'Other',
      ],
      required: true,
    },
  },
  { _id: false }
);

const beneficialOwnersSchema = new Schema(
  {
    beneficialOwner: { type: String, required: true },
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Rev', 'Other'],
      required: true,
    },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  { _id: false }
);

const companyAccountSchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyType: {
      type: String,
      enum: ['Public', 'Proprietary'],
      required: true,
    },
    companyNumber: { type: String, required: true, unique: true },
    taxCode: { type: String, unique: true },
    taxCodeExemption: {
      type: String,
      enum: ['Yes', 'No'],
      required: true,
    },
    dateOfRegistration: { type: Date, required: true },
    businessActivity: { type: String, required: true },

    address: { type: String, required: true },
    streetName: { type: String, required: true },
    town: { type: String, required: true },
    region: { type: String, required: true },
    postcode: { type: Number, required: true },
    country: { type: String, required: true },

    relevantCategories: { type: String, required: true },

    nameofMarketOrExchange: { type: String },
    companyCode: { type: Number },
    listedCompanyName: { type: String },
    regulatorName: { type: String },
    licenceDetails: { type: String },

    companyTaxClassification: { type: String, required: true },

    companyOfficers: {
      type: [companyOfficerSchema],
      validate: [
        (val: any[]) => val.length > 0,
        'At least one officer required',
      ],
    },

    companyOwnership: {
      type: String,
      enum: ['Yes', 'No'],
      required: true,
    },

    beneficialOwners: {
      type: [beneficialOwnersSchema],
      validate: {
        validator: function (this: any, val: any[]) {
          if (this.companyOwnership === 'Yes') {
            return val && val.length > 0;
          }
          return true;
        },
        message: 'At least one beneficial owner required!',
      },
    },

    personalInformations: {
      title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Rev', 'Other'],
        required: true,
      },
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      occupation: { type: String, required: true },

      houseNumberOrName: { type: String, required: true },
      streetName: { type: String, required: true },
      town: { type: String, required: true },
      region: { type: String, required: true },
      postcode: { type: Number, required: true },
      country: { type: String, required: true },
      movedInDate: { type: Date, required: true },

      phones: {
        type: [phoneSchema],
        validate: {
          validator: (val: any[]) => val && val.length > 0,
          message: 'At least one phone required',
        },
        // validate: [
        //   (val: any[]) => val.length > 0,
        //   'At least one phone required',
        // ],
      },

      email: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
          },
          message: (props: { value: any }) =>
            `${props.value} is not a valid email!`,
        },
      },
      confirmEmail: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
          },
          message: (props: { value: any }) =>
            `${props.value} is not a valid email!`,
        },
      },
    },

    // beneficialOwners: {
    //   type: [beneficialOwnersSchema],
    //   validate: [
    //     (val: any[]) => val.length > 0,
    //     'At least one beneficial owner required!',
    //   ],
    // },
    // beneficialOwners: beneficialOwnersSchema,
  },
  { timestamps: true }
);

const fileSchema = new Schema(
  {
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    fileName: { type: String, required: true },
  },
  { _id: false }
);

const drivingLicenceSchema = new Schema(
  {
    frontPart: fileSchema,
    backPart: fileSchema,
  },
  { _id: false }
);

const identityVerificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        'internationalTravelDocument',
        'drivingLicence',
        'emailIdentification',
      ],
      required: true,
    },

    internationalTravelDocument: fileSchema,

    drivingLicence: drivingLicenceSchema,

    emailIdentification: {
      type: String,
      enum: ['I will email my proof of identity'],
    },
  },
  { _id: false }
);

const proofOfAddressSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['utilityBill', 'emailProofOfAddress'],
      required: true,
    },

    utilityBill: fileSchema,

    emailProofOfAddress: {
      type: String,
      enum: ['I will email my proof of address'],
    },
  },
  { _id: false }
);

const identificationSchema = new Schema(
  {
    identityVerification: identityVerificationSchema,
    proofOfAddress: proofOfAddressSchema,
  },
  { _id: false }
);

const additionalInformationSchema = new Schema<AdditionalInformation>(
  {
    adviserAppointment: {
      type: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
      },

      adviserAppointmentDetails: {
        firstName: {
          type: String,
          required: function (this: AdditionalInformation) {
            return this.adviserAppointment?.type === 'Yes';
          },
        },
        lastName: {
          type: String,
          required: function (this: AdditionalInformation) {
            return this.adviserAppointment?.type === 'Yes';
          },
        },
        businessName: {
          type: String,
          required: function (this: AdditionalInformation) {
            return this.adviserAppointment?.type === 'Yes';
          },
        },
        emailAddress: {
          type: String,
          required: function (this: AdditionalInformation) {
            return this.adviserAppointment?.type === 'Yes';
          },
          validate: {
            validator: function (v: string) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props: { value: any }) =>
              `${props.value} is not a valid email!`,
          },
        },
      },
    },

    sourceOfFunds: {
      type: String,
      enum: [
        'Income (i.e. employment, investment, business, other earnings)',
        'One-off payment (i.e. matured investment, legal settlement, estate proceeds)',
        'Savings',
        'Sale of assets (i.e. shares, property)',
        'Windfall (i.e. gifts, winnings)',
      ],
      required: true,
    },

    purposeOfAccount: {
      type: String,
      enum: [
        'Savings',
        'Growth',
        'Income',
        'Retirement',
        'Business Account',
        'Other',
      ],
      required: true,
    },
  },
  { _id: false }
);

const bankAccountDetailsSchema = new Schema(
  {
    bankName: { type: String, required: true },
    accountName: { type: String, required: true },
    sortCode: { type: Number, required: true },
    accountNumber: { type: Number, required: true },
    branch: { type: String },
  },
  { _id: false }
);

const existingBankAccountSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['bankAccountDetails', 'emailBankAccountDetails'],
      required: true,
    },

    bankAccountDetails: bankAccountDetailsSchema,

    emailBankAccountDetails: {
      type: String,
      enum: [
        'I will email my preferred account for the repayment of interest and maturities.',
      ],
    },
  },
  { _id: false }
);

const nextOfKinDetailsSchema = new Schema(
  {
    contactName: { type: String },
    phones: [phoneSchema],
    emailAddress: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
  },
  { _id: false }
);

const residentialAddressSchema = new Schema(
  {
    address: { type: String },
    streetName: { type: String },
    town: { type: String },
    region: { type: String },
    postcode: { type: Number },
    country: { type: String },
  },
  { _id: false }
);

const nextOfKinSchema = new Schema(
  {
    nextOfKinDetails: nextOfKinDetailsSchema,
    residentialAddressInformation: residentialAddressSchema,
  },
  { _id: false }
);

const settlementSchema = new Schema(
  {
    existingBankAccount: existingBankAccountSchema,
    nextOfKin: nextOfKinSchema,
  },
  { _id: false }
);

const applicationDeclarationSchema = new Schema(
  {
    confirmTruth: { type: Boolean, required: true, default: false },
    selfCertification: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

// Main Model schema start

const applicantSchema = new Schema<IApplicant>(
  {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },

    applicationToken: {
      type: String,
      default: null,
    },

    tokenExpiresAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        'Draft',
        'Sent',
        'In Progress',
        'Completed',
        'Approved',
        'Rejected',
      ],
      default: 'Draft',
    },
    referenceNumber: {
      type: String,
      unique: true,
    },

    assignedBy: {
      adminEmail: {
        type: String,
        required: true,
        validate: {
          validator: function (v: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // basic email regex
          },
          message: props => `${props.value} is not a valid email!`,
        },
      },
      adminId: { type: String },
    },

    // Store full completion payload here

    accountType: {
      type: String,
      enum: ['Individual', 'Joint', 'Company'],
    },

    individualAccount: individualAccountSchema,
    jointAccount: jointAccountSchema,
    companyAccount: companyAccountSchema,

    identification: identificationSchema,
    additionalInformation: additionalInformationSchema,
    settlement: settlementSchema,

    applicationDeclaration: applicationDeclarationSchema,
  },
  { timestamps: true }
);

companyAccountSchema.pre('validate', function (next) {
  const category = this.relevantCategories;

  if (category === 'Publicly Listed Company') {
    if (!this.nameofMarketOrExchange || !this.companyCode) {
      return next(
        new Error(
          'Name of Market/Exchange and Company Code are required for Publicly Listed Company'
        )
      );
    }
  }

  if (category === 'Majority owned subsidiary of a listed company') {
    if (
      !this.nameofMarketOrExchange ||
      !this.companyCode ||
      !this.listedCompanyName
    ) {
      return next(
        new Error(
          'Market/Exchange, Listed Company Name and Company Code required'
        )
      );
    }
  }

  if (category === 'Regulated Company') {
    if (!this.regulatorName || !this.licenceDetails) {
      return next(new Error('Regulator Name and Licence Details are required'));
    }
  }

  next();
});

identityVerificationSchema.pre('validate', function (next) {
  if (this.type === 'internationalTravelDocument') {
    if (!this.internationalTravelDocument) {
      return next(new Error('International travel document file is required'));
    }
  }

  if (this.type === 'drivingLicence') {
    if (
      !this.drivingLicence ||
      !this.drivingLicence.frontPart ||
      !this.drivingLicence.backPart
    ) {
      return next(
        new Error('Driving licence front and back part are required')
      );
    }
  }

  if (this.type === 'emailIdentification') {
    this.emailIdentification = 'I will email my proof of identity';
  }

  next();
});

proofOfAddressSchema.pre('validate', function (next) {
  if (this.type === 'utilityBill') {
    if (!this.utilityBill) {
      return next(new Error('Utility Bill file is required'));
    }
  }

  if (this.type === 'emailProofOfAddress') {
    this.emailProofOfAddress = 'I will email my proof of address';
  }

  next();
});

additionalInformationSchema.pre(
  'validate',
  function (this: AdditionalInformation, next) {
    if (this.adviserAppointment?.type === 'No') {
      this.adviserAppointment.adviserAppointmentDetails = undefined;
    }

    next();
  }
);

existingBankAccountSchema.pre('validate', function (next) {
  if (this.type === 'bankAccountDetails') {
    if (!this.bankAccountDetails) {
      return next(new Error('Bank account details are required'));
    }

    // remove email option
    this.emailBankAccountDetails = undefined;
  }

  if (this.type === 'emailBankAccountDetails') {
    this.bankAccountDetails = undefined;

    this.emailBankAccountDetails =
      'I will email my preferred account for the repayment of interest and maturities.';
  }

  next();
});

applicationDeclarationSchema.pre('validate', function (next) {
  if (this.confirmTruth !== true || this.selfCertification !== true) {
    return next(new Error('All declarations must be accepted'));
  }
  next();
});

applicantSchema.pre('validate', function (next) {
  if (this.accountType === 'Individual' && !this.individualAccount) {
    return next(new Error('Individual account data required!'));
  }

  if (this.accountType === 'Joint' && !this.jointAccount) {
    return next(new Error('Joint account data required!'));
  }

  if (this.accountType === 'Company' && !this.companyAccount) {
    return next(new Error('Company account data required!'));
  }

  next();
});

export const Applicant = model<IApplicant>('Applicant', applicantSchema);
