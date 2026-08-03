/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { sendEmail } from '../../../utils/sendEmail';
import { Applicant } from './applicant.model';
import { User } from '../user/user.model';
import {
  buildTransactions,
  calculateInvestment,
  generateBondNumber,
} from './applicant.utils';
import { calculateAvailableForWithdraw } from './applicant.utils';
import { IIPOShares } from './applicant.types';
// import { generateUniqueBondNumber } from './applicant.types';

/**
 * 🔹 Create Applicant (Admin)
 * Generates secure token using crypto
 */

// const createApplicant = async (payload: any, admin: any) => {
//   const frontendUrl = process.env.FRONTEND_URL;
//   if (!frontendUrl) throw new Error('FRONTEND_URL not configured!');

//   // Validate email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(payload.email)) throw new Error('Invalid email format!');

//   // Check if applicant already exists
//   const existingUser = await User.findOne({ email: payload.email });
//   if (existingUser) throw new Error('A User with this email already exists!');

//   // Check if applicant already exists
//   const existing = await Applicant.findOne({ email: payload.email });
//   if (existing) throw new Error('An applicant with this email already exists!');

//   if (!admin?.email) throw new Error('Invalid admin session.');

//   // Prevent admin creating applicant for themselves
//   if (payload?.email === admin?.email)
//     throw new Error('Admin email and applicant email cannot be the same.');

//   // Generate token, reference number
//   const token = crypto.randomBytes(32).toString('hex');
//   const referenceNumber = crypto.randomBytes(5).toString('hex').toUpperCase();

//   // 🔹 Role check
//   const role = payload.role || 'user';

//   // Generate password ONLY for users
//   let generatedPassword: string | null = null;
//   if (role === 'user') {
//     generatedPassword = crypto.randomBytes(4).toString('hex'); // 8 char password
//   }

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
//     password: generatedPassword, // will be null for admin
//     role,
//   });

//   // 3️⃣ Send email
//   // DB Wealth - Complete your bond application & Account Login
//   try {
//     sendEmail(
//       applicant.email,
//       'Your Deutsche Bank Application – Next Steps',
//       `
//        <table
//       role="presentation"
//       cellspacing="0"
//       cellpadding="0"
//       border="0"
//       style="
//         font-family: Arial, Helvetica, sans-serif;
//         background:#ffffff;
//         width:100%;
//         max-width:620px;
//         margin:0 auto;
//       "
// >
//   <tr>
//     <td align="center">

//       <!-- Container -->
//       <table
//         role="presentation"
//         width="100%"
//         cellspacing="0"
//         cellpadding="0"
//         border="0"
//         style="width: 100%;"
//       >

//         <!-- Logo -->
//         <tr>
//           <td align="center" style="padding:10px 0;">
//             <img
//               src="https://wealthdb.vercel.app/img/Deutsche-Bank-Logo-Transparent.png"
//               alt="Deutsche Bank"
//               width="300"
//               style="display:block;border:0;"
//             />
//           </td>
//         </tr>

//         <!-- Banner -->
//         <tr>
//           <td
//             bgcolor="#1327a7"
//             style="
//               padding:20px;
//               text-align:center;
//               border-radius:5px;
//             "
//           >
//             <div style="width: max-content; margin: 0 auto;">
//               <div
//                 style="
//                   color:#ffffff;
//                   font-size:28px;
//                   font-weight:bold;
//                   line-height:34px;
//                 "
//               >
//                 Complete Your Account Setup
//               </div>

//               <hr style="color: #8080802e; opacity: 0.5; Margin: 15px auto;" />

//               <div
//                 style="
//                   color:#ffffff;
//                   font-size:16px;
//                   line-height:24px;
//                 "
//               >
//                 Your wealth management account is nearly ready.
//               </div>
//             </div>
//           </td>
//         </tr>

//         <!-- Spacer -->
//         <tr>
//           <td height="30"></td>
//         </tr>

//         <!-- Greeting -->
//         <tr>
//           <td
//             style="
//               font-size:16px;
//               line-height:24px;
//               color:#333333;
//               padding-bottom:8px;
//             "
//           >
//             Dear ${applicant.title} ${applicant.firstName}
//             ${applicant.lastName},
//           </td>
//         </tr>

//         <!-- Intro -->
//         <tr>
//           <td
//             style="
//               font-size:16px;
//               line-height:24px;
//               color:#333333;
//               padding-bottom:20px;
//             "
//           >
//              Your account application is almost complete. Please log in to finalize      your setup by completing a few last steps.
//           </td>
//         </tr>

//         <!-- Login Details Box -->
//         <tr>
//           <td>
//             <table
//               width="100%"
//               cellspacing="0"
//               cellpadding="0"
//               border="0"
//               style="
//                 background:#f8faff;
//                 border:1px solid #e5e5e5;
//                 border-radius:5px;
//               "
//             >
//               <tr>
//                 <td style="padding:20px;">
//                   ${
//                     role === 'user'
//                       ? `
//                   <div style="font-size:20px;font-weight:bold;padding-bottom:10px;">
//                     Your Login Details
//                   </div>

//                   <div style="padding-bottom:5px;">
//                     <strong>User Email:</strong> ${user.email}
//                   </div>

//                   <div>
//                     <strong>Temporary Password:</strong> ${generatedPassword}
//                   </div>
//                   `
//                       : `
//                   <div style="font-size:20px;font-weight:bold;">
//                     Your admin account has been created successfully.
//                   </div>
//                   `
//                   }
//                 </td>
//               </tr>
//             </table>
//           </td>
//         </tr>

//         <!-- Spacer -->
//         <tr>
//           <td height="30"></td>
//         </tr>

//         <!-- CTA Button -->
//         <tr>
//           <td align="center">

