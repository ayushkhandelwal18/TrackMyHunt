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
    const token = await authService.verifyOtp(req.body);
    res.json({ message: "Account verified", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
