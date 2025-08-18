import { useSelector } from "react-redux";
import Search from "./Search";
import RightSideIcons from "./RightSideIcons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect if current theme is dark
  const isDarkMode = primaryBg === "#000000" || primaryBg === "#000";

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "backdrop-blur-md shadow-xl" : "shadow-lg"
        }`}
        style={{
          backgroundColor: isScrolled
            ? isDarkMode
              ? "rgba(0, 0, 0, 0.95)"
              : "rgba(255, 255, 255, 0.95)"
            : primaryBg,
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20 gap-4">
            {/* Logo Section */}
            <Link to="/" className="group flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <h1
                    className={`font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 group-hover:scale-105 whitespace-nowrap ${
                      isDarkMode ? "gradient-text-dark" : "gradient-text"
                    }`}
                  >
                    STALLIONWEAR
                  </h1>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
              {[
                { name: "Home", path: "/" },
                { name: "Categories", path: "/categories" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group py-2 px-1 font-medium transition-all duration-300 text-sm lg:text-base"
                  style={{ color: primaryText }}
                >
                  <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-300">
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            {/* <div className="hidden md:block flex-1 max-w-md mx-4">
              <Search />
            </div> */}

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <RightSideIcons />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ color: primaryText }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>

              {/* Mobile Icons - Show on very small screens */}
              <div className="sm:hidden flex items-center space-x-2">
                <RightSideIcons />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            backgroundColor: isDarkMode
              ? "rgba(0, 0, 0, 0.98)"
              : "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Mobile Search */}
            <div className="w-full md:hidden">
              <Search />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="grid grid-cols-2 gap-2 sm:space-y-1 sm:grid-cols-1">
              {[
                { name: "Home", path: "/" },
                { name: "Categories", path: "/categories" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-center sm:text-left"
                  style={{ color: primaryText }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Icons - Only show if hidden on very small screens */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 sm:hidden">
              <div className="flex justify-center">
                <RightSideIcons />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 sm:h-16 lg:h-20"></div>
    </>
  );
};

export default Header;
