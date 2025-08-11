import { MdCategory } from "react-icons/md";
import { useEffect } from "react";

const BrandFilter = ({
  brand,
  setbrand,
  setFilter,
  dispatch,
  getAllProducts,
}) => {
  // handles changing the brand
  const brandChangeHandler = (e) => {
    setbrand(e.target.value);
    console.log("Brand input changed:", e.target.value);
  };

  // Debounced brand search function
  useEffect(() => {
    if (brand.trim() === "") {
      // If brand is empty, don't filter by brand
      setFilter((prev) => {
        const { brand: _, ...rest } = prev; // Remove brand from filter
        return rest;
      });
      return;
    }

    // Debounce: Wait 500ms after user stops typing
    const delayedSearch = setTimeout(() => {
      console.log("Searching for brand:", brand);

      setFilter((prev) => {
        const newFilter = {
          ...prev,
          brand: brand,
          nextPage: false,
          previousPage: false,
        };

        // dispatch the action to get all products with the selected brand
        dispatch(getAllProducts(newFilter));

        return newFilter;
      });
    }, 500); // 500ms delay

    // Cleanup: Cancel previous timeout if user keeps typing
    return () => clearTimeout(delayedSearch);
  }, [brand, dispatch]); // Include dispatch as dependency

  return (
    <>
      {/* Filter by Brand */}
      <div className="p-2 border-b border-gray-500 pb-3 flex flex-col gap-3">
        <div className="categories-filters flex items-center justify-between border-b border-gray-500 pb-3">
          {/* sub heading */}
          <h2 className="text-md font-semibold">Filter by Brand</h2>
          <MdCategory size={22} />
        </div>

        {/* Brand Input */}
        <input
          type="text"
          placeholder="Search by Brand"
          className="border border-gray-300 rounded-md p-2 h-8"
          value={brand}
          onChange={brandChangeHandler}
        />
      </div>
    </>
  );
};

export default BrandFilter;
