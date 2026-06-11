/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { sendEmail } from '../../../utils/sendEmail';
import { Applicant } from './applicant.model';
import { User } from '../user/user.model';
import { calculateInvestment } from './applicant.utils';
import { calculateAvailableForWithdraw } from './applicant.utils';
import { generateUniqueBondNumber } from './applicant.types';

/**
 * 🔹 Create Applicant (Admin)
 * Generates secure token using crypto
 */

const createApplicant = async (payload: any, admin: any) => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) throw new Error('FRONTEND_URL not configured!');

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) throw new Error('Invalid email format!');

  // Check if applicant already exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) throw new Error('A User with this email already exists!');

  // Check if applicant already exists
  const existing = await Applicant.findOne({ email: payload.email });
  if (existing) throw new Error('An applicant with this email already exists!');

  if (!admin?.email) throw new Error('Invalid admin session.');

  // Prevent admin creating applicant for themselves
  if (payload?.email === admin?.email)
    throw new Error('Admin email and applicant email cannot be the same.');

  // Generate token, reference number
  const token = crypto.randomBytes(32).toString('hex');
  const referenceNumber = crypto.randomBytes(5).toString('hex').toUpperCase();

  // 🔹 Role check
  const role = payload.role || 'user';

  // Generate password ONLY for users
  let generatedPassword: string | null = null;
  if (role === 'user') {
    generatedPassword = crypto.randomBytes(4).toString('hex'); // 8 char password
  }

  // 1️⃣ Create Applicant
  const applicant = await Applicant.create({
    ...payload,
    referenceNumber,
    applicationToken: token,
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    status: 'Sent',
    assignedBy: {
      adminEmail: admin.email,
      adminId: admin._id,
    },
  });

  // 2️⃣ Create User for login
  const user = await User.create({
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: generatedPassword, // will be null for admin
    role,
  });

  // 3️⃣ Send email
  // DB Wealth - Complete your bond application & Account Login
  try {
    await sendEmail(
      applicant.email,
      'Your Deutsche Bank Application – Next Steps',
      `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2 style="color:#000e28;">Deutsche Bank</h2>
        <p>Helping clients build a secure future, one day at a time</p>
        <hr/>
        <p>Dear ${applicant.title} ${applicant.firstName} ${
        applicant.lastName
      },</p>
        <p>Your account application is nearly complete - just a few final steps remain.</p>

        <div style="text-align:center; margin:30px 0;">
          ${
            role === 'user'
              ? `
              <p>You can login anytime with the following credentials:</p>
              <p>Email: ${user.email}<br>Password: ${generatedPassword}</p>
              `
              : `<p>Your admin account has been created successfully.</p>`
          }

          <br>
          <a href="${frontendUrl}/login" 
             style="background: #1327a7;
                    color: white;
                    padding:12px 25px;
                    text-decoration:none;
                    border-radius:4px;
                    font-weight:bold;">
            Login To Start Application
          </a>
        </div>

        <p>To complete your account setup, please provide:</p>
        <ul>
          <li>Digital copy of your passport</li>
          <li>Recent utility bill or bank/credit card statement (within 3 months)</li>
        </ul>

        <p>After your application is complete, we will email you with the next steps.</p>
        <p>Kind regards,<br/>Client Services Team</p>

        <hr/>
        <p style="font-size:12px; color:gray;">
        This email was sent to ${applicant.email}.
        Please do not reply to this email as the mailbox is unattended.
        </p>
        <p style="font-size:12px;color:#777;">
        If you did not request this email please ignore it.<br>
        Contact: wealth@dwouk-db.com
        </p>
      </div>
      `
    );
  } catch (error) {
    await Applicant.findByIdAndDelete(applicant._id);
    await User.findByIdAndDelete(user._id);
    throw new Error('Failed to send email. Applicant was not created.');
  }

  return { applicant, user };
};

// const createApplicant = async (payload: any, admin: any) => {
//   const frontendUrl = process.env.FRONTEND_URL;
//   if (!frontendUrl) throw new Error('FRONTEND_URL not configured!');

