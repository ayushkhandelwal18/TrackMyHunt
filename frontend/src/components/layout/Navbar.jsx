import { Link } from "react-router-dom";

function Navbar({ openAuth }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f172a] border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide text-gray-200">
          TrackMy<span className="text-amber-400">Hunt</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <a href="#home" className="text-gray-300 hover:text-amber-400 transition">
            Home
          </a>
          <a href="#features" className="text-gray-300 hover:text-amber-400 transition">
            Features
          </a>
          
          <a href="#howitworks" className="text-gray-300 hover:text-amber-400 transition">
            How It Works
          </a>
          <a href="#cta" className="text-gray-300 hover:text-amber-400 transition">
            Get Started
          </a>
         

          <button  onClick={openAuth} className="bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-400 transition"
          >
      Login / Signup
     </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
