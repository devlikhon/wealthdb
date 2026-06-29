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

export const contactSubmitEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  if (!process.env.EMAIL_AUTHOR || !process.env.EMAIL_PASS) {
    throw new Error('Email environment variables are not configured');
  }

  await transporter.sendMail({
    from: `"Support Team" <${process.env.EMAIL_AUTHOR}>`,
    to,
    subject,
    text: 'We have received your message and our support team will get back to you shortly.',
    html,
  });
};