//             <!-- Outlook Safe Button -->
//             <table
//               role="presentation"
//               cellspacing="0"
//               cellpadding="0"
//               border="0"
//             >
//               <tr>
//                 <td
//                   bgcolor="#1327a7"
//                   style="
//                     border-radius:4px;
//                     text-align:center;
//                   "
//                 >
//                   <a
//                     href="${frontendUrl}/login"
//                     style="
//                       display:inline-block;
//                       color:#ffffff;
//                       text-decoration:none;
//                       padding:12px 25px;
//                       font-weight:bold;
//                     "
//                   >
//                     LOGIN TO COMPLETE SETUP
//                   </a>
//                 </td>
//               </tr>
//             </table>

//           </td>
//         </tr>

//         <!-- Spacer -->
//         <tr>
//           <td height="30"></td>
//         </tr>

//         <!-- Documents -->
//         <tr>
//           <td
//             style="
//               font-size:16px;
//               color:#333333;
//               padding-bottom:5px;
//               font-weight: bold
//             "
//           >
//             To finalize your setup, please provide:
//           </td>
//         </tr>

//         <tr>
//           <td
//             style="
//               font-size:16px;
//               line-height:24px;
//               color:#333333;
//               padding-left:20px;
//             "
//           >
//             • Digital copy of your passport<br />
//             • Recent utility bill or bank/credit card statement (within 3 months)
//           </td>
//         </tr>

//         <!-- Divider -->
//         <tr>
//           <td
//             style="
//               padding:20px 0 10px 0;
//             "
//           >
//            <hr style="color: #8080802e; opacity: 0.5;" />
//           </td>
//         </tr>

//         <!-- Signature -->
//         <tr>
//           <td
//             style="
//               color:#1327a7;
//               font-size:18px;
//               line-height:28px;
//               font-weight:bold;
//             "
//           >
//             Kind Regards,
//           </td>
//         </tr>

//         <tr>
//           <td
//             style="
//               color:#1327a7;
//               font-size:18px;
//               line-height:28px;
//               font-weight:bold;
//             "
//           >
//             Client Services Team
//           </td>
//         </tr>

//         <tr>
//           <td
//             style="
//               color:#2c82be;
//               font-size:12px;
//               line-height:18px;
//               padding-top:5px;
//             "
//           >
//             Deutsche Bank Wealth Management (DB UK Bank Limited)
//           </td>
//         </tr>

//         <tr>
//           <td
//             style="
//               color:#333333;
//               font-size:12px;
//               line-height:20px;
//             "
//           >
//             ✉️ wealth@dwouk-db.com
//           </td>
//         </tr>

//         <tr>
//           <td
//             style="
//               color:#333333;
//               font-size:12px;
//               line-height:20px;
//             "
//           >
//             <a href="https://db.com" target="_blank" rel="noopener noreferrer">🌐 wealth-db.co.uk</a>
//           </td>
//         </tr>

//         <tr>
//           <td
//             style="
//               color:#333333;
//               font-size:12px;
//               line-height:20px;
//             "
//           >
//             📍 21 Moorfields, London, EC2Y 9DB
//           </td>
//         </tr>

//         <!-- Spacer -->
//         <tr>
//           <td height="10"></td>
//         </tr>

//         <!-- Disclaimer -->
//         <tr>
//           <td
//             style="
//               font-size:11px;
//               line-height:17px;
//               color:#666666;
//             "
//           >
//                 Deutsche Bank Wealth Management (DB UK Bank Limited) is
//                 committed to protecting and respecting your privacy at
//                 all times. For the purposes of the Data Protection Act
//                 2018 and the General Data Protection Regulation (EU)
//                 2016/679 (&ldquo;GDPR&rdquo;), the data controller is DB
//                 UK Bank Limited (trading as Deutsche Bank Wealth
//                 Management), with its registered office at 21
//                 Moorfields, London, EC2Y 9DB, United Kingdom. DB UK Bank
//                 Limited is authorised and regulated by the Financial
//                 Conduct Authority (FCA) under firm reference number
//                 140848.
//           </td>
//         </tr>

//       </table>

//     </td>
//   </tr>
// </table>
//       `
//     );
//   } catch (error) {
//     await Applicant.findByIdAndDelete(applicant._id);
//     await User.findByIdAndDelete(user._id);
//     throw new Error('Failed to send email. Applicant was not created.');
//   }

