import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true if port 465
  auth: {
    user: process.env.EMAIL_AUTHOR,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.EMAIL_AUTHOR || !process.env.EMAIL_PASS) {
    throw new Error('Email environment variables are not configured');
  }

  // await transporter.sendMail({
  //   from: `"Application Team" <${process.env.EMAIL_AUTHOR}>`,
  //   to,
  //   subject,
  //   html,
  // });

  // await transporter.verify();

  await transporter.sendMail({
    from: `"Application Team" <${process.env.EMAIL_AUTHOR}>`,
    to,
    subject,
    text: 'Your Deutsche Bank application has been received. Please login to complete your application.',
    html,
  });
};

// import nodemailer from 'nodemailer';

// // ✅ Create transporter once
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_AUTHOR,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendEmail = async (to: string, subject: string, html: string) => {
//   if (!process.env.EMAIL_AUTHOR || !process.env.EMAIL_PASS) {
//     throw new Error('Email environment variables are not configured');
//   }

//   await transporter.sendMail({
//     from: `"Application Team" <${process.env.EMAIL_AUTHOR}>`,
//     to,
//     subject,
//     html,
//   });
// };

// import nodemailer from 'nodemailer';

// export const sendEmail = async (to: string, subject: string, html: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_AUTHOR,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Application Team" <${process.env.EMAIL_AUTHOR}>`,
//     to,
//     subject,
//     html,
//   });
// };
