/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { sendEmail } from '../../../utils/sendEmail';
import { Applicant } from './applicant.model';
import { User } from '../user/user.model';

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
             style="background:linear-gradient(180deg, #000e28 0%, #011431 100%);
                    color:white;
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

  return {
    token,
    expiresAt: applicant.tokenExpiresAt,
  };
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

// const updateApplicant = async (id: string, payload: any) => {
//   payload.status = 'Completed';

//   return Applicant.findByIdAndUpdate(id, payload, { new: true });
// };

const updateApplicant = async (id: string, payload: any) => {
  const applicant = await Applicant.findById(id);

  if (!applicant) {
    throw new Error('Applicant not found');
  }

  // Include status with default "Completed"
  applicant.set({
    ...payload,
    status: payload.status || 'Completed',
  });

  await applicant.save();

  return applicant;
};

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