//   return { applicant, user };
// };

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
  // let generatedPassword: string | null = null;
  // if (role === 'user') {
  //   generatedPassword = crypto.randomBytes(4).toString('hex'); // 8 char password
  // }

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
  // const user = await User.create({
  //   email: payload.email,
  //   firstName: payload.firstName,
  //   lastName: payload.lastName,
  //   password: generatedPassword, // will be null for admin
  //   role,
  // });

  // 3️⃣ Send email
  // DB Wealth - Complete your bond application & Account Login
  try {
    sendEmail(
      applicant.email,
      'Your Deutsche Bank Application – Next Steps',
      `
       <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        font-family: Arial, Helvetica, sans-serif;
        background:#ffffff;
        width:100%;
        max-width:620px;
        margin:0 auto;
      "
>
  <tr>
    <td align="center">

      <!-- Container -->
      <table
        role="presentation"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        border="0"
        style="width: 100%;"
      >

        <!-- Logo -->
        <tr>
          <td align="center" style="padding:10px 0;">
            <img
              src="https://wealthdb.vercel.app/img/Deutsche-Bank-Logo-Transparent.png"
              alt="Deutsche Bank"
              width="300"
              style="display:block;border:0;"
            />
          </td>
        </tr>

        <!-- Banner -->
        <tr>
          <td
            bgcolor="#1327a7"
            style="
              padding:20px;
              text-align:center;
              border-radius:5px;
            "
          >
            <div style="width: max-content; margin: 0 auto;">
              <div
                style="
                  color:#ffffff;
                  font-size:28px;
                  font-weight:bold;
                  line-height:34px;
                "
              >
                Complete Your Account Setup
              </div>

              <hr style="color: #8080802e; opacity: 0.5; Margin: 15px auto;" />

              <div
                style="
                  color:#ffffff;
                  font-size:16px;
                  line-height:24px;
                "
              >
                Kindly complete your application.
              </div>
            </div>
          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="30"></td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td
            style="
              font-size:16px;
              line-height:24px;
              color:#333333;
              padding-bottom:8px;
            "
          >
            Dear ${applicant.title} ${applicant.firstName}
            ${applicant.lastName},
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td
            style="
              font-size:16px;
              line-height:24px;
              color:#333333;
              padding-bottom:20px;
            "
          >
             Your account application is almost there. Please fill up the remaining details to finalize your setup by completing a few last steps.
          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="30"></td>
        </tr>

        <!-- CTA Button -->
        <tr>
          <td align="center">

            <!-- Outlook Safe Button -->
            <table
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
            >
              <tr>
                <td
                  bgcolor="#1327a7"
                  style="
                    border-radius:4px;
                    text-align:center;
                  "
                >
                  <a
                    href="${frontendUrl}/application/${token}"
                    style="
                      display:inline-block;
                      color:#ffffff;
                      text-decoration:none;
                      padding:12px 25px;
                      font-weight:bold;
                    "
                  >
                    Complete Application
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="30"></td>
        </tr>

        <!-- Documents -->
        <tr>
          <td
            style="
              font-size:16px;
              color:#333333;
              padding-bottom:5px;
              font-weight: bold
            "
          >
            To finalize your setup, please provide:
          </td>
        </tr>

        <tr>
          <td
            style="
              font-size:16px;
              line-height:24px;
              color:#333333;
              padding-left:20px;
            "
          >
            • Digital copy of your passport<br />
            • Recent utility bill or bank/credit card statement (within 3 months)
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td
            style="
              padding:20px 0 10px 0;
            "
          >
           <hr style="color: #8080802e; opacity: 0.5;" />
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td
            style="
              color:#1327a7;
              font-size:18px;
              line-height:28px;
              font-weight:bold;
            "
          >
            Kind Regards,
          </td>
        </tr>

        <tr>
          <td
            style="
              color:#1327a7;
              font-size:18px;
              line-height:28px;
              font-weight:bold;
            "
          >
            Client Services Team
          </td>
        </tr>

        <tr>
          <td
            style="
              color:#2c82be;
              font-size:12px;
              line-height:18px;
              padding-top:5px;
            "
          >
            Deutsche Bank Wealth Management (DB UK Bank Limited)
          </td>
        </tr>

        <tr>
          <td
            style="
              color:#333333;
              font-size:12px;
              line-height:20px;
            "
          >
            ✉️ wealth@dwouk-db.com
          </td>
        </tr>

        <tr>
          <td
            style="
              color:#333333;
              font-size:12px;
              line-height:20px;
            "
          >
            <a href="https://db.com" target="_blank" rel="noopener noreferrer">🌐 wealth-db.co.uk</a>
          </td>
        </tr>

        <tr>
          <td
            style="
              color:#333333;
              font-size:12px;
              line-height:20px;
            "
          >
            📍 21 Moorfields, London, EC2Y 9DB
          </td>
        </tr>

        <!-- Spacer -->
        <tr>
          <td height="10"></td>
        </tr>

        <!-- Disclaimer -->
        <tr>
          <td
            style="
              font-size:11px;
              line-height:17px;
              color:#666666;
            "
          >
                Deutsche Bank Wealth Management (DB UK Bank Limited) is
                committed to protecting and respecting your privacy at
                all times. For the purposes of the Data Protection Act
                2018 and the General Data Protection Regulation (EU)
                2016/679 (&ldquo;GDPR&rdquo;), the data controller is DB
                UK Bank Limited (trading as Deutsche Bank Wealth
                Management), with its registered office at 21
                Moorfields, London, EC2Y 9DB, United Kingdom. DB UK Bank
                Limited is authorised and regulated by the Financial
                Conduct Authority (FCA) under firm reference number
                140848.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
      `
    );
  } catch (error) {
    await Applicant.findByIdAndDelete(applicant._id);
    // await User.findByIdAndDelete(user._id);
    throw new Error('Failed to send email. Applicant was not created.');
  }

  return { applicant };
  // return { applicant, user };
};

const getApplicantByToken = async (token: string) => {
  const applicant = await Applicant.findOne({
    applicationToken: token,
  });

  if (!applicant) {
    throw new Error('Invalid application link.');
  }

  if (applicant.tokenExpiresAt && applicant.tokenExpiresAt < new Date()) {
    throw new Error('Application link has expired.');
  }

  if (applicant.status === 'Completed') {
    throw new Error('Application already submitted.');
  }

  return applicant;
};

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

// const updateApplicant = async (id: string, payload: any) => {
//   const frontendUrl = process.env.FRONTEND_URL;
//   if (!frontendUrl) throw new Error('FRONTEND_URL not configured!');

//   const existingApplicant = await Applicant.findById(id);

//   if (!existingApplicant) {
//     throw new Error('Applicant not found!');
//   }

//   // console.log('Payload', payload);
//   // console.log('Payload', payload.settlement.existingBankAccount);

//   const previousStatus = existingApplicant.status;

//   const updateData: any = {};

//   if (payload.individualAccount) {
//     Object.keys(payload.individualAccount).forEach(key => {
//       updateData[`individualAccount.${key}`] = payload.individualAccount[key];
//     });
//   }

