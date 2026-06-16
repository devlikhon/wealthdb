// <div
//       style="
//         font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//         width: 100%;
//         max-width: 100%;
//         margin: auto;
//       "
//     >
//       <div style="width: max-content; margin: 10px auto !important">
//         <img
//           src="https://www.dwouk-db.com/img/Deutsche-Bank-Logo-Transparent.png"
//           alt="Deutsche Bank"
//           width="200"
//         />
//       </div>

//       <div
//         style="
//           width: 100%;
//           margin: 10px auto 30px auto;
//           padding: 20px;
//           box-sizing: border-box;
//           background-color: #1327a7;
//           border-radius: 5px;
//         "
//       >
//         <div style="width: max-content; margin: auto; text-align: center;">
//           <h2 style="color: #fff">Complete Your Account Setup</h2>
//           <hr style="color: #8080802e; opacity: 0.5;" />
//           <p style="color: #ffffffe3">
//             Your wealth management account is nearly ready.
//           </p>
//         </div>
//       </div>

//       <p style="margin-block-end: 5px !important; margin-block-start: 0 !important;">
//         Dear ${applicant.title} ${applicant.firstName} ${applicant.lastName},
//       </p>

//       <p style="margin-block-end: 5px !important; margin-block-start: 0 !important;">
//         Your account application is almost complete. Please log in to finalize
//         your setup by completing a few last steps.
//       </p>

//       <div
//         style="
//           background-color: #f8faff;
//           padding: 15px 25px;
//           border-radius: 5px;
//           border: 1px solid #8080802e;
//           margin: 30px auto !important;
//         "
//       >
//         ${
//           role === 'user'
//             ? `
//         <h3>Your Login Details</h3>
//         <p><b>User Email:</b> ${user.email}</p>
//         <p><b>Temporary Password:</b> ${generatedPassword}</p>
//         `
//             : `
//         <h3>Your admin account has been created successfully.</h3>
//         `
//         }
//       </div>

//       <a
//         href="${frontendUrl}/login"
//         style="
//           background: #1327a7;
//           color: white;
//           padding: 12px 25px;
//           text-decoration: none;
//           border-radius: 4px;
//           font-weight: bold;
//           margin: 20px auto;
//           width: max-content;
//           display: block;
//         "
//       >
//         LOGIN TO COMPLETE SETUP
//       </a>

//       <div>
//         <p style="margin-block-end: 5px !important; margin-block-start: 0 !important;">To finalize your setup, please provide:</p>
//         <ul style="margin-block-end: 5px; margin-block-start: 0;">
//           <li>Digital copy of your passport</li>
//           <li>
//             Recent utility bill or bank/credit card statement (within 3 months)
//           </li>
//         </ul>
//       </div>

//       <hr style="color: #8080802e; opacity: 0.5; margin: 30px auto 20px auto !important;" />

//       <table
//         style="
//           mso-table-lspace: 0pt;
//           mso-table-rspace: 0pt;
//           border-spacing: 0px;
//         "
//         width="100%"
//         cellspacing="0"
//         cellpadding="0"
//       >
//         <tbody>
//           <tr>
//             <td class="es-m-text" style="padding: 0; margin: 0" align="left">
//               <h3
//                 class="es-text-mobile-size-18"
//                 style="
//                   margin: 0;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   mso-line-height-rule: exactly;
//                   letter-spacing: 0;
//                   font-size: 18px;
//                   font-style: normal;
//                   font-weight: normal;
//                   line-height: 22px;
//                   color: #1327a7;
//                 "
//               >
//                 <strong style="font-weight: 700 !important"
//                   >Kind Regards,</strong
//                 >
//               </h3>

//               <h3
//                 class="es-text-mobile-size-18"
//                 style="
//                   margin: 0;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   mso-line-height-rule: exactly;
//                   letter-spacing: 0;
//                   font-size: 18px;
//                   font-style: normal;
//                   font-weight: normal;
//                   line-height: 22px;
//                   color: #1327a7;
//                 "
//               >
//                 <strong style="font-weight: 700 !important"
//                   >Client Services Team</strong
//                 >
//               </h3>

