import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import CartIcon from "./Icons/CartIcon";
import WishList from "./Icons/WishList";

const Header = () => {
  const textColor1 = useSelector((state) => state.colors.colors.textColor1);
  const bgColor1 = useSelector((state) => state.colors.colors.bgColor1);
  const bgColor2 = useSelector((state) => state.colors.colors.bgColor2);
  const textColor2 = useSelector((state) => state.colors.colors.textColor2);

  return (
    <>
    {/* main outer Div */}
      <div
        className="section header flex justify-around items-center p-4 shadow-md"
        style={{ backgroundColor: bgColor1 }}
      >
        {/* Logo Div */}
        <div>
          <h1 className="font-bold text-2xl" style={{ color: textColor1 }}>
            STALLIONWEAR
          </h1>
        </div>
        {/* Navigation Links */}
        <div>
          <ul className="flex space-x-6">
            <li
              className="cursor-pointer hover:opacity-75"
              style={{ color: textColor1 }}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:opacity-75"
              style={{ color: textColor1 }}
            >
              Categories
            </li>
          </ul>
        </div>
        {/* Search Bar */}
        <div className="flex items-center rounded-4xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 h-12 w-[300px] border-none rounded-3xl focus:outline-none"
              style={{ backgroundColor: bgColor2, color: textColor2 }}
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: textColor2 }}
            />
          </div>
        </div>
        {/* Icons for login cart etc */}
        <div className="flex space-x-4">
          <CartIcon />
          <WishList />
          {/* Additional icons can be added here */}
        </div>
      </div>
    </>
  );
};

export default Header;
