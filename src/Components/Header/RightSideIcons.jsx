import CartIcon from "../Icons/CartIcon";
import WishList from "../Icons/WishList";
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa";
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

  // change the theme
  const toggleTheme = () => {
    const currentMode = localStorage.getItem("mode") || "light";
    const newMode = currentMode === "light" ? "dark" : "light";
    localStorage.setItem("mode", newMode);
    dispatch(GetMode(newMode));
  };

  //   Check the current mode to conditionally render the sun/moon icon
  const currentMode = localStorage.getItem("mode") || "light";
  const isDarkMode = currentMode === "dark";

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex space-x-4">
      {/* Cart Icon */}
      <Link to="/cart">
        <CartIcon className="hover:scale-105 transition-all duration-300 hover:cursor-pointer" />
      </Link>

      {/* Wish List Icon */}
      <Link to="/wishlist">
        <WishList className="hover:scale-105 transition-all duration-300 hover:cursor-pointer" />
      </Link>

      {/* If user is logged in, show the user profile */}
      {user ? (
        <div
          className="flex flex-col relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {user && user.profilePicture ? (
            <>
              {/* Profile Picture */}
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-7 h-7 object-cover rounded-full hover:cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all duration-200"
              />
              {isHovered && user && (
                <div
                  className="absolute top-7 right-[-40px] shadow-lg rounded-md z-10 min-w-28 border border-gray-200 dark:border-gray-600"
                  style={{
                    backgroundColor: primaryBg,
                  }}
                >

                  {/* Profile Options */}
                  <ul className="py-2">

                    {/* Profile */}
                    <li
                      className="px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      style={{ color: primaryText }}
                    >
                      Profile
                    </li>


                    {/* Order */}
                    <Link to="/orders">
                      <li
                        className="px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        style={{ color: primaryText }}
                      >
                        Order
                      </li>
                    </Link>

                    {/* Logout */}
                    <li
                      className="px-4 py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      style={{ color: primaryText }}
                      onClick={() => {
                        dispatch(logoutUser());
                        navigate("/");
                        setIsHovered(false);
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            
            // User Icon
            <FaUser
              size={22}
              className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
            />
          )}
        </div>
      ) : (

        /* If user is not logged in, show the user icon */

        /* User Icon */
        <Link to="/register">
          <FaUser
            size={22}
            className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
          />
        </Link>
      )}

      {/* conditional Rendering */}
      {isDarkMode ? (
        <>

          {/* Dark Mode Icon */}
          <button onClick={toggleTheme}>
            <FaMoon
              size={22}
              className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
            />
          </button>
        </>
      ) : (
        <>
          <button onClick={toggleTheme}>
            
            {/* Light Mode Icon */}
            <FaSun
              size={22}
              className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
            />
          </button>
        </>
      )}
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