//   if (payload.jointAccount) {
//     Object.keys(payload.jointAccount).forEach(key => {
//       updateData[`jointAccount.${key}`] = payload.jointAccount[key];
//     });
//   }

//   if (payload.companyAccount) {
//     Object.keys(payload.companyAccount).forEach(key => {
//       updateData[`companyAccount.${key}`] = payload.companyAccount[key];
//     });
//   }

//   if (payload.status) {
//     updateData.status = payload.status;
//   }

//   if (payload?.identification?.identityVerification) {
//     updateData['identification.identityVerification'] =
//       payload.identification.identityVerification;
//   }

//   if (payload?.settlement?.existingBankAccount) {
//     updateData['settlement.existingBankAccount'] =
//       payload.settlement.existingBankAccount;
//   }

//   // 🔹 Role check
//   const role = payload.role || 'user';

//   let user: any = null;
//   let generatedPassword: string | null = null;
//   let applicant: any = null;

//   // ✅ Send email ONLY when status changes to "Approved"
//   if (payload.status === 'Approved' && previousStatus !== 'Approved') {
//     // Check if user already exists
//     const existingUser = await User.findOne({
//       email: payload.email,
//     });

//     if (existingUser) {
//       throw new Error('A User with this email already exists!');
//     }

//     // Generate password
//     if (role === 'user') {
//       generatedPassword = crypto.randomBytes(4).toString('hex');
//     }

//     // Create user
//     user = await User.create({
//       email: payload.email,
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//       password: generatedPassword,
//       role,
//     });

//     try {
//       await sendEmail(
//         existingApplicant.email,
//         'Your Deutsche Bank Account - Approved',
//         `
//           <table
//                 role="presentation"
//                 cellspacing="0"
//                 cellpadding="0"
//                 border="0"
//                 style="
//                   font-family: Arial, Helvetica, sans-serif;
//                   background:#ffffff;
//                   width:100%;
//                   max-width:620px;
//                   margin:0 auto;
//                 "
//           >
//             <tr>
//               <td align="center">

//                 <!-- Container -->
//                 <table
//                   role="presentation"
//                   width="100%"
//                   cellspacing="0"
//                   cellpadding="0"
//                   border="0"
//                   style="width: 100%;"
//                 >

//                   <!-- Logo -->
//                   <tr>
//                     <td align="center" style="padding:10px 0;">
//                       <img
//                         src="https://wealthdb.vercel.app/img/Deutsche-Bank-Logo-Transparent.png"
//                         alt="Deutsche Bank"
//                         width="300"
//                         style="display:block;border:0;"
//                       />
//                     </td>
//                   </tr>

//                   <!-- Banner -->
//                   <tr>
//                     <td
//                       bgcolor="#1327a7"
//                       style="
//                         padding:20px;
//                         text-align:center;
//                         border-radius:5px;
//                       "
//                     >
//                       <div style="width: max-content; margin: 0 auto;">
//                         <div
//                           style="
//                             color:#ffffff;
//                             font-size:28px;
//                             font-weight:bold;
//                             line-height:34px;
//                           "
//                         >
//                           Welcome Onboard
//                         </div>

//                         <hr style="color: #8080802e; opacity: 0.5; Margin: 15px auto;" />

//                         <div
//                           style="
//                             color:#ffffff;
//                             font-size:16px;
//                             line-height:24px;
//                           "
//                         >
//                           Your secure wealth management portal is now active.
//                         </div>
//                       </div>
//                     </td>
//                   </tr>

//                   <!-- Spacer -->
//                   <tr>
//                     <td height="30"></td>
//                   </tr>

//                   <!-- Greeting -->
//                   <tr>
//                     <td
//                       style="
//                         font-size:16px;
//                         line-height:24px;
//                         color:#333333;
//                         padding-bottom:8px;
//                       "
//                     >
//                       Dear
//                       ${existingApplicant.title}
//                       ${existingApplicant.firstName}
//                       ${existingApplicant.lastName},
//                     </td>
//                   </tr>

//                   <!-- Intro -->
//                   <tr>
//                     <td
//                       style="
//                         font-size:16px;
//                         line-height:24px;
//                         color:#333333;
//                         padding-bottom:20px;
//                       "
//                     >
//                       We're thrilled to have you as a valued client of <b>Deutsche Bank Wealth Management</b>. Your account is fully active.
//                     </td>
//                   </tr>

//                   <!-- Login Details Box -->
//                   <tr>
//                     <td>
//                       <table
//                         width="100%"
//                         cellspacing="0"
//                         cellpadding="0"
//                         border="0"
//                         style="
//                           background:#f8faff;
//                           border:1px solid #e5e5e5;
//                           border-radius:5px;
//                         "
//                       >
//                         <tr>
//                           <td style="padding:20px;">
//                             ${
//                               role === 'user'
//                                 ? `
//                             <div style="font-size:20px;font-weight:bold;padding-bottom:10px;">
//                               Your Login Details
//                             </div>

//                             <div style="padding-bottom:5px;">
//                               <strong>User Email:</strong> ${user.email}
//                             </div>

//                             <div>
//                               <strong>Temporary Password:</strong> ${generatedPassword}
//                             </div>
//                             `
//                                 : `
//                             <div style="font-size:20px;font-weight:bold;">
//                               Your admin account has been created successfully.
//                             </div>
//                             `
//                             }
//                           </td>
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>

//                   <!-- Spacer -->
//                   <tr>
//                     <td height="30"></td>
//                   </tr>

//                   <!-- CTA Button -->
//                   <tr>
//                     <td align="center">