//   // Validate email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(payload.email)) throw new Error('Invalid email format!');

//   // Check if applicant already exists
//   const existing = await Applicant.findOne({ email: payload.email });
//   if (existing) throw new Error('An applicant with this email already exists!');

//   if (!admin?.email) throw new Error('Invalid admin session.');

//   // Prevent admin creating applicant for themselves
//   if (payload?.email === admin?.email)
//     throw new Error('Admin email and applicant email cannot be the same.');

//   // Generate token, reference number, and random password
//   const token = crypto.randomBytes(32).toString('hex');
//   const referenceNumber = crypto.randomBytes(5).toString('hex').toUpperCase();
//   const generatedPassword = crypto.randomBytes(4).toString('hex'); // 8 char password

//   // 1️⃣ Create Applicant
//   const applicant = await Applicant.create({
//     ...payload,
//     referenceNumber,
//     applicationToken: token,
//     tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
//     status: 'Sent',
//     assignedBy: {
//       adminEmail: admin.email,
//       adminId: admin._id,
//     },
//   });

//   // 2️⃣ Create User for login
//   const user = await User.create({
//     email: payload.email,
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     password: generatedPassword,
//     role: 'user',
//   });

//   // 3️⃣ Send combined email
//   try {
//     await sendEmail(
//       applicant.email,
//       'DB Wealth - Complete your bond application & Account Login',
//       `
//       <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
//         <h2 style="color:#000e28;">Deutsche Bank</h2>
//         <p>Helping clients build a secure future, one day at a time</p>
//         <hr/>
//         <p>Dear ${applicant.title} ${applicant.firstName} ${applicant.lastName},</p>
//         <p>Your account application is nearly complete - just a few final steps remain.</p>

//         <div style="text-align:center; margin:30px 0;">
//         <p>You can login anytime with the following credentials:</p>
//         <p>Email: ${user.email}<br>Password: ${generatedPassword}</p>
//         <br>
//           <a href="${frontendUrl}"
//              style="background:linear-gradient(180deg, #000e28 0%, #011431 100%);
//                     color:white;
//                     padding:12px 25px;
//                     text-decoration:none;
//                     border-radius:4px;
//                     font-weight:bold;">
//             Login To Start Application
//           </a>
//         </div>

//         <p>To complete your account setup, please provide:</p>
//         <ul>
//           <li>Digital copy of your passport</li>
//           <li>Recent utility bill or bank/credit card statement (within 3 months)</li>
//         </ul>

//         <p>After your application is complete, we will email you with the next steps.</p>
//         <p>Kind regards,<br/>Client Services Team</p>

//         <hr/>
//         <p style="font-size:12px; color:gray;">
//         This email was sent to ${applicant.email}.
//         Please do not reply to this email as the mailbox is unattended.
//         </p>
//       </div>
//       `
//     );
//   } catch (error) {
//     await Applicant.findByIdAndDelete(applicant._id);
//     await User.findByIdAndDelete(user._id);
//     throw new Error('Failed to send email. Applicant was not created.');
//   }

//   return { applicant, user };
// };

// const createApplicant = async (payload: any, admin: any) => {
//   //   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
//   const frontendUrl = process.env.FRONTEND_URL;

//   if (!frontendUrl) throw new Error('FRONTEND_URL not configured!');

//   // Check valid email using regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(payload.email)) {
//     throw new Error('Invalid email format!');
//   }

//   // Check if email already exists
//   const existing = await Applicant.findOne({ email: payload.email });
//   if (existing) {
//     throw new Error('An applicant with this email already exists!');
//   }

//   if (!admin?.email) {
//     throw new Error('Invalid admin session.');
//   }

//   // 🚨 Prevent admin creating applicant for themselves
//   if (payload?.email === admin?.email) {
//     throw new Error('Admin email and applicant email cannot be the same.');
//   }

//   const token = crypto.randomBytes(32).toString('hex');
//   const referenceNumber = crypto.randomBytes(5).toString('hex').toUpperCase();

