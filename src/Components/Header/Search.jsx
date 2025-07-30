import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const { secondaryBg } = useSelector((state) => state.colors.colors);
  return (
    <div className="flex items-center rounded-4xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="pl-10 pr-4 py-2 h-12 w-[300px] border-none rounded-3xl focus:outline-none"
          style={{ backgroundColor: secondaryBg, color: "black" }}
        />
        <FiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          style={{ color: "black" }}
        />
      </div>
    </div>
  );
};

export default Search;
