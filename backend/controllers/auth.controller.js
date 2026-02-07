const authService = require("../services/auth.service");
const crypto = require("crypto");

exports.signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json({
      message: "Signup successful. Verify OTP.",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { token, user } = await authService.verifyOtp(req.body);
    res.json({ message: "Account verified", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const result = await authService.resendOtp(req.body);
    res.status(200).json({
      message: "OTP resent successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Google Login
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (user) {
      // Link if not linked
      if (!user.googleId) {
        user.googleId = sub;
        if (!user.avatar) user.avatar = picture;
        await user.save();
      }
    } else {
      // New user
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        isVerified: true,
        password: crypto.randomBytes(20).toString('hex') // Random dummy password
      });

      // Send Welcome Email
      const { sendWelcomeEmail } = require("../services/mail.services");
      await sendWelcomeEmail(user.email, user.name);
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verificationStatus: user.isVerified,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Google login failed", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};