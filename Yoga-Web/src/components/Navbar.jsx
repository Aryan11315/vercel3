import React from "react";
import { Menu } from "lucide-react"; // <-- REQUIRED import for Menu icon

const Navbar = ({ scrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "py-4"}`}
      style={{
        background: scrolled
          ? undefined
          : "linear-gradient(90deg, #ebe7df, #fdf7e8, #fffcea, #f7e8e3, #e0e0e0)",
        borderBottom: "1px solid rgba(0,0,0,0.18)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-[1.8rem] tracking-[0.45em] font-light bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm transition-all duration-300 hover:brightness-110 cursor-pointer">
          ATMARISA
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12 items-center">
          {["Home", "About", "Technologies", "Sessions", "Learn", "Contact"].map(
            (item) => (
              <li key={item} className="relative group">
                <a
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-[1.06rem] font-medium text-gray-800 transition-colors duration-300 group-hover:text-purple-600"
                >
                  {item}
                </a>

                {/* Animated underline */}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"
                ></span>
              </li>
            )
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700"
        >
          <Menu size={28} /> {/* now valid because it's imported */}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out
        ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <ul className="p-6 space-y-4 text-center">
          {["Home", "About", "Technologies", "Sessions", "Learn", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-800 hover:text-purple-600 transition-colors py-2 text-lg"
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
