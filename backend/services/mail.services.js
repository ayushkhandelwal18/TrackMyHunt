require("dotenv").config();

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service directly
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
exports.sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"TrackMyHunt" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Verify your TrackMyHunt account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Verify Your Account</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code will expire in <b>10 minutes</b>.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
