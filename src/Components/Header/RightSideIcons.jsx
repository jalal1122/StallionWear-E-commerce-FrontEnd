import CartIcon from "../Icons/CartIcon";
import WishList from "../Icons/WishList";
import {
  FaSun,
  FaMoon,
  FaUser,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { GetMode } from "../../features/Colors/colorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../features/User/userSlice";
import { useState } from "react";

const RightSideIcons = () => {
  // initialize the dispatch
  const dispatch = useDispatch();
  // initialize the navigate
  const navigate = useNavigate();

  // get the colors from redux store
  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  // get the user from the redux store
  const { user } = useSelector((state) => state.user);

  // state for the hover on user profile
  const [isHovered, setIsHovered] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);

  // Detect if current theme is dark
  const isDarkMode = primaryBg === "#000000" || primaryBg === "#000";

  // change the theme
  const toggleTheme = () => {
    const currentMode = localStorage.getItem("mode") || "light";
    const newMode = currentMode === "light" ? "dark" : "light";
    localStorage.setItem("mode", newMode);
    dispatch(GetMode(newMode));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
      {/* Cart Icon with Badge */}
      <Link to="/cart" className="relative group">
        <div className="relative p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110">
          <CartIcon className="transition-all duration-300 w-5 h-5 sm:w-6 sm:h-6" />
          {/* Cart Badge - You can add cart count here */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold shadow-lg">
            3
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
          Shopping Cart
        </div>
      </Link>

      {/* Wishlist Icon with Badge */}
      <Link to="/wishlist" className="relative group">
        <div className="relative p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110">
          <WishList className="transition-all duration-300 w-5 h-5 sm:w-6 sm:h-6" />
          {/* Wishlist Badge */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold shadow-lg">
            2
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
          Wishlist
        </div>
      </Link>

      {/* User Profile/Login */}
      {user ? (
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {user && user.profilePicture ? (
            <div className="relative group cursor-pointer">
              <div className="relative">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full border-2 border-transparent hover:border-blue-400 transition-all duration-300 hover:scale-110 shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* User Dropdown Menu */}
              {isHovered && (
                <div
                  className="absolute top-10 sm:top-10 right-0 w-44 sm:w-48 shadow-xl rounded-2xl border backdrop-blur-md z-50 overflow-hidden"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(0, 0, 0, 0.95)"
                      : "rgba(255, 255, 255, 0.95)",
                    border: `1px solid ${
                      isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)"
                    }`,
                  }}
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-semibold text-sm truncate"
                          style={{ color: primaryText }}
                        >
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {(user.role === "user"
                      ? [
                          {
                            icon: FaShoppingBag,
                            label: "Orders",
                            action: () => navigate("/orders"),
                          },
                        ]
                      : [
                          {
                            icon: FaUser,
                            label: "Admin",
                            action: () => navigate("/admin"),
                          },
                        ]
                    ).map((item, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-3"
                        style={{ color: primaryText }}
                        onClick={() => {
                          item.action();
                          setIsHovered(false);
                        }}
                      >
                        <item.icon size={16} className="text-gray-400" />
                        {item.label}
                      </button>
                    ))}

                    {/* Logout Button */}
                    <button
                      className="w-full px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center gap-3 text-red-600 border-t border-gray-200 dark:border-gray-700"
                      onClick={() => {
                        dispatch(logoutUser());
                        navigate("/");
                        setIsHovered(false);
                      }}
                    >
                      <FaSignOutAlt size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register" className="relative group">
              <div className="p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110">
                <FaUser
                  size={18}
                  className="sm:w-6 sm:h-6 transition-all duration-300"
                  style={{ color: primaryText }}
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
                Account
              </div>
            </Link>
          )}
        </div>
      ) : (
        <Link to="/register" className="relative group">
          <div className="p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110">
            <FaUser
              size={18}
              className="sm:w-6 sm:h-6 transition-all duration-300"
              style={{ color: primaryText }}
            />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
            Sign In
          </div>
        </Link>
      )}

      {/* Theme Toggle Button */}
      <div className="relative group">
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110"
          onMouseEnter={() => setShowThemeTooltip(true)}
          onMouseLeave={() => setShowThemeTooltip(false)}
        >
          <div className="relative">
            {isDarkMode ? (
              <FaMoon
                size={18}
                className="sm:w-6 sm:h-6 text-white transition-all duration-500 rotate-0 hover:rotate-12"
              />
            ) : (
              <FaSun
                size={18}
                className="sm:w-6 sm:h-6 text-yellow-500 transition-all duration-500 rotate-0 hover:rotate-180"
              />
            )}

            {/* Glow Effect */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-yellow-400 opacity-0 hover:opacity-20 blur-lg"
                  : "bg-yellow-500 opacity-0 hover:opacity-20 blur-lg"
              }`}
            ></div>
          </div>
        </button>

        {/* Tooltip */}
        <div
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded transition-opacity duration-300 whitespace-nowrap hidden sm:block ${
            showThemeTooltip ? "opacity-100" : "opacity-0"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </div>
      </div>
    </div>
  );
};

export default RightSideIcons;

// <button
//   onClick={() => {
//     dispatch(logoutUser());
//     navigate("/");
//   }}
// >
//   <FaSignOutAlt
//     size={22}
//     className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
//   />
// </button>