//               <p
//                 class="es-text-mobile-size-12"
//                 style="
//                   margin: 0;
//                   mso-line-height-rule: exactly;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   line-height: 18px;
//                   letter-spacing: 0;
//                   color: #2c82be;
//                   font-size: 12px;
//                 "
//               >
//                 <strong style="font-weight: 700 !important"
//                   >Deutsche Bank Wealth Management (DB UK Bank Limited)</strong
//                 >
//               </p>
//               <p
//                 class="es-text-mobile-size-13"
//                 style="
//                   margin: 0;
//                   mso-line-height-rule: exactly;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   line-height: 20px;
//                   letter-spacing: 0;
//                   color: #333333;
//                   font-size: 13px;
//                 "
//               >
//                 <strong style="font-weight: 700 !important">&nbsp;</strong>
//               </p>
//               <p
//                 class="es-text-mobile-size-12"
//                 style="
//                   margin: 0;
//                   mso-line-height-rule: exactly;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   line-height: 18px;
//                   letter-spacing: 0;
//                   color: #333333;
//                   font-size: 12px;
//                 "
//               >
//                 ✉️ wealth@dwouk-db.com
//               </p>
//               <p
//                 class="es-text-mobile-size-12"
//                 style="
//                   margin: 0;
//                   mso-line-height-rule: exactly;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   line-height: 18px;
//                   letter-spacing: 0;
//                   color: #333333;
//                   font-size: 12px;
//                 "
//               >
//                 🌐
//                 <a
//                   style="
//                     mso-line-height-rule: exactly;
//                     text-decoration: underline;
//                     color: #2c82be;
//                     font-size: 12px;
//                   "
//                   href="https://db.com"
//                   rel="noopener"
//                   >wealth-db.co.uk</a
//                 >
//               </p>
//               <p
//                 class="es-text-mobile-size-12"
//                 style="
//                   margin: 0;
//                   mso-line-height-rule: exactly;
//                   font-family: Arial, 'helvetica neue', helvetica, sans-serif;
//                   line-height: 18px;
//                   letter-spacing: 0;
//                   color: #333333;
//                   font-size: 12px;
//                 "
//               >
//                 📍 21 Moorfields, London, EC2Y 9DB
//               </p>
//             </td>
//           </tr>
//           <tr>
//             <td style="padding: 0; margin: 0; font-size: 0" align="left">
//               &nbsp;
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <table
//         class="es-right"
//         style="
//           mso-table-lspace: 0pt;
//           mso-table-rspace: 0pt;
//           border-spacing: 0px;
//           float: right;
//         "
//         cellspacing="0"
//         cellpadding="0"
//         align="right"
//       >
//         <tbody>
//           <tr>
//             <td style="padding: 0; margin: 0; width: 44px" align="left">
//               <table
//                 style="
//                   mso-table-lspace: 0pt;
//                   mso-table-rspace: 0pt;
//                   border-spacing: 0px;
//                 "
//                 width="100%"
//                 cellspacing="0"
//                 cellpadding="0"
//               >
//                 <tbody>
//                   <tr class="es-mobile-hidden">
//                     <td
//                       style="padding: 0; margin: 0; font-size: 0"
//                       align="center"
//                       height="10"
//                     >
//                       &nbsp;
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <table
//         style="
//           mso-table-lspace: 0pt;
//           mso-table-rspace: 0pt;
//           border-spacing: 0px;
//         "
//         width="100%"
//         cellspacing="0"
//         cellpadding="0"
//       >
//         <tbody>
//           <tr>
//             <td style="padding: 0; margin: 0; width: 560px" align="left">
//               <table
//                 style="
//                   mso-table-lspace: 0pt;
//                   mso-table-rspace: 0pt;
//                   border-spacing: 0px;
//                 "
//                 width="100%"
//                 cellspacing="0"
//                 cellpadding="0"
//               >
//                 <tbody>
//                   <tr>
//                     <td
//                       class="es-m-text"
//                       style="padding: 0; margin: 0"
//                       align="left"
//                     >
//                       <p
//                         class="es-text-mobile-size-11"
//                         style="
//                           margin: 0;
//                           mso-line-height-rule: exactly;
//                           font-family: Arial, 'helvetica neue', helvetica,
//                             sans-serif;
//                           line-height: 17px;
//                           letter-spacing: 0;
//                           color: #666666;
//                           font-size: 11px;
//                         "
//                       >
//                         Deutsche Bank Wealth Management (DB UK Bank Limited) is
//                         committed to protecting and respecting your privacy at
//                         all times. For the purposes of the Data Protection Act
//                         2018 and the General Data Protection Regulation (EU)
//                         2016/679 (&ldquo;GDPR&rdquo;), the data controller is DB
//                         UK Bank Limited (trading as Deutsche Bank Wealth
//                         Management), with its registered office at 21
//                         Moorfields, London, EC2Y 9DB, United Kingdom. DB UK Bank
//                         Limited is authorised and regulated by the Financial
//                         Conduct Authority (FCA) under firm reference number
//                         140848.
//                       </p>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
