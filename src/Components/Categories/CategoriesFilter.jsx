import { MdCategory } from "react-icons/md";

const CategoriesFilter = ({
  categoryFilters,
  setCategoryFilters,
  setFilter,
  // dispatch,
  // getAllProducts,
  filter,
}) => {
  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    console.log("name, checked:", name, checked);

    setCategoryFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Update filter state to include selected categories
    const updatedFilters = { ...categoryFilters, [name]: checked };
    const selectedCategories = Object.keys(updatedFilters).filter(
      (key) => updatedFilters[key]
    );

    setFilter((prev) => ({
      ...prev,
      category: selectedCategories,
      nextPage: false,
      previousPage: false,
    }));

    console.log(filter);

    // dispatch(getAllProducts(filter));
  };

  return (
    <>
      {/* Categories Filters */}
      <div className="p-2 border-b border-gray-500 pb-3 flex flex-col gap-3">
        <div className="categories-filters flex items-center justify-between border-b border-gray-500 pb-3">
          {/* sub heading */}
          <h2 className="text-md font-semibold">Filter by Categories</h2>
          <MdCategory size={22} />
        </div>

        {/* categories list */}

        {/* Men Jackets */}
        <div className="flex items-center justify-between">
          <h2>Men Jackets</h2>
          <input
            type="checkbox"
            className={`appearance-none h-4 w-4 rounded-md border border-gray-300 checked:bg-black checked:border-transparent focus:outline-none transition-all duration-200`}
            name="Men Jackets"
            checked={categoryFilters["Men Jackets"]}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* Men Clothings */}
        <div className="flex items-center justify-between">
          <h2>Men Clothings</h2>
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 rounded-md border border-gray-300 checked:bg-black checked:border-transparent focus:outline-none transition-all duration-200"
            name="Men Clothings"
            checked={categoryFilters["Men Clothings"]}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* Men Watches, Rings and Chains */}
        <div className="flex items-center justify-between">
          <h2 className="w-2/3">Men Watches, Rings and Chains</h2>
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 rounded-md border border-gray-300 checked:bg-black checked:border-transparent focus:outline-none transition-all duration-200"
            name="Men Watches Rings Chains"
            checked={categoryFilters["Men Watches Rings Chains"]}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* Men Wallets */}
        <div className="flex items-center justify-between">
          <h2>Men Wallets</h2>
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 rounded-md border border-gray-300 checked:bg-black checked:border-transparent focus:outline-none transition-all duration-200"
            name="Men Wallets"
            checked={categoryFilters["Men Wallets"]}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* Men Shoes */}
        <div className="flex items-center justify-between">
          <h2>Men Shoes</h2>
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 rounded-md border border-gray-300 checked:bg-black checked:border-transparent focus:outline-none transition-all duration-200"
            name="Men Shoes"
            checked={categoryFilters["Men Shoes"]}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesFilter;
