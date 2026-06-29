/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactSubmitEmail } from '../../../utils/contactSubmitEmail';
import { Contact } from './contact.model';

const createContactService = async (payload: any) => {
  //   const contact = await Contact.create(payload);

  //   console.log('Contact Payload:', payload);

  //   console.time('Create Contact');

  const contact = await Contact.create(payload);

  //   console.timeLog('Create Contact', 'MongoDB saved');

  // Email to Admin
  await contactSubmitEmail(
    process.env.EMAIL_AUTHOR!,
    'New Contact Message',
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
                        src="https://www.dwouk-db.com/img/Deutsche-Bank-Logo-Transparent.png"
                        alt="Deutsche Bank"
                        width="300"
                        style="display:block;border:0;"
                      />
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr>
                    <td height="30"></td>
                  </tr>

                  <!-- Contents -->
                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      <strong>Name:</strong> ${payload.name}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      <strong>Email:</strong> ${payload.email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      <strong>Phone:</strong> ${payload.phone.countryCode}${payload.phone.number}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:0px;
                      "
                    >
                      <strong>Message:</strong> ${payload.message}
                    </td>
                  </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding: 15px 0;">
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
                      Support Team
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

  //   console.timeLog('Create Contact', 'First email sent');

  // Confirmation Email to User
  await contactSubmitEmail(
    payload.email,
    "We've received your message",
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
                        src="https://www.dwouk-db.com/img/Deutsche-Bank-Logo-Transparent.png"
                        alt="Deutsche Bank"
                        width="300"
                        style="display:block;border:0;"
                      />
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr>
                    <td height="30"></td>
                  </tr>

                  <!-- Contents -->
                  <tr>
                    <td
                      style="
                        font-size:18px;
                        line-height:24px;
                        color:#333333;
                        padding-bottom:8px;
                        font-weight: 700;
                      "
                    >
                      Hello ${payload.name},
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:16px;
                        line-height:24px;
                        color:#333333;
                        padding-bottom: 0px;
                      "
                    >
                      Thank you for contacting Deutsche Bank Wealth Management (DB UK Bank Limited). We have received your message and our support team will get back to you shortly.
                    </td>
                  </tr>

                  <!-- Divider -->
                    <tr>
                        <td
                            style="
                            padding: 10px 0;
                            "
                        >
                            <hr style="color: #8080802e; opacity: 0.5;" />  
                        </td>
                    </tr>

                    <tr>
                    <td
                      style="
                        font-size:16px;
                        line-height:24px;
                        color:#333333;
                        padding-bottom:8px;
                        font-weight: 600;
                      "
                    >
                     Your submitted informations:
                    </td>
                  </tr>

                  <!-- Contents -->
                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      <strong>Name:</strong> ${payload.name}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      <strong>Email:</strong> ${payload.email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom:8px;
                      "
                    >
                      <strong>Phone:</strong> ${payload.phone.countryCode}${payload.phone.number}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size:14px;
                        line-height:20px;
                        color:#333333;
                        padding-bottom: 0px;
                      "
                    >
                      <strong>Message:</strong> ${payload.message}
                    </td>
                  </tr>

                <!-- Divider -->
                <tr>
                    <td style="padding: 15px 0;">
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
                      Support Team
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

  //   console.timeEnd('Create Contact');

  return contact;
};

export const ContactService = { createContactService };
