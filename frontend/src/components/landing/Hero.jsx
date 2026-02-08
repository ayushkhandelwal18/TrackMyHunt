import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import dashboard from "../../assets/dashboardpreview.png"

function Hero() {
  const { isAuthenticated } = useAuth();
  return (

    <section id="home" className="pt-32 pb-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 leading-tight">
            Track Your <span className="text-amber-400">Job Hunt</span>.
            <br />Plan Your Future. Get Hired.
          </h1>

          <p className="mt-6 text-gray-400 max-w-xl">
            Manage job applications, upcoming opportunities, skills, and career resources
            in one organized dashboard built for students and developers.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to={isAuthenticated ? "/dashboard" : "/auth"}
              className="bg-amber-500 text-black px-6 py-3 rounded-md font-medium hover:bg-amber-400 transition"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-md hover:border-amber-400 hover:text-amber-400 transition"
            >
              View Features
            </a>
          </div>
        </div>

        
        <div className="bg-[#1e293b] rounded-xl h-80 flex items-center justify-center text-gray-500 p-1">
          <img
            src={dashboard}
            alt="Dashboard preview"
            className="w-full h-full object-contain rounded-lg border-2 border-amber-400 shadow-lg shadow-amber-400"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
