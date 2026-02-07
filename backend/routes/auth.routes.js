const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);
router.post("/google", authController.googleLogin);
router.post("/resend-otp", authController.resendOtp);

module.exports = router;