//   const applicant = await Applicant.create({
//     ...payload,
//     referenceNumber,
//     applicationToken: token,
//     tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
//     status: 'Sent',
//     assignedBy: {
//       adminEmail: admin.email,
//       adminId: admin._id,
//     },
//   });

//   const link = `${frontendUrl}/complete-application/${token}`;
//   //   const link = `${process.env.FRONTEND_URL}/complete-application/${token}`;

//   try {
//     await sendEmail(
//       applicant.email,
//       'DB Wealth - Complete your bond application',
//       `
//       <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
//         <h2 style="color:#000e28;">Deutsche Bank</h2>
//         <p>Helping clients build a secure future, one day at a time</p>
//         <hr/>
//         <p>Dear ${applicant.title} ${applicant.firstName} ${applicant.lastName},</p>
//         <p>Your account application is nearly complete - just a few final steps remain.</p>

//         <div style="text-align:center; margin:30px 0;">
//           <a href="${link}"
//              style="background:linear-gradient(180deg, #000e28 0%, #011431 100%);
//                     color:white;
//                     padding:12px 25px;
//                     text-decoration:none;
//                     border-radius:4px;
//                     font-weight:bold;">
//             Start Application
//           </a>
//         </div>

//         <p>To complete your account setup, please provide:</p>
//         <ul>
//           <li>Digital copy of your passport</li>
//           <li>Recent utility bill or bank/credit card statement (within 3 months)</li>
//         </ul>

//         <p>After your application is complete, we will email you with the next steps.</p>
//         <p>Kind regards,<br/>Client Services Team</p>

//         <hr/>
//         <p style="font-size:12px; color:gray;">
//         This email was sent to ${applicant.email}.
//         Please do not reply to this email as the mailbox is unattended.
//         </p>
//       </div>
//       `
//     );
//   } catch (error) {
//     await Applicant.findByIdAndDelete(applicant._id);
//     throw new Error('Failed to send email. Applicant was not created.');
//   }

//   return applicant;
// };

/**
 * 🔹 Public - Start Application by Email
 */
const startApplication = async (email: string) => {
  const applicant = await Applicant.findOne({ email });

  if (!applicant) {
    throw new Error('No application found with this email!');
  }

  if (applicant.status === 'Completed') {
    throw new Error('Application already completed!');
  }

  // Optional: Prevent multiple token regeneration within active period
  // if (
  //   applicant.applicationToken &&
  //   applicant.tokenExpiresAt &&
  //   applicant.tokenExpiresAt > new Date()
  // ) {
  //   return {
  //     token: applicant.applicationToken,
  //     expiresAt: applicant.tokenExpiresAt,
  //   };
  // }

  // Generate new short-lived token (60 mins)
  const token = crypto.randomBytes(32).toString('hex');

  applicant.applicationToken = token;
  applicant.tokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60);
  applicant.status = 'In Progress';

  // console.log('Before save:', applicant);
  await applicant.save();
  // console.log('After save:', applicant);

  // return {
  //   token,
  //   expiresAt: applicant.tokenExpiresAt,
  // };

  return applicant;
};

/**
 * 🔹 Public - Complete Application
 */
const progressApplication = async (token: string, payload: any) => {
  const applicant = await Applicant.findOne({
    applicationToken: token,
    tokenExpiresAt: { $gt: new Date() },
  });

  if (!applicant) {
    throw new Error('Invalid or expired token!');
  }

  applicant.accountType = payload.accountType;

  if (payload.accountType === 'Individual') {
    applicant.individualAccount = payload.individualAccount;
  }

  if (payload.accountType === 'Joint') {
    applicant.jointAccount = payload.jointAccount;
  }

  if (payload.accountType === 'Company') {
    applicant.companyAccount = payload.companyAccount;
  }

  applicant.identification = payload.identification;
  applicant.additionalInformation = payload.additionalInformation;
  applicant.settlement = payload.settlement;
  applicant.applicationDeclaration = payload.applicationDeclaration;

  applicant.status = 'Completed';
  applicant.applicationToken = null;
  applicant.tokenExpiresAt = null;

  await applicant.save();

  return applicant;
};

/**
 * 🔹 Admin CRUD
 */
