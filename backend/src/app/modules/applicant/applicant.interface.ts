import { Types } from 'mongoose';
import {
  AccountType,
  AdditionalInformation,
  ApplicantStatus,
  CompanyTaxClassification,
  Country,
  IInvestment,
  IWithdrawal,
  Regions,
  RelevantCategories,
  Settlement,
} from './applicant.types';

export type IApplicant = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;

  // For email completion flow
  applicationToken?: string | null;
  tokenExpiresAt?: Date | null;

  status: ApplicantStatus;
  referenceNumber: string;
  assignedBy: {
    adminEmail: string;
    adminId?: string;
  };

  // Future extended fields (when client completes form)
  accountType?: AccountType;

  individualAccount?: {
    title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    occupation: string;
    houseNumberOrName: string;
    streetName: string;
    town: string;
    region: Regions;
    postcode: string;
    country: Country;
    movedInDate: Date;
    phones: {
      countryCode: string;
      number: string;
      type: 'mobile' | 'home' | 'work';
      isPrimary?: boolean;
    }[];
    email: string;
    confirmEmail: string;
    createdAt: Date;
    updatedAt: Date;
  };

  jointAccount?: {
    title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    occupation: string;
    houseNumberOrName: string;
    streetName: string;
    town: string;
    region: Regions;
    postcode: string;
    country: Country;
    movedInDate: string;
    phones: {
      countryCode: string;
      number: string;
      type: 'mobile' | 'home' | 'work';
      isPrimary?: boolean;
    }[];
    email: string;
    confirmEmail: string;
    createdAt: Date;
    updatedAt: Date;
  };

  companyAccount?: {
    companyName: string;
    companyType: 'Public' | 'Proprietary';
    companyNumber: string;
    taxCode?: string;
    taxCodeExemption: 'Yes' | 'No';
    dateOfRegistration: Date;
    businessActivity: string;
    address: string;
    streetName: string;
    town: string;
    region: Regions;
    postcode: string;
    country: Country;
    relevantCategories: RelevantCategories;
    nameofMarketOrExchange?: string;
    companyCode?: number;
    listedCompanyName?: string;
    regulatorName?: string;
    licenceDetails?: string;
    companyTaxClassification: CompanyTaxClassification;
    companyOfficers: {
      title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
      firstName: string;
      middleName?: string;
      lastName: string;
      roleInCompany:
        | 'Director'
        | 'Sole Director & Company Secretary'
        | 'Company Secretary'
        | 'Other';
    }[];
    companyOwnership: 'Yes' | 'No';
    beneficialOwners?: {
      beneficialOwner: string;
      title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
      firstName: string;
      middleName?: string;
      lastName: string;
    }[];
    personalInformations: {
      title: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Rev' | 'Other';
      firstName: string;
      middleName?: string;
      lastName: string;
      dateOfBirth: Date;
      occupation: string;
      houseNumberOrName: string;
      streetName: string;
      town: string;
      region: Regions;
      postcode: string;
      country: Country;
      movedInDate: string;
      phones: {
        countryCode: string;
        number: string;
        type: 'mobile' | 'home' | 'work';
        isPrimary?: boolean;
      }[];
      email: string;
      confirmEmail: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };

  identification?: {
    identityVerification: {
      type:
        | 'internationalTravelDocument'
        | 'drivingLicence'
        | 'emailIdentification';

      internationalTravelDocument?: {
        fileUrl: string;
        fileType: string;
        fileName: string;
      };

      drivingLicence?: {
        frontPart?: {
          fileUrl: string;
          fileType: string;
          fileName: string;
        };
        backPart?: {
          fileUrl: string;
          fileType: string;
          fileName: string;
        };
      };

      emailIdentification?: 'I will email my proof of identity';
    };

    proofOfAddress: {
      type: 'utilityBill' | 'emailProofOfAddress';

      utilityBill?: {
        fileUrl: string;
        fileType: string;
        fileName: string;
      };

      emailProofOfAddress?: 'I will email my proof of address';
    };
  };

  additionalInformation?: AdditionalInformation;

  settlement?: Settlement;

  applicationDeclaration: {
    confirmTruth: boolean;
    selfCertification: boolean;
  };

  investmentDetails: Types.DocumentArray<IInvestment>;
  withdrawals: Types.DocumentArray<IWithdrawal>;
};

// investmentDetails?: Types.DocumentArray<{
//   _id: Types.ObjectId;

//   investmentAmount: number;
//   investmentCurrency: string;
//   investmentLength: 'Fixed Length' | 'Fixed End Date';
//   bondLengthInMonths?: number;
//   maturityDate?: Date;
//   bondInvestmentOption: 'Aviva' | 'JPMorgan';

//   dailyReturn?: number;
//   monthlyReturn?: number;
//   annualReturn?: number;
//   totalReturn?: number;
//   investedAt?: Date;

//   withdrawnAmount?: number;
// }>;

// withdrawals?: Types.DocumentArray<{
//   _id: Types.ObjectId;
//   investmentId: Types.ObjectId;
//   amount: number;
//   status: 'Pending' | 'Approved' | 'Rejected';
//   requestedAt: Date;
// }>;
