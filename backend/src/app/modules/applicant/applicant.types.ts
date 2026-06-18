/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
// import { Applicant } from './applicant.model';

// let uuidv4: (options?: any, buffer?: any, offset?: any) => string;

// (async () => {
//   const uuid = await import('uuid');
//   uuidv4 = uuid.v4;
// })();

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApplicantStatus =
  | 'Draft'
  | 'Sent'
  | 'In Progress'
  | 'Completed'
  | 'Approved'
  | 'Rejected';
export type AccountType = 'Individual' | 'Joint' | 'Company';

export type Regions =
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
  | 'Bexley'
  | 'Birmingham'
  | 'Blackburn with Darwen'
  | 'Blackpool'
  | 'Blaenau Gwent'
  | 'Bolton'
  | 'Bournemouth'
  | 'Bracknell Forest'
  | 'Bradford'
  | 'Brent'
  | 'Bridgend'
  | 'Brighton and Hove'
  | 'Bromley'
  | 'Buckinghamshire'
  | 'Bury'
  | 'Caerphilly'
  | 'Calderdale'
  | 'Cambridgeshire'
  | 'Camden'
  | 'Cardiff'
  | 'Carmarthenshire'
  | 'Ceredigion'
  | 'Cheshire'
  | 'City of Bristol'
  | 'City of Edinburgh'
  | 'City of Kingston upon Hull'
  | 'City of London'
  | 'Clackmannanshire'
  | 'Cleveland'
  | 'Co. Antrim'
  | 'Co. Armagh'
  | 'Co. Down'
  | 'Co. Fermanagh'
  | 'Co. Londonderry'
  | 'Co. Tyrone'
  | 'Conwy'
  | 'Cornwall'
  | 'Coventry'
  | 'Croydon'
  | 'Cumbria'
  | 'Darlington'
  | 'Denbighshire'
  | 'Derby'
  | 'Derbyshire'
  | 'Devon'
  | 'Doncaster'
  | 'Dorset'
  | 'Dudley'
  | 'Dumfries and Galloway'
  | 'Dundee City'
  | 'Durham'
  | 'Ealing'
  | 'East Ayrshire'
  | 'East Dunbartonshire'
  | 'East Lothian'
  | 'East Renfrewshire'
  | 'East Riding of Yorkshire'
  | 'East Sussex'
  | 'Eilean Siar (Western Isles)'
  | 'Enfield'
  | 'Essex'
  | 'Falkirk'
  | 'Fife'
  | 'Flintshire'
  | 'Gateshead'
  | 'Glasgow City'
  | 'Gloucestershire'
  | 'Greenwich'
  | 'Gwynedd'
  | 'Hackney'
  | 'Halton'
  | 'Hammersmith and Fulham'
  | 'Hampshire'
  | 'Haringey'
  | 'Harrow'
  | 'Hartlepool'
  | 'Havering'
  | 'Herefordshire'
  | 'Hertfordshire'
  | 'Highland'
  | 'Hillingdon'
  | 'Hounslow'
  | 'Inverclyde'
  | 'Isle of Anglesey'
  | 'Isle of Wight'
  | 'Islington'
  | 'Kensington and Chelsea'
  | 'Kent'
  | 'Kingston upon Thames'
  | 'Kirklees'
  | 'Knowsley'
  | 'Lambeth'
  | 'Lancashire'
  | 'Leeds'
  | 'Leicester'
  | 'Leicestershire'
  | 'Lewisham'
  | 'Lincolnshire'
  | 'Liverpool'
  | 'London'
  | 'Luton'
  | 'Manchester'
  | 'Medway'
  | 'Merseyside'
  | 'Merthyr Tydfil'
  | 'Merton'
  | 'Middlesbrough'
  | 'Middlesex'
  | 'Midlothian'
  | 'Milton Keynes'
  | 'Monmouthshire'
  | 'Moray'
  | 'Neath Port Talbot'
  | 'Newcastle upon Tyne'
  | 'Newham'
  | 'Newport'
  | 'Norfolk'
  | 'North Ayrshire'
  | 'North East Lincolnshire'
  | 'North Humberside'
  | 'North Lanarkshire'
  | 'North Lincolnshire'
  | 'North Somerset'
  | 'North Tyneside'
  | 'North Yorkshire'
  | 'Northamptonshire'
  | 'Northumberland'
  | 'Nottingham'
  | 'Nottinghamshire'
  | 'Oldham'
  | 'Orkney Islands'
  | 'Oxfordshire'
  | 'Pembrokeshire'
  | 'Perth and Kinross'
  | 'Peterborough'
  | 'Plymouth'
  | 'Poole'
  | 'Portsmouth'
  | 'Powys'
  | 'Reading'
  | 'Redbridge'
  | 'Renfrewshire'
  | 'Rhondda Cynon Taff'
  | 'Richmond upon Thames'
  | 'Rochdale'
  | 'Rotherham'
  | 'Rutland'
  | 'Salford'
  | 'Sandwell'
  | 'Sefton'
  | 'Sheffield'
  | 'Shetland Islands'
  | 'Shropshire'
  | 'Slough'
  | 'Solihull'
  | 'Somerset'
  | 'South Ayrshire'
  | 'South Gloucestershire'
  | 'South Humberside'
  | 'South Lanarkshire'
  | 'South Tyneside'
  | 'South Yorkshire'
  | 'Southampton'
  | 'Southend-on-Sea'
  | 'Southwark'
  | 'St. Helens'
  | 'Staffordshire'
  | 'Stirling'
  | 'Stockport'
  | 'Stockton-on-Tees'
  | 'Stoke-on-Trent'
  | 'Suffolk'
  | 'Sunderland'
  | 'Surrey'
  | 'Sutton'
  | 'Swansea'
  | 'Swindon'
  | 'Tameside'
  | 'Telford and Wrekin'
  | 'The Scottish Borders'
  | 'The Vale of Glamorgan'
  | 'Thurrock'
  | 'Torbay'
  | 'Torfaen'
  | 'Tower Hamlets'
  | 'Trafford'
  | 'Tyne and Wear'
  | 'Wakefield'
  | 'Walsall'
  | 'Waltham Forest'
  | 'Wandsworth'
  | 'Warrington'
  | 'Warwickshire'
  | 'West Dunbartonshire'
  | 'West Lothian'
  | 'West Midlands'
  | 'West Sussex'
  | 'West Yorkshire'
  | 'Westminster'
  | 'Wigan'
  | 'Wiltshire'
  | 'Windsor and Maidenhead'
  | 'Wirral'
  | 'Wokingham'
  | 'Wolverhampton'
  | 'Worcestershire'
  | 'Wrexham'
  | 'York';

