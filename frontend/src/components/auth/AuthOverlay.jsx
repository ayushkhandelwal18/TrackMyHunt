import { X } from "lucide-react";
import { useState } from "react";

function AuthOverlay({ onClose }) {
  const [mode, setMode] = useState("login"); 
  // login | signup | otp | forgot

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0f172a] w-[900px] max-w-[95%] rounded-2xl overflow-hidden grid grid-cols-2 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        {/* LEFT */}
        <div className="p-10 bg-[#1e293b]">
          
          {mode === "login" && (
            <>
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-400 mb-6">
                Enter your credentials to continue
              </p>

              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 rounded bg-[#0f172a] border border-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-2 p-3 rounded bg-[#0f172a] border border-gray-700"
              />

              <div className="text-right mb-4">
                <button
                  onClick={() => setMode("forgot")}
                  className="text-sm text-amber-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button className="w-full bg-amber-500 text-black py-3 rounded hover:bg-amber-400 transition">
                Login
              </button>

              <GoogleButton />

              <p className="text-sm text-gray-400 mt-6 text-center">
                New here?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="text-amber-400 cursor-pointer hover:underline"
                >
                  Create account
                </span>
              </p>
            </>
          )}

          {mode === "signup" && (
            <>
              <h2 className="text-2xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-400 mb-6">
                Start tracking your job hunt today
              </p>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 p-3 rounded bg-[#0f172a] border border-gray-700"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 rounded bg-[#0f172a] border border-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-3 rounded bg-[#0f172a] border border-gray-700"
              />

              <button
                onClick={() => setMode("otp")}
                className="w-full bg-amber-500 text-black py-3 rounded hover:bg-amber-400 transition"
              >
                Sign Up
              </button>

              <GoogleButton />

              <p className="text-sm text-gray-400 mt-6 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-amber-400 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </>
          )}

          {mode === "otp" && (
            <>
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="text-gray-400 mb-6">
                Enter the 6-digit code sent to your email
              </p>

              <input
                type="text"
                maxLength="6"
                placeholder="Enter OTP"
                className="w-full mb-4 p-3 rounded bg-[#0f172a] border border-gray-700 text-center tracking-widest"
              />

              <button className="w-full bg-amber-500 text-black py-3 rounded hover:bg-amber-400 transition">
                Verify & Continue
              </button>

              <p className="text-sm text-gray-400 mt-6 text-center">
                Didn’t receive code?{" "}
                <span className="text-amber-400 cursor-pointer hover:underline">
                  Resend
                </span>
              </p>
            </>
          )}

          {mode === "forgot" && (
            <>
              <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
              <p className="text-gray-400 mb-6">
                Enter your email to receive a reset link
              </p>

              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 rounded bg-[#0f172a] border border-gray-700"
              />

              <button className="w-full bg-amber-500 text-black py-3 rounded hover:bg-amber-400 transition">
                Send Reset Link
              </button>

              <p className="text-sm text-gray-400 mt-6 text-center">
                <span
                  onClick={() => setMode("login")}
                  className="text-amber-400 cursor-pointer hover:underline"
                >
                  Back to Login
                </span>
              </p>
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-gradient-to-br from-[#020617] to-[#1e293b] p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">
            Track Your <span className="text-amber-400">Job Hunt</span>
          </h2>
          <p className="text-gray-400">
            One dashboard for applications, opportunities, skills, and preparation.
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleButton() {
  return (
    <button className="w-full mt-4 border border-gray-600 py-3 rounded flex items-center justify-center gap-3 hover:border-amber-400 transition">
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-gray-300">Continue with Google</span>
    </button>
  );
}

export default AuthOverlay;
