require("dotenv").config();
const { Resend } = require("resend");

const resendApiKey = process.env.resend_api_email;

if (!resendApiKey) {
  console.error("❌ FATAL: Resend API Key (resend_api_email) is missing in environment variables!");
}

const resend = new Resend(resendApiKey);

// Helper to clean up HTML for Resend if needed, or just pass purely
// Resend behaves well with standard HTML.

/**
 * Send OTP Email
 */
exports.sendOTPEmail = async (to, otp, type = "verification") => {
  console.log(`[MAIL SERVICE] Preparing OTP email for ${to} | Type: ${type}`);

  const isReset = type.trim().toLowerCase() === "reset";
  const subject = isReset ? "RESET PASSWORD - TrackMyHunt" : "VERIFY ACCOUNT - TrackMyHunt";
  const title = isReset ? "RESET YOUR PASSWORD" : "VERIFY YOUR EMAIL";
  const message = isReset
    ? "You requested to reset your password. Use the code below:"
    : "Please verify your email address to complete registration:";

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0;">TrackMyHunt</h2>
        <p style="color: #64748b; font-size: 16px; margin-top: 8px;">Your Job Hunt Companion</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #334155; font-size: 24px; font-weight: 600; margin-top: 0;">${title}</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">${message}</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #0f172a; border: 2px dashed #cbd5e1; display: inline-block;">
            ${otp}
          </div>
        </div>
        
        <p style="color: #64748b; font-size: 14px; text-align: center;">This code will expire in <strong>10 minutes</strong>.</p>
        <div style="border-top: 1px solid #e2e8f0; margin: 30px 0;"></div>
        <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-bottom: 0;">If you didn't request this code, please ignore this email.</p>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #94a3b8; font-size: 12px;">&copy; ${new Date().getFullYear()} TrackMyHunt. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev", // Fallback for testing
      to: [to], // Resend expects an array
      subject: subject,
      html: htmlContent,
    });

    if (data.error) {
      console.error("[MAIL SERVICE ERROR] Resend API returned error:", data.error);
      throw new Error(data.error.message);
    }

    console.log(`[MAIL SERVICE] OTP Email sent successfully to ${to}. ID: ${data.data?.id}`);
    return data;
  } catch (error) {
    console.error(`[MAIL SERVICE ERROR] Failed to send OTP email to ${to}:`, error);
    throw new Error("Failed to send verification email. Please try again later.");
  }
};

/**
 * Send Welcome Email
 */
exports.sendWelcomeEmail = async (to, name) => {
  console.log(`[MAIL SERVICE] Preparing Welcome email for ${to}`);

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0;">TrackMyHunt</h2>
      </div>
      
      <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #334155; font-size: 24px; font-weight: 600; margin-top: 0;">Welcome aboard, ${name}! 🎉</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">We're thrilled to have you. TrackMyHunt is designed to help you organize your job applications, track interviews, and land your dream job.</p>
        
        <div style="margin: 30px 0; background-color: #fffbeb; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #b45309; margin: 0 0 10px 0; font-size: 18px;">Quick Tips to Get Started:</h3>
          <ul style="color: #78350f; margin: 0; padding-left: 20px; font-size: 15px;">
            <li style="margin-bottom: 8px;">Add your first job application to the board.</li>
            <li style="margin-bottom: 8px;">Upload your resume for AI analysis.</li>
            <li style="margin-bottom: 0;">Set up your profile to get personalized insights.</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">Go to Dashboard</a>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #94a3b8; font-size: 12px;">Happy Hunting! 🎯<br>&copy; ${new Date().getFullYear()} TrackMyHunt</p>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: [to],
      subject: "Welcome to TrackMyHunt! 🚀",
      html: htmlContent,
    });

    if (data.error) {
      console.error("[MAIL SERVICE ERROR] Resend API returned error:", data.error);
      // Don't throw for welcome email
      return;
    }

    console.log(`[MAIL SERVICE] Welcome Email sent successfully to ${to}. ID: ${data.data?.id}`);
    return data;
  } catch (error) {
    console.error(`[MAIL SERVICE ERROR] Failed to send Welcome email to ${to}:`, error);
  }
};