export const Countries = [
  'Afghanistan',
  'Aland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, Democratic Republic of',
  'Cook Islands',
  'Costa Rica',
  "Cote D'Ivoire",
  'Croatia (Hrvatska)',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French S Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard and McDonald Isls',
  'Holy See (Vatican City State)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea (South)',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Isls',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestinian Territory, Occupied',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'S. Georgia and S. Sandwich Islands',
  'Saint Barthelemy',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin (French part)',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia, Republic of',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten (Dutch part)',
  'Slovak Republic',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'St. Pierre and Miquelon',
  'Suriname',
  'Svalbard and Jan Mayen Islands',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'US Minor Outlying Isls',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Viet Nam',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Wallis and Futuna Isls',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
] as const;

export type Country = (typeof Countries)[number];

export type RelevantCategories =
  | 'Limited Company'
  | 'Publicly Listed Company'
  | 'Majority owned subsidiary of a listed company'
  | 'Regulated Company'
  | 'None of those';

export type CompanyTaxClassification =
  | 'Financial Institution'
  | 'Public Listed Company, Majority owned subsidiary of a Public Listed Company or a Registered Charity'
  | 'Active Non-Financial Entity (NFE)'
  | 'None of those';

export type SourceOfFunds =
  | 'Income (i.e. employment, investment, business, other earnings)'
  | 'One-off payment (i.e. matured investment, legal settlement, estate proceeds)'
  | 'Savings'
  | 'Sale of assets (i.e. shares, property)'
  | 'Windfall (i.e. gifts, winnings)';

export type PurposeOfAccount =
  | 'Savings'
  | 'Growth'
  | 'Income'
  | 'Retirement'
  | 'Business Account'
  | 'Other';

export type AdditionalInformation = {
  adviserAppointment: {
    type: 'Yes' | 'No';
    adviserAppointmentDetails?: {
      firstName: string;
      lastName: string;
      businessName: string;
      emailAddress: string;
    };
  };

  sourceOfFunds: SourceOfFunds;
  purposeOfAccount: PurposeOfAccount;
};

export type Settlement = {
  existingBankAccount: {
    type: 'bankAccountDetails' | 'emailBankAccountDetails';

    bankAccountDetails?: {
      bankName: string;
      accountName: string;
      sortCode: number;
      accountNumber: number;
      branch?: string;
    };

    emailBankAccountDetails?: 'I will email my preferred account for the repayment of interest and maturities.';
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
      postcode?: string;
      country?: Country;
    };
  };
};

export type IInvestment = {
  _id: Types.ObjectId;
  bondNumber?: string;
  investmentAmount: number;
  investmentCurrency: string;
  investmentLength: 'Fixed Length' | 'Fixed End Date';
  bondLengthInMonths?: number;
  maturityDate?: Date;
  bondInvestmentOption: string;
  dailyReturn?: number;
  monthlyReturn?: number;
  annualReturn?: number;
  totalReturn?: number;
  availableForWithdraw?: number;
  investedAt: Date;
  withdrawnAmount?: number;
  profitPercentage: number;
  // earlyWithdrawalPenaltyRate?: number;
  // earlyWithdrawn?: boolean;
  // earlyWithdrawnAt?: Date;
};

export type IWithdrawal = {
  _id: Types.ObjectId;
  investmentId: Types.ObjectId;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedAt: Date;
};

// const generateBondNumber = (): string => {
//   return `B${uuidv4().replace(/-/g, '').substring(0, 11).toUpperCase()}`;
// };

// export const generateUniqueBondNumber = async (): Promise<string> => {
//   const MAX_RETRIES = 5;

//   for (let i = 0; i < MAX_RETRIES; i++) {
//     const bondNumber = generateBondNumber();

//     const exists = await Applicant.exists({
//       'investmentDetails.bondNumber': bondNumber,
//     });

//     if (!exists) {
//       return bondNumber;
//     }
//   }

//   throw new Error('Failed to generate unique bond number after retries');
// };
