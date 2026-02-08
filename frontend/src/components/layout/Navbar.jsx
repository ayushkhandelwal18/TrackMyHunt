import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar({ openAuth }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f172a] border-b border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide text-gray-200" onClick={() => setIsOpen(false)}>
          TrackMy<span className="text-amber-400">Hunt</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
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


          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer">
                <div className="bg-amber-500/20 p-2 rounded-full text-amber-500">
                  <User size={18} />
                </div>
                <span className="font-semibold text-amber-400">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-red-400 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={openAuth} className="bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-400 transition"
            >
              Login / Signup
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-gray-700/50 px-6 py-4 space-y-4 shadow-xl">
          <a href="#home" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-amber-400 transition text-sm font-medium">
            Home
          </a>
          <a href="#features" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-amber-400 transition text-sm font-medium">
            Features
          </a>
          <a href="#howitworks" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-amber-400 transition text-sm font-medium">
            How It Works
          </a>
          <a href="#cta" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-amber-400 transition text-sm font-medium">
            Get Started
          </a>

          <div className="border-t border-gray-700 pt-4">
            {user ? (
              <div className="space-y-4">
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                  <div className="bg-amber-500/20 p-2 rounded-full text-amber-500">
                    <User size={18} />
                  </div>
                  <span className="font-semibold text-amber-400">{user.name}</span>
                </Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition text-sm"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { openAuth(); setIsOpen(false); }}
                className="w-full bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-400 transition font-medium"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
