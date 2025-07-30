import CartIcon from "../Icons/CartIcon";
import WishList from "../Icons/WishList";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import { GetMode } from "../../features/Colors/colorsSlice";
import { useDispatch } from "react-redux";

const RightSideIcons = () => {
  // initialize the dispatch
  const dispatch = useDispatch();

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
      <CartIcon className="hover:scale-105 transition-all duration-300 hover:cursor-pointer" />

      {/* Wish List Icon */}
      <WishList className="hover:scale-105 transition-all duration-300 hover:cursor-pointer" />

      {/* User Icon */}
      <FaUser
        size={22}
        className="hover:scale-105 transition-all duration-300 hover:cursor-pointer"
      />

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