const getAllApplicants = async () => {
  return Applicant.find().sort({ createdAt: -1 });
};

const getSingleApplicant = async (id: string) => {
  return Applicant.findById(id);
};

const updateApplicant = async (id: string, payload: any) => {
  const existingApplicant = await Applicant.findById(id);

  if (!existingApplicant) {
    throw new Error('Applicant not found!');
  }

  // console.log('Payload', payload);
  // console.log('Payload', payload.settlement.existingBankAccount);

  const previousStatus = existingApplicant.status;

  const updateData: any = {};

  if (payload.individualAccount) {
    Object.keys(payload.individualAccount).forEach(key => {
      updateData[`individualAccount.${key}`] = payload.individualAccount[key];
    });
  }

  if (payload.jointAccount) {
    Object.keys(payload.jointAccount).forEach(key => {
      updateData[`jointAccount.${key}`] = payload.jointAccount[key];
    });
  }

  if (payload.companyAccount) {
    Object.keys(payload.companyAccount).forEach(key => {
      updateData[`companyAccount.${key}`] = payload.companyAccount[key];
    });
  }

  if (payload.status) {
    updateData.status = payload.status;
  }

  if (payload?.identification?.identityVerification) {
    updateData['identification.identityVerification'] =
      payload.identification.identityVerification;
  }

  if (payload?.settlement?.existingBankAccount) {
    updateData['settlement.existingBankAccount'] =
      payload.settlement.existingBankAccount;
  }

  const applicant = await Applicant.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  // ✅ Send email ONLY when status changes to "Approved"
  if (payload.status === 'Approved' && previousStatus !== 'Approved') {
    try {
      await sendEmail(
        existingApplicant.email,
        'Your Deutsche Bank Account - Approved',
        `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
    <h2 style="color:#000e28;">Deutsche Bank</h2>
    <p>Helping clients build a secure future, one day at a time</p>
    <hr/>

    <p>Dear ${existingApplicant.title} ${existingApplicant.firstName} ${existingApplicant.lastName},</p>

    <p>We are pleased to inform you that your application has now been <b>approved</b>.</p>

    <p>Your reference number is: <b>${existingApplicant.referenceNumber}</b></p>

    <div style="text-align:center; margin:30px 0;">
      <a href="${process.env.FRONTEND_URL}/login"
         style="background:linear-gradient(180deg, #000e28 0%, #011431 100%);
                color:white;
                padding:12px 25px;
                text-decoration:none;
                border-radius:4px;
                font-weight:bold;">
        Login To Your Account
      </a>
    </div>

    <p>You can now log in and access your dashboard.</p>

    <p>If you have any questions, feel free to contact our support team.</p>

    <p>Kind regards,<br/>Client Services Team</p>

    <hr/>
    <p style="font-size:12px; color:gray;">
      This email was sent to ${existingApplicant.email}.<br/>
      Please do not reply to this email.
    </p>

    <p style="font-size:12px;color:#777;">
      Contact: wealth@dwouk-db.com
    </p>
  </div>
  `
      );
    } catch (error) {
      // console.error('Approval email failed:', error);
      throw new Error('Failed to send email. Account has not been updated.');
      // ❗ Do NOT throw error (important)
      // otherwise update will fail even though DB is already updated
    }
  }

  return applicant;
};

// const updateApplicant = async (id: string, payload: any) => {
//   payload.status = 'Completed';

//   return Applicant.findByIdAndUpdate(id, payload, { new: true });
// };

// const updateApplicant = async (id: string, payload: any) => {
//   const applicant = await Applicant.findById(id);

//   if (!applicant) {
//     throw new Error('Applicant not found!');
//   }

//   console.log('Payload', payload);

//   const previousStatus = applicant.status;

//   // Update applicant
//   applicant.set({
//     ...payload,
//     status: payload.status || applicant.status,
//   });

//   await applicant.save();

//   // ✅ Send email ONLY when status changes to "Approved"
//   if (payload.status === 'Approved' && previousStatus !== 'Approved') {
//     try {
//       await sendEmail(
//         applicant.email,
//         'Your Deutsche Bank Account - Approved',
//         `
//   <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
//     <h2 style="color:#000e28;">Deutsche Bank</h2>
//     <p>Helping clients build a secure future, one day at a time</p>
//     <hr/>

