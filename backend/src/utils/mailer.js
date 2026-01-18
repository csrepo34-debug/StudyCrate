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

const ensureMailConfigured = () => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('Mail credentials missing; skipping email send');
    return false;
  }
  return true;
};

export const sendReceipt = async ({ to, subject, text, html }) => {
  if (!ensureMailConfigured()) return;
  const transporterInstance = getTransporter();
  await transporterInstance.sendMail({
    from: process.env.MAIL_FROM || 'support@brandname.com',
    to,
    subject,
    text,
    html
  });
};

export const sendContactMessage = async ({ name, email, message }) => {
  if (!ensureMailConfigured()) return;
  const transporterInstance = getTransporter();
  const toAddress = process.env.MAIL_TO || process.env.MAIL_FROM || process.env.MAIL_USER;

  const subject = `[StudyCrate] New contact form message from ${name || 'Visitor'}`;
  const text = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message?.replace(/\n/g, '<br/>')}</p>
  `;

  await transporterInstance.sendMail({
    from: process.env.MAIL_FROM || 'support@brandname.com',
    to: toAddress,
    replyTo: email,
    subject,
    text,
    html
  });
};
