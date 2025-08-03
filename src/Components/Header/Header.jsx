import { useSelector } from "react-redux";
import Search from "./Search";
import RightSideIcons from "./RightSideIcons";
import { Link } from "react-router";

const Header = () => {
  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  return (
    <>
      {/* main outer Div */}
      <div
        className="section header flex justify-around items-center p-4 shadow-md"
        style={{ backgroundColor: primaryBg, color: primaryText }}
      >
        {/* Logo Div */}
        <div>
          <h1 className="font-bold text-2xl">STALLIONWEAR</h1>
        </div>
        {/* Navigation Links */}
        <div>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:opacity-75">Home</li>
            <Link to="/categories">
              <li className="cursor-pointer hover:opacity-75">Categories</li>
            </Link>
          </ul>
        </div>
        {/* Search Bar */}
        <Search />

        {/* Icons for login cart etc */}
        <RightSideIcons />
        
      </div>
    </>
  );
};

export default Header;