//     <p>Dear ${applicant.title} ${applicant.firstName} ${applicant.lastName},</p>

//     <p>We are pleased to inform you that your application has now been <b>approved</b>.</p>

//     <p>Your reference number is: <b>${applicant.referenceNumber}</b></p>

//     <div style="text-align:center; margin:30px 0;">
//       <a href="${process.env.FRONTEND_URL}/login"
//          style="background:linear-gradient(180deg, #000e28 0%, #011431 100%);
//                 color:white;
//                 padding:12px 25px;
//                 text-decoration:none;
//                 border-radius:4px;
//                 font-weight:bold;">
//         Login To Your Account
//       </a>
//     </div>

//     <p>You can now log in and access your dashboard.</p>

//     <p>If you have any questions, feel free to contact our support team.</p>

//     <p>Kind regards,<br/>Client Services Team</p>

//     <hr/>
//     <p style="font-size:12px; color:gray;">
//       This email was sent to ${applicant.email}.<br/>
//       Please do not reply to this email.
//     </p>

//     <p style="font-size:12px;color:#777;">
//       Contact: wealth@dwouk-db.com
//     </p>
//   </div>
//   `
//       );
//     } catch (error) {
//       // console.error('Approval email failed:', error);
//       throw new Error('Failed to send email. Account has not been updated.');
//       // ❗ Do NOT throw error (important)
//       // otherwise update will fail even though DB is already updated
//     }
//   }

//   return applicant;
// };

// const updateApplicant = async (id: string, payload: any) => {
//   const applicant = await Applicant.findById(id);

//   if (!applicant) {
//     throw new Error('Applicant not found!');
//   }

//   // Include status with default "Completed"
//   applicant.set({
//     ...payload,
//     status: payload.status || 'Approved',
//   });

//   await applicant.save();

//   return applicant;
// };

// const deleteApplicant = async (id: string) => {
//   return Applicant.findByIdAndDelete(id);
// };

const deleteApplicant = async (id: string) => {
  const applicant = await Applicant.findById(id);

  if (!applicant) return null;

  const email = applicant.email;

  await Promise.all([
    Applicant.findByIdAndDelete(id),
    User.findOneAndDelete({ email }),
  ]);

  return applicant;
};

// const requestWithdrawal = async (applicantId: string, payload: any) => {
//   const applicant = await Applicant.findById(applicantId);
//   if (!applicant) throw new Error('Applicant not found');

//   const investment = applicant.investmentDetails.id(payload.investmentId);
//   if (!investment) throw new Error('Investment not found');

//   const available =
//     (investment.totalReturn || 0) - (investment.withdrawnAmount || 0);

//   if (payload.amount > available) {
//     throw new Error('Withdrawal exceeds available balance');
//   }

//   // withdrawals is always DocumentArray now
//   applicant.withdrawals.push({
//     investmentId: investment._id,
//     amount: payload.amount,
//   } as any);

//   await applicant.save();

//   return applicant;
// };

// const approveWithdrawal = async (applicantId: string, withdrawalId: string) => {
//   const applicant = await Applicant.findById(applicantId);
//   if (!applicant) throw new Error('Applicant not found');

//   const withdrawal = applicant.withdrawals.id(withdrawalId);
//   if (!withdrawal) throw new Error('Withdrawal not found');

//   const investment = applicant.investmentDetails.id(withdrawal.investmentId);
//   if (!investment) throw new Error('Investment not found');

//   const available =
//     (investment.totalReturn || 0) - (investment.withdrawnAmount || 0);

//   if (withdrawal.amount > available) {
//     throw new Error('Invalid withdrawal approval');
//   }

//   investment.withdrawnAmount =
//     (investment.withdrawnAmount || 0) + withdrawal.amount;
//   withdrawal.status = 'Approved';

//   await applicant.save();

//   return applicant;
// };

