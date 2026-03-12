import {
  AccountType,
  ApplicantStatus,
  CompanyTaxClassification,
  Country,
  PurposeOfAccount,
  Regions,
  RelevantCategories,
  SourceOfFunds,
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
    postcode: number;
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
    postcode: number;
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
    postcode: number;
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
      postcode: number;
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
      internationalTravelDocument?: {
        fileUrl: string; // image or pdf
        fileType: string; // image/png | application/pdf
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

      emailIdentification?: 'I will email my proof of identity'; // text only
    };

    proofOfAddress: {
      utilityBill?: {
        fileUrl: string; // image or pdf
        fileType: string; // image/png | application/pdf
        fileName: string;
      };
      emailProofOfAddress?: 'I will email my proof of address';
    };
  };

  additionalInformation?: {
    adviserAppointment: 'Yes' | 'No';
    sourceOfFunds: SourceOfFunds;
    purposeOfAccount: PurposeOfAccount;
  };

  settlement?: {
    existingBankAccount: {
      accountDetails?: {
        bankName: string;
        accountName: string;
        sortCode: number;
        accountNumber: number;
      };
      emailExistingBankAccountDetails?: 'I will email my preferred account for the repayment of interest and maturities.';
    };

    nextOfKin: {
      nextOfKinDetails?: {
        contactName?: string;
        phones?: {
          countryCode: string;
          number: string;
          type: 'mobile' | 'home' | 'work';
          isPrimary?: boolean;
        }[];
        emailAddress?: string;
      };

      residentialAddressInformation?: {
        address?: string;
        streetName?: string;
        town?: string;
        region?: Regions;
        postcode?: number;
        country?: Country;
      };
    };
  };

  applicationDeclaration?: 'Aggree' | 'Disagree';
};
