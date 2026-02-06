const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../services/mail.services");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.signup = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists && exists.isVerified) throw new Error("User already exists");

  if (exists && !exists.isVerified) {
    const otp = generateOTP();
    exists.otp = otp;
    exists.otpExpires = Date.now() + 10 * 60 * 1000;
    await exists.save();

    await sendOTPEmail(email, otp);
    return { email };
  }

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOTP();


  const user = await User.create({
    name,
    email,
    password: hashed,
    otp,
    otpExpires: Date.now() + 10 * 60 * 1000, // 10 min
  });


  await sendOTPEmail(email, otp);
  return { email: user.email, otp };

};

exports.verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.otp !== otp) throw new Error("Invalid OTP");
  if (user.otpExpires < Date.now()) throw new Error("OTP expired");

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return { token: generateToken(user._id), user: { name: user.name, email: user.email } };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");
  if (!user.isVerified) throw new Error("Verify account first");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return { token: generateToken(user._id), user: { name: user.name, email: user.email } };
};


exports.resendOtp = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.isVerified) throw new Error("Account already verified");

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  await sendOTPEmail(email, otp);

  return { email, message: "OTP resent successfully" };
};