const getProfitRate = (option: 'Aviva' | 'JPMorgan') => {
  if (option === 'Aviva') return 6.125;
  if (option === 'JPMorgan') return 8.81;
  throw new Error('Invalid bond investment option');
};

const addInvestment = async (applicantId: string, payload: any) => {
  const applicant = await Applicant.findById(applicantId);
  if (!applicant) throw new Error('Applicant not found');

  const profitPercentage = getProfitRate(payload.bondInvestmentOption);

  // ✅ VALIDATION (IMPORTANT)
  // if (payload.investmentLength === 'Fixed Length') {
  //   if (!payload.bondLengthInMonths) {
  //     throw new Error('bondLengthInMonths is required');
  //   }
  //   payload.maturityDate = undefined;
  // }

  // if (payload.investmentLength === 'Fixed End Date') {
  //   if (!payload.maturityDate) {
  //     throw new Error('maturityDate is required');
  //   }
  //   payload.bondLengthInMonths = undefined;
  // }

  // ✅ generate bond number here
  // const bondNumber = `${Date.now()}${Math.random()
  //   .toString(36)
  //   .substring(2, 8)}`.toUpperCase();

  const bondNumber = await generateUniqueBondNumber();

  const calc = calculateInvestment({
    ...payload,
    profitPercentage,
  });

  const newInvestment = {
    ...payload,
    ...calc,
    bondNumber, // ✅ MUST be last
    // earlyWithdrawalPenaltyRate: 2,
    availableForWithdraw: Number(
      ((payload.investmentAmount || 0) + (calc.totalReturn || 0)).toFixed(2)
    ),
  };

  // applicant.investmentDetails = applicant.investmentDetails || [];
  applicant.investmentDetails.push(newInvestment);

  await applicant.save();

  return applicant;
};

// const requestWithdrawal = async (applicantId: string, payload: any) => {
//   const applicant = await Applicant.findById(applicantId);
//   if (!applicant) throw new Error('Applicant not found');

//   const investment = applicant.investmentDetails?.id(payload.investmentId);
//   if (!investment) throw new Error('Investment not found');

//   // const available = Number(
//   //   ((investment.totalReturn || 0) - (investment.withdrawnAmount || 0)).toFixed(
//   //     2
//   //   )
//   // );

//   // const available = Number((investment.availableForWithdraw || 0).toFixed(2));

//   const available = calculateAvailableForWithdraw(investment);

//   if (payload.amount > available) {
//     throw new Error('Withdrawal exceeds available balance!');
//   }

//   // withdrawals is always DocumentArray now
//   applicant.withdrawals!.push({
//     investmentId: investment._id,
//     amount: payload.amount,
//     // status: 'Pending',
//     // requestedAt: new Date(),
//   });

//   await applicant.save();

//   return applicant;
// };

const requestWithdrawal = async (applicantId: string, payload: any) => {
  const applicant = await Applicant.findById(applicantId);
  if (!applicant) throw new Error('Applicant not found');

  const investment = applicant.investmentDetails?.id(payload.investmentId);
  if (!investment) throw new Error('Investment not found');

  const available = calculateAvailableForWithdraw(investment);

  // ❌ BLOCK BEFORE MATURITY
  // if (available <= 0) {
  //   throw new Error('Withdrawal is only allowed after maturity date');
  // }

  if (payload.amount > available) {
    throw new Error('Withdrawal exceeds available balance!');
  }

  applicant.withdrawals!.push({
    investmentId: investment._id,
    amount: payload.amount,
  });

  await applicant.save();

  return applicant;
};

const approveWithdrawal = async (applicantId: string, withdrawalId: string) => {
  const applicant = await Applicant.findById(applicantId);
  if (!applicant) throw new Error('Applicant not found');

  const withdrawal = applicant.withdrawals?.id(withdrawalId);
  if (!withdrawal) throw new Error('Withdrawal not found');

  const investment = applicant.investmentDetails?.id(withdrawal.investmentId);
  if (!investment) throw new Error('Investment not found');

  const available = calculateAvailableForWithdraw(investment);

  // if (available <= 0) {
  //   throw new Error('Cannot approve withdrawal before maturity date');
  // }

  if (withdrawal.amount > available) {
    throw new Error('Withdrawal exceeds available balance!');
  }

  investment.withdrawnAmount =
    (investment.withdrawnAmount || 0) + withdrawal.amount;

  investment.availableForWithdraw = calculateAvailableForWithdraw(investment);

  withdrawal.status = 'Approved';

  await applicant.save();

  return applicant;
};

