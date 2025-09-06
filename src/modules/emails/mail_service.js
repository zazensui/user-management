import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false, // upgrade later with STARTTLS
});

export const sendVerificationEmail = (to, user_id, username, token) => {
  const mailOptions = {
    from: '"Your App" <no-reply@example.com>',
    to,
    subject: "Email Verification",
    text: `Hello ${username},\n\nPlease verify your email by clicking the following link: http://localhost:3000/verify-user?id=${user_id}&token=${token}`,
  };

  return transporter.sendMail(mailOptions);
};