import nodemailer from 'nodemailer';

let transporter;
export const getTransporter = () => {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  return transporter;
};

export const sendReceipt = async ({ to, subject, text, html }) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('Mail credentials missing; skipping email send');
    return;
  }
  const transporterInstance = getTransporter();
  await transporterInstance.sendMail({
    from: process.env.MAIL_FROM || 'support@brandname.com',
    to,
    subject,
    text,
    html
  });
};
