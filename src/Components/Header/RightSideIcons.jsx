import CartIcon from "../Icons/CartIcon";
import WishList from "../Icons/WishList";
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa";
import { GetMode } from "../../features/Colors/colorsSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../features/User/userSlice";

const RightSideIcons = () => {
  // initialize the dispatch
  const dispatch = useDispatch();
  // initialize the navigate
  const navigate = useNavigate();

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

  return (
    <div className="flex space-x-4">
      {/* Cart Icon */}
      <Link to="/cart">
        <CartIcon className="hover:scale-105 transition-all duration-300 hover:cursor-pointer" />
      </Link>

      {/* Wish List Icon */}
      <WishList className="hover:scale-105 transition-all duration-300 hover:cursor-pointer" />

      {/* If user is logged in, show the sign out icon */}
      {/* Sign Out Icon */}
      {localStorage.getItem("user") ? (
        <button
          onClick={() => {
            dispatch(logoutUser());
            navigate("/");
          }}
        >
          <FaSignOutAlt
            size={22}
            className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
          />
        </button>
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
