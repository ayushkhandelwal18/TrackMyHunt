import { useState, useEffect } from "react";
import { X, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signupUser, verifyOtp, loginUser, resendOtp, googleLogin, forgotPassword, resetPassword } from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";

function AuthOverlay({ onClose, initialMode = "login", isStandalone = false }) {
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'verify'
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");
      const data = await googleLogin(credentialResponse.credential);
      login(data.user, data.token);
      if (!isStandalone && onClose) onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  async function handleLogin(e) {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      login(res.user, res.token);
      if (!isStandalone && onClose) onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMode("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpVerify(e) {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await verifyOtp({
        email: formData.email,
        otp: formData.otp,
      });

      login(res.user, res.token);
      if (!isStandalone && onClose) onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    try {
      setResendLoading(true);
      setError("");
      setSuccessMessage("");

      await resendOtp(formData.email);

      setSuccessMessage("New OTP sent to your email!");
      setFormData({ ...formData, otp: "" });
      startResendCooldown();
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  }

  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // If standalone page, we might want to center differently or hide close button
  // existing layout logic seems fine, using isStandalone for onClose check

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${isStandalone ? 'bg-[#020617]' : ''}`}>
      <div className="bg-[#0f172a] w-[900px] max-w-[95%] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative shadow-2xl border border-gray-800">

        {/* Close Button - Only if not standalone */}
        {!isStandalone && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-2 hover:bg-gray-800 rounded-full transition"
          >
            <X size={20} />
          </button>
        )}

        {/* LEFT PANEL */}
        <div className="p-8 md:p-12 bg-[#1e293b] flex flex-col justify-center">

          {error && (
            <div className="mb-6 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 text-sm text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
              {successMessage}
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back</h2>
              <p className="text-gray-400 mb-8">Enter your credentials to continue</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-sm text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Sign In <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1e293b] text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google Login Failed")}
                    theme="filled_black"
                    shape="pill"
                    text="signin_with"
                    width="300"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-8 text-center">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition"
                >
                  Create account
                </button>
              </p>
            </>
          )}

          {/* SIGNUP FORM */}
          {mode === "signup" && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
              <p className="text-gray-400 mb-8">Start tracking your job hunt today</p>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1e293b] text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google Login Failed")}
                    theme="filled_black"
                    shape="pill"
                    text="signup_with"
                    width="300"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-8 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* OTP FORM */}
          {mode === "otp" && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-white">Verify Email</h2>
              <p className="text-gray-400 mb-8">Enter the 6-digit code sent to {formData.email}</p>

              <form onSubmit={handleOtpVerify} className="space-y-6">
                <input
                  type="text"
                  name="otp"
                  maxLength="6"
                  placeholder="000000"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 text-center text-2xl tracking-[0.5em] font-mono focus:border-amber-500 focus:outline-none transition"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Didn't receive the code?
                </p>

                {resendCooldown > 0 ? (
                  <p className="text-sm text-gray-500 font-mono">
                    Resend available in <span className="text-amber-400">{resendCooldown}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                    className="text-sm text-amber-400 hover:text-amber-300 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {resendLoading ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                className="w-full mt-6 text-sm text-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-1"
              >
                ← Back to signup
              </button>
            </>
          )}

          {/* FORGOT PASSWORD (Placeholder) */}
          {/* FORGOT PASSWORD */}
          {mode === "forgot" && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-white">Reset Password</h2>
              <p className="text-gray-400 mb-8">Enter your email to receive a reset code</p>

              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                try {
                  await forgotPassword(formData.email);
                  setMode("reset");
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : "Send Reset Code"}
                </button>
              </form>

              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className="w-full mt-6 text-sm text-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-1"
              >
                ← Back to Login
              </button>
            </>
          )}

          {/* RESET PASSWORD */}
          {mode === "reset" && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-white">Set New Password</h2>
              <p className="text-gray-400 mb-8">Enter the code sent to {formData.email}</p>

              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                try {
                  await resetPassword({
                    email: formData.email,
                    otp: formData.otp,
                    newPassword: formData.password
                  });
                  setSuccessMessage("Password reset successfully! Please login.");
                  setMode("login");
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }} className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-gray-500 font-mono tracking-widest">OTP</span>
                  <input
                    type="text"
                    name="otp"
                    placeholder="000000"
                    maxLength="6"
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full pl-12 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition font-mono tracking-widest"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-gray-200 focus:border-amber-500 focus:outline-none transition"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : "Reset Password"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setMode("forgot")}
                  className="text-sm text-amber-400 hover:text-amber-300 hover:underline"
                >
                  Resend Code?
                </button>
              </div>
            </>
          )}

        </div>

        {/* RIGHT PANEL - BRANDING */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#020617] to-[#1e293b] text-white relative overflow-hidden">

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Job Hunt</span> Journey
            </h2>

            <div className="space-y-6 text-gray-400">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-1">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Centralized Dashboard</h3>
                  <p className="text-sm">Manage applications, interviews, and notes in one place.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 mt-1">
                  <Loader2 size={20} />
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Track Progress</h3>
                  <p className="text-sm">Visualize your application status and interview pipeline.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 mt-1">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-gray-200 font-semibold mb-1">Secure & Private</h3>
                  <p className="text-sm">Your data is encrypted and safe with us.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthOverlay;