//                       <!-- Outlook Safe Button -->
//                       <table
//                         role="presentation"
//                         cellspacing="0"
//                         cellpadding="0"
//                         border="0"
//                       >
//                         <tr>
//                           <td
//                             bgcolor="#1327a7"
//                             style="
//                               border-radius:4px;
//                               text-align:center;
//                             "
//                           >
//                             <a
//                               href="${frontendUrl}/login"
//                               style="
//                                 display:inline-block;
//                                 color:#ffffff;
//                                 text-decoration:none;
//                                 padding:12px 25px;
//                                 font-weight:bold;
//                               "
//                             >
//                               LOGIN TO COMPLETE SETUP
//                             </a>
//                           </td>
//                         </tr>
//                       </table>

//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                           font-size:16px;
//                           line-height:24px;
//                           color:#333333;
//                           padding-bottom:20px;
//                         "
//                     >
//                         <table role="presentation" cellpadding="0" cellspacing="0" border="0">
//                           <tr>
//                             <td width="30" valign="middle">
//                               <img src="https://wealthdb.vercel.app/img/lock.png"
//                                 alt="Access your account securely"
//                                 style="display:block;border:0;"
//                                 width="20"
//                                 />
//                             </td>

//                              <td valign="middle">Access your account securely</td>
//                           </tr>

//                            <tr>
//                               <td colspan="2" height="10" style="font-size:0;line-height:0;">
//                                 &nbsp;
//                               </td>
//                            </tr>

//                            <tr>
//                             <td width="30" valign="middle">
//                               <img src="https://wealthdb.vercel.app/img/stat.png"
//                                 alt="Review your investments and transactions"
//                                 style="display:block;border:0;"
//                                 width="20"
//                                 />
//                             </td>

//                              <td valign="middle">Review your investments and transactions</td>
//                           </tr>

//                           <tr>
//                               <td colspan="2" height="10" style="font-size:0;line-height:0;">
//                                 &nbsp;
//                               </td>
//                           </tr>

//                           <tr>
//                             <td width="30" valign="middle">
//                               <img src="https://wealthdb.vercel.app/img/wrench.png"
//                                 alt="Manage your profile and preferences"
//                                 style="display:block;border:0;"
//                                 width="20"
//                                 />
//                             </td>

//                              <td valign="middle">Manage your profile and preferences</td>
//                           </tr>

//                           <tr>
//                               <td colspan="2" height="10" style="font-size:0;line-height:0;">
//                                 &nbsp;
//                               </td>
//                           </tr>

//                           <tr>
//                             <td width="30" valign="middle">
//                               <img src="https://wealthdb.vercel.app/img/envelop.png"
//                                 alt="Connect with our client services team"
//                                 style="display:block;border:0;"
//                                 width="20"
//                                 />
//                             </td>

//                              <td valign="middle">Connect with our client services team</td>
//                           </tr>
//                         </table>
//                     </td>
//                   </tr>

//                   <!-- Spacer -->
//                   <tr>
//                     <td height="30"></td>
//                   </tr>

//                   <!-- CTA Button -->
//                   <tr>
//                     <td
//                       align="center"
//                       style="
//                           border:1px solid #e5e5e5;
//                           border-radius:5px;
//                           padding: 20px;
//                         "
//                     >

//                       <!-- Outlook Safe Button -->
//                       <table
//                         role="presentation"
//                         cellspacing="0"
//                         cellpadding="0"
//                         border="0"
//                         style="
//                           width: max-content
//                         "
//                       >
//                         <tr>
//                           <td
//                             bgcolor="#1327a7"
//                             style="
//                               border-radius:4px;
//                               text-align:center;
//                             "
//                           >
//                             <a
//                               href="${frontendUrl}/login"
//                               style="
//                                 display:inline-block;
//                                 color:#ffffff;
//                                 text-decoration:none;
//                                 padding:12px 25px;
//                                 font-weight:bold;
//                               "
//                             >
//                               LOGIN TO YOUR ACCOUNT
//                             </a>
//                           </td>
//                         </tr>
//                       </table>

//                     </td>
//                   </tr>

//                   <!-- Spacer -->
//                   <tr>
//                     <td height="30"></td>
//                   </tr>

//                   <!-- Documents -->
//                   <tr>
//                     <td
//                       style="
//                         font-size:16px;
//                         color:#333333;
//                         padding-bottom:5px;
//                         font-weight: bold
//                       "
//                     >
//                       What Happens Next?
//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                         font-size:16px;
//                         line-height:24px;
//                         color:#333333;
//                         padding-left:20px;
//                       "
//                     >
//                       • Log in using your credentials<br />
//                       • Create a new secure password<br />
//                       • Review your account information<br />
//                       • Start managing your wealth portfolio
//                     </td>
//                   </tr>

//                   <!-- Divider -->
//                   <tr>
//                     <td
//                       style="
//                         padding:20px 0 10px 0;
//                       "
//                     >
//                     <hr style="color: #8080802e; opacity: 0.5;" />
//                     </td>
//                   </tr>

//                   <!-- Signature -->
//                   <tr>
//                     <td
//                       style="
//                         color:#1327a7;
//                         font-size:18px;
//                         line-height:28px;
//                         font-weight:bold;
//                       "
//                     >
//                       Kind Regards,
//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                         color:#1327a7;
//                         font-size:18px;
//                         line-height:28px;
//                         font-weight:bold;
//                       "
//                     >
//                       Client Services Team
//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                         color:#2c82be;
//                         font-size:12px;
//                         line-height:18px;
//                         padding-top:5px;
//                       "
//                     >
//                       Deutsche Bank Wealth Management (DB UK Bank Limited)
//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                         color:#333333;
//                         font-size:12px;
//                         line-height:20px;
//                       "
//                     >
//                       ✉️ wealth@dwouk-db.com
//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                         color:#333333;
//                         font-size:12px;
//                         line-height:20px;
//                       "
//                     >
//                       <a href="https://db.com" target="_blank" rel="noopener noreferrer">🌐 wealth-db.co.uk</a>
//                     </td>
//                   </tr>

