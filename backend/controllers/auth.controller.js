const authService = require("../services/auth.service");

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