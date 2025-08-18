import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Search = () => {
  const { secondaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Detect if current theme is dark
  const isDarkMode = secondaryBg === "#333333" || secondaryBg === "#333";

  return (
    <div className="relative group">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-105" : ""
        }`}
      >
        {/* Gradient Border Effect */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 transition-opacity duration-300 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: secondaryBg }}
          ></div>
        </div>

        {/* Search Input Container */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products, brands..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Delay blur to allow click on suggestions
              setTimeout(() => setIsFocused(false), 150);
            }}
            className="pl-12 pr-10 py-3 h-12 w-full sm:w-[280px] md:w-[320px] lg:w-[350px] xl:w-[400px] border-none rounded-full focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg text-sm md:text-base"
            style={{
              backgroundColor: secondaryBg,
              color: isDarkMode ? "#ffffff" : "#000000",
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
            }}
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FiSearch
              className={`w-5 h-5 transition-all duration-300 ${
                isFocused
                  ? "text-blue-500 scale-110"
                  : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            />
          </div>

          {/* Clear Button */}
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {isFocused && searchValue && (
          <div
            className="absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl shadow-xl border z-50 max-h-80 overflow-y-auto"
            style={{
              backgroundColor: secondaryBg,
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
            }}
          >
            <div className="px-4 py-2 text-sm text-gray-500">
              Search suggestions
            </div>
            {[
              "T-Shirts",
              "Jeans",
              "Sneakers",
              "Jackets",
              "Dresses",
              "Hoodies",
              "Pants",
              "Shoes",
              "Accessories",
            ]
              .filter((item) =>
                item.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                  onClick={() => {
                    setSearchValue(suggestion);
                    setIsFocused(false);
                  }}
                  style={{ color: primaryText }}
                >
                  <FiSearch className="w-4 h-4 text-gray-400" />
                  {suggestion}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Floating Search Animation */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl transition-all duration-500 ${
          isFocused ? "scale-110 opacity-30" : "scale-100 opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default Search;
