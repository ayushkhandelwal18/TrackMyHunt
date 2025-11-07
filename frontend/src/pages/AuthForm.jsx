import { useState } from "react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-white rounded-2xl shadow-xl w-[380px] p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login Form" : "Signup Form"}
        </h2>

        {/* Toggle buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 font-medium ${
              isLogin ? "bg-blue-600 text-white" : "text-gray-700"
            } transition`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 font-medium ${
              !isLogin ? "bg-blue-600 text-white" : "text-gray-700"
            } transition`}
          >
            Signup
          </button>
        </div>

        {/* Form fields */}
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {isLogin && (
            <a href="#" className="text-blue-600 text-sm hover:underline text-right">
              Forgot password?
            </a>
          )}

          <button className="bg-blue-700 text-white rounded-md py-2 font-semibold hover:bg-blue-800 transition">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          {isLogin ? (
            <>
              Not a member?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Signup now
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