//                   <tr>
//                     <td
//                       style="
//                         color:#333333;
//                         font-size:12px;
//                         line-height:20px;
//                       "
//                     >
//                       📍 21 Moorfields, London, EC2Y 9DB
//                     </td>
//                   </tr>

//                   <!-- Spacer -->
//                   <tr>
//                     <td height="10"></td>
//                   </tr>

//                   <!-- Disclaimer -->
//                   <tr>
//                     <td
//                       style="
//                         font-size:11px;
//                         line-height:17px;
//                         color:#666666;
//                       "
//                     >
//                           Deutsche Bank Wealth Management (DB UK Bank Limited) is
//                           committed to protecting and respecting your privacy at
//                           all times. For the purposes of the Data Protection Act
//                           2018 and the General Data Protection Regulation (EU)
//                           2016/679 (&ldquo;GDPR&rdquo;), the data controller is DB
//                           UK Bank Limited (trading as Deutsche Bank Wealth
//                           Management), with its registered office at 21
//                           Moorfields, London, EC2Y 9DB, United Kingdom. DB UK Bank
//                           Limited is authorised and regulated by the Financial
//                           Conduct Authority (FCA) under firm reference number
//                           140848.
//                     </td>
//                   </tr>

//                 </table>

//               </td>
//             </tr>
//           </table>
//         `
//       );

//       applicant = await Applicant.findByIdAndUpdate(id, updateData, {
//         new: true,
//         runValidators: true,
//       });
//     } catch (error) {
//       // console.error('Approval email failed:', error);
//       if (user) {
//         await User.findByIdAndDelete(user._id);
//       }
//       throw new Error('Failed to send email. Account has not been updated.');
//       // ❗ Do NOT throw error (important)
//       // otherwise update will fail even though DB is already updated
//     }
//   }

//   if (!applicant) {
//     applicant = await Applicant.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });
//   }

//   return { applicant, user };
// };

const updateApplicant = async (id: string, payload: any) => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) throw new Error('FRONTEND_URL not configured!');

  // console.log('Payload', payload);

  // Check if applicant already exists
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) throw new Error('A User with this email already exists!');

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

  // 🔹 Role check
  const role = payload.role || 'user';

  // Generate password ONLY for users
  let generatedPassword: string | null = null;
  if (role === 'user') {
    generatedPassword = crypto.randomBytes(4).toString('hex'); // 8 char password
  }

  // 2️⃣ Create User for login
  const user = await User.create({
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: generatedPassword, // will be null for admin
    role,
  });

  const applicant = await Applicant.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  // ✅ Send email ONLY when status changes to "Approved"
  if (payload.status === 'Approved' && previousStatus !== 'Approved') {
    try {
      sendEmail(
        existingApplicant.email,
        'Your Deutsche Bank Account - Approved',
        `
          <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  font-family: Arial, Helvetica, sans-serif;
                  background:#ffffff;
                  width:100%;
                  max-width:620px;
                  margin:0 auto;
                "
          >
            <tr>
              <td align="center">

                <!-- Container -->
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="width: 100%;"
                >

                  <!-- Logo -->
                  <tr>
                    <td align="center" style="padding:10px 0;">
                      <img
                        src="https://wealthdb.vercel.app/img/Deutsche-Bank-Logo-Transparent.png"
                        alt="Deutsche Bank"
                        width="300"
                        style="display:block;border:0;"
                      />
                    </td>
                  </tr>

                  <!-- Banner -->
                  <tr>
                    <td
                      bgcolor="#1327a7"
                      style="
                        padding:20px;
                        text-align:center;
                        border-radius:5px;
                      "
                    >
                      <div style="width: max-content; margin: 0 auto;">
                        <div
                          style="
                            color:#ffffff;
                            font-size:28px;
                            font-weight:bold;
                            line-height:34px;
                          "
                        >
                          Welcome Onboard
                        </div>

                        <hr style="color: #8080802e; opacity: 0.5; Margin: 15px auto;" />

                        <div
                          style="
                            color:#ffffff;
                            font-size:16px;
                            line-height:24px;
                          "
                        >
                          Your secure wealth management portal is now active.
                        </div>
                      </div>
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr>
                    <td height="30"></td>
                  </tr>

                  <!-- Greeting -->
                  <tr>
                    <td
                      style="
                        font-size:16px;
                        line-height:24px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      Dear
                      ${existingApplicant.title}
                      ${existingApplicant.firstName}
                      ${existingApplicant.lastName},
                    </td>
                  </tr>

                  <!-- Intro -->
                  <tr>
                    <td
                      style="
                        font-size:16px;
                        line-height:24px;
                        color:#333333;
                        padding-bottom:20px;
                      "
                    >
                      We're thrilled to have you as a valued client of <b>Deutsche Bank Wealth Management</b>. Your account is fully active.
                    </td>
                  </tr>

                  <!-- Login Details Box -->
                  <tr>
                    <td>
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="
                          background:#f8faff;
                          border:1px solid #e5e5e5;
                          border-radius:5px;
                        "
                      >
                        <tr>
                          <td style="padding:20px;">
                            ${
                              role === 'user'
                                ? `
                            <div style="font-size:20px;font-weight:bold;padding-bottom:10px;">
                              Your Login Details
                            </div>

                            <div style="padding-bottom:5px;">
                              <strong>User Email:</strong> ${user.email}
                            </div>

                            <div>
                              <strong>Temporary Password:</strong> ${generatedPassword}
                            </div>
                            `
                                : `
                            <div style="font-size:20px;font-weight:bold;">
                              Your admin account has been created successfully.
                            </div>
                            `
                            }
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr>
                    <td height="30"></td>
                  </tr>

                  <!-- CTA Button -->
                  <tr>
                    <td align="center">

                      <!-- Outlook Safe Button -->
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            bgcolor="#1327a7"
                            style="
                              border-radius:4px;
                              text-align:center;
                            "
                          >
                            <a
                              href="${frontendUrl}/login"
                              style="
                                display:inline-block;
                                color:#ffffff;
                                text-decoration:none;
                                padding:12px 25px;
                                font-weight:bold;
                              "
                            >
                              LOGIN TO YOUR ACCOUNT
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr>
                    <td height="30"></td>
                  </tr>

                  <!-- Documents -->
                  <tr>
                    <td
                      style="
                        font-size:16px;
                        color:#333333;
                        padding-bottom:5px;
                        font-weight: bold
                      "
                    >
                      What Happens Next?
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:16px;
                        line-height:24px;
                        color:#333333;
                        padding-left:20px;
                      "
                    >
                      • Log in using your credentials<br />
                      • Create a new secure password<br />
                      • Review your account information<br />
                      • Start managing your wealth portfolio
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td
                      style="
                        padding:20px 0 10px 0;
                      "
                    >
                    <hr style="color: #8080802e; opacity: 0.5;" />
                    </td>
                  </tr>

                  <!-- Signature -->
                  <tr>
                    <td
                      style="
                        color:#1327a7;
                        font-size:18px;
                        line-height:28px;
                        font-weight:bold;
                      "
                    >
                      Kind Regards,
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        color:#1327a7;
                        font-size:18px;
                        line-height:28px;
                        font-weight:bold;
                      "
                    >
                      Client Services Team
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        color:#2c82be;
                        font-size:12px;
                        line-height:18px;
                        padding-top:5px;
                      "
                    >
                      Deutsche Bank Wealth Management (DB UK Bank Limited)
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        color:#333333;
                        font-size:12px;
                        line-height:20px;
                      "
                    >
                      ✉️ wealth@dwouk-db.com
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        color:#333333;
                        font-size:12px;
                        line-height:20px;
                      "
                    >
                      <a href="https://db.com" target="_blank" rel="noopener noreferrer">🌐 wealth-db.co.uk</a>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        color:#333333;
                        font-size:12px;
                        line-height:20px;
                      "
                    >
                      📍 21 Moorfields, London, EC2Y 9DB
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr>
                    <td height="10"></td>
                  </tr>

                  <!-- Disclaimer -->
                  <tr>
                    <td
                      style="
                        font-size:11px;
                        line-height:17px;
                        color:#666666;
                      "
                    >
                          Deutsche Bank Wealth Management (DB UK Bank Limited) is
                          committed to protecting and respecting your privacy at
                          all times. For the purposes of the Data Protection Act
                          2018 and the General Data Protection Regulation (EU)
                          2016/679 (&ldquo;GDPR&rdquo;), the data controller is DB
                          UK Bank Limited (trading as Deutsche Bank Wealth
                          Management), with its registered office at 21
                          Moorfields, London, EC2Y 9DB, United Kingdom. DB UK Bank
                          Limited is authorised and regulated by the Financial
                          Conduct Authority (FCA) under firm reference number
                          140848.
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        `
      );
    } catch (error) {
      // console.error('Approval email failed:', error);
      await User.findByIdAndDelete(user._id);
      throw new Error('Failed to send email. Account has not been updated.');
      // ❗ Do NOT throw error (important)
      // otherwise update will fail even though DB is already updated
    }
  }

  return { applicant, user };
};

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

