import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-gray-700/50 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-gray-200">
            TrackMy<span className="text-amber-400">Hunt</span>
          </h3>
          <p className="mt-3 text-gray-400 text-sm max-w-xs">
            A personal job-hunt management platform to track applications, plan opportunities,
            and stay prepared for your career journey.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#home" className="text-gray-400 hover:text-amber-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="text-gray-400 hover:text-amber-400 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#howitworks" className="text-gray-400 hover:text-amber-400 transition">
                How It Works
              </a>
            </li>
            <li>
              <Link to="/auth" className="text-gray-400 hover:text-amber-400 transition">
                Login / Signup
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@trackmyhunt.com</li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TrackMyHunt. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
