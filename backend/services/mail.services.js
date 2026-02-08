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
    console.error(`- Service ID: ${serviceId ? "OK" : "MISSING"}`);
    console.error(`- Template ID: ${templateId ? "OK" : "MISSING"}`);
    console.error(`- Public Key: ${publicKey ? "OK" : "MISSING"}`);
    throw new Error("Email service is not configured correctly on the server.");
  }

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey, // Required for private REST API calls
    template_params: {
      to_email: to,
      ...templateParams
    },
  };

  console.log(`[MAIL SERVICE] Sending request to EmailJS for ${to}...`);

  try {
    const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`[MAIL SERVICE] Email sent successfully to ${to}. Status: ${response.status}`);
    return response.data;
  } catch (error) {
    const errorDetails = error.response ? error.response.data : error.message;
    console.error(`[MAIL SERVICE ERROR] EmailJS request failed for ${to}:`, errorDetails);

    // Provide a more descriptive error message if available
    const descriptiveError = typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails);
    throw new Error(`Email service failed: ${descriptiveError}`);
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

  return await sendEmailJS(to, templateParams, process.env.EMAILJS_TEMPLATE_ID);
};

exports.sendWelcomeEmail = async (to, name) => {
  console.log(`[MAIL SERVICE] Preparing EmailJS Welcome for ${to}`);

  const templateParams = {
    user_name: name,
    subject: "Welcome to TrackMyHunt! 🚀"
  };

  const templateId = process.env.EMAILJS_WELCOME_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
  return await sendEmailJS(to, templateParams, templateId);
};

