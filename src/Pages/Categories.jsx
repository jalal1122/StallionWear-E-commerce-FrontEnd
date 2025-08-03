import { FaSliders } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import renderStars from "../utils/renderStars";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/Products/productSlice.js";

const Categories = () => {
  const dispatch = useDispatch();

  // Get products, totalPages, and currentPage from the Redux store
  const { products, totalPages, currentPage } = useSelector(
    (state) => state.products
  );

  // Get the colors from the redux store
  const { primaryText, primaryBg, secondaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // State for filter options
  const [filter, setFilter] = useState({
    nextPage: false,
    previousPage: false,
  });

  // state for Brand Input
  const [brand, setbrand] = useState("");

  // State for price filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  // Debounced price search function
  useEffect(() => {
    // Only search if at least one price field has a value
    if (minPrice.trim() === "" && maxPrice.trim() === "") {
      // If both prices are empty, remove price filters
      setFilter((prev) => {
        const { minPrice: _, maxPrice: __, ...rest } = prev;
        return rest;
      });
      return;
    }

    // Debounce: Wait 500ms after user stops typing
    const delayedSearch = setTimeout(() => {
      console.log("Searching with price range:", { minPrice, maxPrice });

      setFilter((prev) => {
        const newFilter = {
          ...prev,
          nextPage: false,
          previousPage: false,
        };

        // Add price filters only if they have values
        if (minPrice.trim() !== "") {
          newFilter.minPrice = parseFloat(minPrice) || 0;
        }
        if (maxPrice.trim() !== "") {
          newFilter.maxPrice = parseFloat(maxPrice) || Infinity;
        }

        // dispatch the action to get all products with the price filters
        dispatch(getAllProducts(newFilter));

        return newFilter;
      });
    }, 500); // 500ms delay

    // Cleanup: Cancel previous timeout if user keeps typing
    return () => clearTimeout(delayedSearch);
  }, [minPrice, maxPrice, dispatch]); // Include dispatch as dependency

  const brandChangeHandler = (e) => {
    setbrand(e.target.value);
    console.log("Brand input changed:", e.target.value);
  };

  // Price change handlers
  const minPriceChangeHandler = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMinPrice(value);
      console.log("Min price changed:", value);
    }
  };

  const maxPriceChangeHandler = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMaxPrice(value);
      console.log("Max price changed:", value);
    }
  };

  // State for sort option
  const [sortBy, setSortBy] = useState("Newest");

  // State for category filters
  const [categoryFilters, setCategoryFilters] = useState({
    "Men Jackets": false,
    "Men Clothings": false,
    "Men Watches Rings Chains": false,
    "Men Wallets": false,
    "Men Shoes": false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setCategoryFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));

    console.log(`${name} is now ${checked ? "checked" : "unchecked"}`);
    console.log("All filters:", { ...categoryFilters, [name]: checked });

    // Update filter state to include selected categories
    const updatedFilters = { ...categoryFilters, [name]: checked };
    const selectedCategories = Object.keys(updatedFilters).filter(
      (key) => updatedFilters[key]
    );

    setFilter({
      ...filter,
      category: selectedCategories,
      nextPage: false,
      previousPage: false,
    });

    dispatch(getAllProducts(filter));
  };

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

  // Pagination Buttons Hover Function Enter
  const paginationButtonHoverEnter = (e) => {
    e.currentTarget.style.backgroundColor = secondaryBg;
    e.currentTarget.style.color = primaryBg;
    e.currentTarget.style.cursor = "pointer";
  };

  // Pagination Buttons Hover Function Leave
  const paginationButtonHoverLeave = (e) => {
    e.currentTarget.style.backgroundColor = primaryText;
    e.currentTarget.style.color = primaryBg;
  };

  // Pagination Next Button OnClick Function
  const paginationButtonOnClickNext = (e) => {
    if (currentPage >= totalPages) {
      return; // Prevent going to next page if already on the last page
    }

    if (e.currentTarget.textContent.trim() === "Next") {
      console.log("Next button clicked");

      setFilter({
        ...filter,
        nextPage: true,
        previousPage: false,
      });
    }

    dispatch(getAllProducts(filter));
  };

  // Pagination Previous Button OnClick Function
  const paginationButtonOnClickPrevious = (e) => {
    if (currentPage <= 1) {
      return; // Prevent going to previous page if already on the first page
    }

    // Determine if the button clicked is Next or Previous
    if (e.currentTarget.textContent.trim() === "Previous") {
      console.log("Previous button clicked");

      setFilter({
        ...filter,
        nextPage: false,
        previousPage: true,
      });
    }
    dispatch(getAllProducts(filter));
  };

  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(getAllProducts(filter));
  }, [dispatch, filter]);

  return (
    <>
      <Header />
      <div className="flex flex-row items-center justify-center my-10 gap-5 relative">
        {/* Left Side */}
        <div
          className="left sticky top-5 self-start flex flex-col gap-5 w-[20%] border border-gray-500 p-3 rounded-2xl"
          style={{ backgroundColor: primaryBg, color: primaryText }}
        >
          {/* main Heading */}
          <div className="heading flex items-center justify-between border-b border-gray-500 pb-3">
            <h2 className="text-lg font-semibold">Filters</h2>
            <FaSliders size={22} />
          </div>

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
                className="appearance-none h-4 w-4 rounded-md border border-gray-300 checked:bg-black checked:border-transparent focus:outline-none transition-all duration-200"
                name="Men Jackets"
                checked={categoryFilters.menJackets}
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
                checked={categoryFilters.menClothings}
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
                checked={categoryFilters.menWatchesRingsChains}
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
                checked={categoryFilters.menWallets}
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
                checked={categoryFilters.menShoes}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>

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

          {/* Filter by Price */}
          <div className="p-2 border-b border-gray-500 pb-3 flex flex-col gap-3">
            <div className="categories-filters flex items-center justify-between border-b border-gray-500 pb-3 gap-5">
              {/* sub heading */}
              <h2 className="text-md font-semibold">Filter by Price</h2>
              <MdCategory size={22} />
            </div>

            {/* Min Price Input */}
            <input
              type="text"
              placeholder="Min Price"
              className="border w-1/2 mx-auto border-gray-300 rounded-md p-2 h-8"
              value={minPrice}
              onChange={minPriceChangeHandler}
            />

            <h1 className="font-bold mx-auto text-lg">TO</h1>

            {/* Max Price Input */}
            <input
              type="text"
              placeholder="Max Price"
              className="border w-1/2 mx-auto border-gray-300 rounded-md p-2 h-8"
              value={maxPrice}
              onChange={maxPriceChangeHandler}
            />
          </div>
        </div>

        {/* Right Side */}
        <div
          className="h-fit right w-[75%] flex flex-col gap-5 rounded-2xl p-4"
          style={{ backgroundColor: primaryBg, color: primaryText }}
        >
          {/* Heading  */}
          <div className="heading flex items-center justify-between border-b border-gray-500 pb-3">
            <h1 className="font-bold text-2xl">Stallion Wear Products</h1>

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
          </div>

          {/* Product List */}
          <div className="product-list flex flex-wrap gap-5 justify-center items-center border-b border-gray-500 pb-3">
            {products.length === 0 && (
              <p className="text-gray-500">No products found.</p>
            )}
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="shadow-lg p-4 w-[25vw] rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-gray-50 relative overflow-hidden group"
                >
                  {/* Image Container with Overlay */}
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={`${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Sliding Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                      <div className="flex flex-col gap-3">
                        {/* Add to Cart Button */}
                        <button
                          className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100 delay-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Add to cart:", product._id);
                            // Add your cart logic here
                          }}
                        >
                          <FaShoppingCart className="inline-block mr-2" /> Add
                          to Cart
                        </button>

                        {/* Add to Wishlist Button */}
                        <button
                          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100 delay-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Add to wishlist:", product._id);
                            // Add your wishlist logic here
                          }}
                        >
                          <FaHeart className="inline-block mr-2" /> Add to
                          Wishlist
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold mt-2 transition-colors duration-200">
                    {product.name}
                  </h3>

                  {/* rating */}
                  <div className="mt-2">
                    {product.reviews && product.reviews.averageRating ? (
                      renderStars(product.reviews.averageRating)
                    ) : (
                      <p className="text-gray-500">No ratings yet</p>
                    )}
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination flex items-center justify-between p-3">
            <button
              className=" px-4 py-2 font-semibold rounded-md"
              style={{ backgroundColor: primaryText, color: primaryBg }}
              onMouseEnter={paginationButtonHoverEnter}
              onMouseLeave={paginationButtonHoverLeave}
              onClick={paginationButtonOnClickPrevious}
            >
              Previous
            </button>
            <span
              className="text-lg font-semibold"
              style={{
                color: primaryText,
              }}
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 font-semibold rounded-md"
              style={{ backgroundColor: primaryText, color: primaryBg }}
              onMouseEnter={paginationButtonHoverEnter}
              onMouseLeave={paginationButtonHoverLeave}
              onClick={paginationButtonOnClickNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Categories;