const addInvestment = async (applicantId: string, payload: any) => {
  const applicant = await Applicant.findById(applicantId);
  if (!applicant) throw new Error('Applicant not found');

  // console.log('Add Investment', payload);

  // console.log('Add Investment:', applicantId);
  // console.log('Add Investment:', applicant);

  // const profitPercentage = getProfitRate(payload.bondInvestmentOption);

  if (
    typeof payload.profitPercentage !== 'number' ||
    payload.profitPercentage <= 0
  ) {
    throw new Error('Valid profitPercentage is required');
  }

  // const bondNumber = await generateUniqueBondNumber();
  const bondNumber = generateBondNumber(payload.bondInvestmentOption);

  // console.log('BondNumber:', bondNumber);

  const calc = calculateInvestment({
    ...payload,
    profitPercentage: payload.profitPercentage,
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

  console.log(applicant.investmentDetails.map(i => i.bondInvestmentOption));

  await applicant.save();

  return applicant;
};

const updateInvestment = async (
  applicantId: string,
  investmentId: string,
  payload: any
) => {
  const applicant = await Applicant.findById(applicantId);

  // console.log('Update Paylod:', applicantId, investmentId, payload);

  if (!applicant) {
    throw new Error('Applicant not found!');
  }

  const investment = applicant.investmentDetails.id(investmentId);

  if (!investment) {
    throw new Error('Investment not found!');
  }

  // update only provided fields
  Object.assign(investment, payload);

  // recalculate if required
  if (
    payload.investmentAmount ||
    payload.profitPercentage ||
    payload.bondLengthInMonths ||
    payload.maturityDate ||
    payload.investmentLength
  ) {
    const calc = calculateInvestment({
      investmentAmount: investment.investmentAmount,
      investmentLength: investment.investmentLength,
      bondLengthInMonths: investment.bondLengthInMonths,
      maturityDate: investment.maturityDate,
      profitPercentage: investment.profitPercentage,
    });

    investment.dailyReturn = calc.dailyReturn;
    investment.monthlyReturn = calc.monthlyReturn;
    investment.annualReturn = calc.annualReturn;
    investment.totalReturn = calc.totalReturn;

    investment.availableForWithdraw = Number(
      (
        investment.investmentAmount +
        calc.totalReturn -
        (investment.withdrawnAmount || 0)
      ).toFixed(2)
    );
  }

  await applicant.save();

  return applicant;
};

const deleteInvestment = async (applicantId: string, investmentId: string) => {
  const applicant = await Applicant.findById(applicantId);

  console.log('Update Paylod:', applicantId, investmentId);

  if (!applicant) {
    throw new Error('Applicant not found!');
  }

  const investment = applicant.investmentDetails.id(investmentId);

  if (!investment) {
    throw new Error('Investment not found!');
  }

  investment.deleteOne();

  // optional:
  applicant.withdrawals.forEach((withdrawal, index) => {
    if (withdrawal.investmentId.toString() === investmentId) {
      applicant.withdrawals[index].deleteOne();
    }
  });

  await applicant.save();

  return applicant;
};

const addIPOSharesService = async (applicantId: string, payload: any) => {
  const applicant = await Applicant.findById(applicantId);

  console.log('IPO Shares:', payload);
  console.log('IPO Shares:', applicantId);
  console.log('IPO Shares:', applicant);

  if (!applicant) {
    throw new Error('Applicant not found!');
  }

  if (typeof payload.sharesIssued !== 'number' || payload.sharesIssued <= 0) {
    throw new Error('Valid shares Issued is required!');
  }

  if (typeof payload.sharesPrice !== 'number' || payload.sharesPrice <= 0) {
    throw new Error('Valid shares Price is required!');
  }

  const totalReturn = Number(
    (payload.sharesIssued * payload.sharesPrice).toFixed(2)
  );

  const newIPOShares = {
    ...payload,
    totalReturn,
    availableForWithdraw: totalReturn,
    withdrawnAmount: 0,
  };

  applicant.ipoShares.push(newIPOShares);

  await applicant.save();

  return applicant;
};

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

const getAllTransactionsService = async () => {
  const applicants = await Applicant.find();

  const transactions = buildTransactions(applicants);

  // sort newest first
  const sorted = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted;
};

const getTotalInvestedService = async () => {
  const applicants = await Applicant.find();

  let totalBondInvested = 0;
  let totalIPOSharesInvested = 0;

  applicants.forEach(applicant => {
    totalBondInvested +=
      applicant.investmentDetails?.reduce(
        (sum, inv) => sum + (inv.investmentAmount || 0),
        0
      ) || 0;

    totalIPOSharesInvested +=
      applicant?.ipoShares?.reduce(
        (sum, inv) => sum + (inv.totalReturn || 0),
        0
      ) || 0;
  });

  return {
    totalBondInvested,
    totalIPOSharesInvested,
    grandTotal: totalBondInvested + totalIPOSharesInvested,
  };
};

const getMyPortfolioService = async (userEmail: string) => {
  const applicant = await Applicant.findOne({ email: userEmail });

  if (!applicant) {
    throw new Error('Applicant not found');
  }

  const totalBondInvested =
    applicant.investmentDetails?.reduce(
      (sum, inv) => sum + (inv.investmentAmount || 0),
      0
    ) || 0;

  const totalIPOSharesInvested =
    applicant.ipoShares?.reduce(
      (sum, share) => sum + (share.totalReturn || 0),
      0
    ) || 0;

  const investmentInterest =
    applicant.investmentDetails?.reduce(
      (sum, share) => sum + (share.totalReturn || 0),
      0
    ) || 0;

  // const ipoInterest =
  //   applicant.ipoShares?.reduce(
  //     (sum, share) => sum + (share.totalReturn || 0),
  //     0
  //   ) || 0;

  const totalInterest = investmentInterest;

  return {
    totalBondInvested,
    totalIPOSharesInvested,
    grandTotal: totalBondInvested + totalIPOSharesInvested,
    totalInterest: Number(totalInterest.toFixed(2)),
  };
};

const getMyTransactionsService = async (userEmail: string) => {
  const applicant = await Applicant.findOne({ email: userEmail });

  if (!applicant) {
    throw new Error('Applicant not found');
  }

  const transactions: any[] = [];

  applicant.investmentDetails?.forEach(inv => {
    transactions.push({
      id: inv._id,
      type: 'Bond Invested',
      amount: inv.investmentAmount,
      date: inv.investedAt,
      meta: {
        bondNumber: inv.bondNumber,
      },
    });
  });

  applicant.withdrawals?.forEach(w => {
    transactions.push({
      id: w._id,
      type: 'Bond Withdrawal',
      amount: -w.amount,
      date: w.requestedAt,
      meta: {
        investmentId: w.investmentId,
        status: w.status,
      },
    });
  });

  applicant.ipoShares?.forEach(inv => {
    transactions.push({
      id: inv._id,
      type: "IPOS's Invested",
      amount: inv.totalReturn,
      date: inv.startDate,
      meta: {
        stockTicker: inv.stockTicker,
      },
    });
  });

  applicant.withdrawals?.forEach(w => {
    transactions.push({
      id: w._id,
      type: "IPOS's Withdrawal",
      amount: -w.amount,
      date: w.requestedAt,
      meta: {
        investmentId: w.investmentId,
        status: w.status,
      },
    });
  });

  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const ApplicantService = {
  createApplicant,
  getApplicantByToken,
  startApplication,
  getAllApplicants,
  getSingleApplicant,
  updateApplicant,
  deleteApplicant,
  //   getByToken,
  progressApplication,

  addInvestment,
  updateInvestment,
  deleteInvestment,

  requestWithdrawal,
  approveWithdrawal,

  getAllTransactionsService,
  getTotalInvestedService,

  getMyPortfolioService,
  getMyTransactionsService,

  addIPOSharesService,
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

// const getProfitRate = (option: 'Aviva' | 'JPMorgan') => {
//   if (option === 'Aviva') return 6.125;
//   if (option === 'JPMorgan') return 8.81;
//   throw new Error('Invalid bond investment option');
// };

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
