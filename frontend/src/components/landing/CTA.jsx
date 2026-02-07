import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CTA() {
  const { isAuthenticated } = useAuth();
  return (
    <section id="cta" className="py-24 bg-[#0f172a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#1e293b] border border-gray-700/60 rounded-2xl p-12 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
            Start Organizing Your <span className="text-amber-400">Job Hunt</span> Today
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Create your free account and take control of your applications, skills,
            and future opportunities — all in one dashboard.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to={isAuthenticated ? "/dashboard" : "/auth"}
              className="bg-amber-500 text-black px-8 py-3 rounded-md font-medium hover:bg-amber-400 transition"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="border border-gray-600 text-gray-300 px-8 py-3 rounded-md hover:border-amber-400 hover:text-amber-400 transition"
            >
              View Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
