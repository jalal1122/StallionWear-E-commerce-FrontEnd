import React from "react";
import { useSelector } from "react-redux";

const SortBy = ({
  sortBy,
  setSortBy,
  filter,
  setFilter,
  dispatch,
  getAllProducts,
}) => {

    // get the colors from redux store
    const { primaryBg, primaryText } = useSelector((state) => state.colors.colors);

  // Handle sort change
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSortBy(selectedValue);
    console.log("Selected sort option:", selectedValue);

    if (selectedValue === "Newest") {
      setFilter({
        ...filter,
        sortBy: "desc",
        nextPage: false,
        previousPage: false,
      });
    } else if (selectedValue === "Oldest") {
      setFilter({
        ...filter,
        sortBy: "asc",
        nextPage: false,
        previousPage: false,
      });
    }

    localStorage.removeItem("currentPage");

    // dispatch the action to get all products with the selected sort option
    dispatch(getAllProducts(filter));
  };

  return (
    <>
      {/* Sort By */}
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-lg">Sort By</h3>
        <select
          className="border border-gray-300 rounded-md p-2 hover:cursor-pointer"
          style={{
            backgroundColor: primaryText,
            color: primaryBg,
          }}
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="Newest" className="hover:cursor-pointer">
            Newest First
          </option>
          <option value="Oldest" className="hover:cursor-pointer">
            Oldest First
          </option>
        </select>
      </div>
    </>
  );
};

export default SortBy;