// const approveWithdrawal = async (applicantId: string, withdrawalId: string) => {
//   const applicant = await Applicant.findById(applicantId);
//   if (!applicant) throw new Error('Applicant not found');

//   const withdrawal = applicant.withdrawals?.id(withdrawalId);
//   if (!withdrawal) throw new Error('Withdrawal not found');

//   if (withdrawal.status === 'Approved') {
//     throw new Error('Already approved');
//   }

//   const investment = applicant.investmentDetails?.id(withdrawal.investmentId);
//   if (!investment) throw new Error('Investment not found');

//   // const available = Number(
//   //   ((investment.totalReturn || 0) - (investment.withdrawnAmount || 0)).toFixed(
//   //     2
//   //   )
//   // );

//   // const available = Number((investment.availableForWithdraw || 0).toFixed(2));
//   const available = calculateAvailableForWithdraw(investment);

//   // console.log('Requesting withdrawal for available:', available);

//   if (withdrawal.amount > available) {
//     throw new Error('Withdrawal exceeds available balance!');
//   }

//   investment.withdrawnAmount =
//     (investment.withdrawnAmount || 0) + withdrawal.amount;

//   investment.availableForWithdraw = calculateAvailableForWithdraw(investment);

//   withdrawal.status = 'Approved';

//   await applicant.save();

//   return applicant;
// };

// const getByToken = async (token: string) => {
//   const applicant = await Applicant.findOne({
//     applicationToken: token,
//     tokenExpiresAt: { $gt: new Date() },
//   });

//   if (!applicant) {
//     throw new Error('Invalid or expired token');
//   }

//   return applicant;
// };

export const ApplicantService = {
  createApplicant,
  startApplication,
  getAllApplicants,
  getSingleApplicant,
  updateApplicant,
  deleteApplicant,
  //   getByToken,
  progressApplication,

  addInvestment,
  requestWithdrawal,
  approveWithdrawal,
};

// const createApplicant = async (payload: any) => {
//   // ✅ Secure random token (better than uuid)
//   const token = crypto.randomBytes(32).toString('hex');

//   const applicant = await Applicant.create({
//     ...payload,
//     applicationToken: token,
//     tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
//     status: 'Sent',
//   });

//   const link = `${process.env.FRONTEND_URL}/complete-application/${token}`;

//   await sendEmail(
//     applicant.email,
//     'Your account application is almost complete',
//     `
//     <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
//       <h2 style="color:#001529;">Aviva Wealth</h2>
//       <p>Helping clients build a secure future, one day at a time</p>
//       <hr/>
//       <p>Dear ${applicant.title} ${applicant.firstName} ${applicant.lastName},</p>
//       <p>Your account application is nearly complete - just a few final steps remain.</p>

//       <div style="text-align:center; margin:30px 0;">
//         <a href="${link}"
//            style="background:#001529;
//                   color:white;
//                   padding:12px 25px;
//                   text-decoration:none;
//                   border-radius:4px;
//                   font-weight:bold;">
//           Start Application
//         </a>
//       </div>

//       <p>To complete your account setup, please provide:</p>
//       <ul>
//         <li>Digital copy of your passport</li>
//         <li>Recent utility bill or bank/credit card statement (within 3 months)</li>
//       </ul>

//       <p>After your application is complete, we will email you with the next steps.</p>
//       <p>Kind regards,<br/>Client Services Team</p>

//       <hr/>
//       <p style="font-size:12px; color:gray;">
//       This email was sent to ${applicant.email}.
//       Please do not reply to this email as the mailbox is unattended.
//       </p>
//     </div>
//     `
//   );

//   return applicant;
// };

/**
 * 🔹 Public - Get applicant by token
 */
