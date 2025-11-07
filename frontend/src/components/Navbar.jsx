function Navbar() {
  return (
    <nav className="bg-[#0f172a] text-gray-200 shadow-md fixed w-full top-0 left-0 z-10 border-b border-gray-700/50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          TrackMy<span className="text-amber-400">Hunt</span>
        </h1>

        {/* Links */}
        <ul className="flex space-x-8 font-medium">
          <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
          <li><a href="#features" className="hover:text-amber-400 transition">Features</a></li>
          <li><a href="#about" className="hover:text-amber-400 transition">About</a></li>
          <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
          <li>
            <a
              href="/authform"
              className="bg-amber-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-amber-400 hover:text-black transition"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
