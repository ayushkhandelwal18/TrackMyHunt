require("dotenv").config();
const { sendOTPEmail } = require("./services/mail.services");

async function test() {
    console.log("Testing Verification Email...");
    try {
        await sendOTPEmail("test@example.com", "123456", "verification");
    } catch (e) { console.error(e); }

    console.log("\nTesting Reset Email...");
    try {
        await sendOTPEmail("test@example.com", "654321", "reset");
    } catch (e) { console.error(e); }
}

test();
