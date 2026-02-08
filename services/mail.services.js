const axios = require("axios");

/**
 * Sends an email using EmailJS REST API
 * @param {string} to - Recipient email
 * @param {Object} templateParams - Parameters for the EmailJS template
 * @param {string} templateId - EmailJS Template ID
 */
const sendEmailJS = async (to, templateParams, templateId) => {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("[MAIL SERVICE ERROR] Missing EmailJS configuration in environment variables");
    throw new Error("Email service is not configured correctly on the server.");
  }

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey, // Required for server-side requests
    template_params: {
      to_email: to,
      ...templateParams
    },
  };

  try {
    const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
    console.log(`[MAIL SERVICE] Email sent successfully to ${to}. Status: ${response.status}`);
    return response.data;
  } catch (error) {
    console.error(`[MAIL SERVICE ERROR] EmailJS request failed:`, error.response ? error.response.data : error.message);
    throw new Error("Failed to send email via EmailJS. Please try again later.");
  }
};

exports.sendOTPEmail = async (to, otp, type = "verification") => {
  console.log(`[MAIL SERVICE] Preparing EmailJS OTP for ${to} | Type: ${type}`);

  const isReset = type.trim().toLowerCase() === "reset";

  const templateParams = {
    otp: otp,
    type: isReset ? "Password Reset" : "Account Verification",
    subject: isReset ? "RESET PASSWORD - TrackMyHunt" : "VERIFY ACCOUNT - TrackMyHunt"
  };

  // Note: You must create a template in EmailJS and use its ID here.
  // I'm using the ID from .env
  return await sendEmailJS(to, templateParams, process.env.EMAILJS_TEMPLATE_ID);
};

exports.sendWelcomeEmail = async (to, name) => {
  console.log(`[MAIL SERVICE] Preparing EmailJS Welcome for ${to}`);

  const templateParams = {
    user_name: name,
    subject: "Welcome to TrackMyHunt! 🚀"
  };

  // Usually you'd have a different template for welcome emails
  // For now, I'll use a separate placeholder if you have one, or provide instructions
  return await sendEmailJS(to, templateParams, process.env.EMAILJS_WELCOME_TEMPLATE_ID );
};
