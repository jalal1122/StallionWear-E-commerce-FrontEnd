import { FaSliders } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import RenderStars from "../utils/RenderStars.jsx";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/Products/productSlice.js";
import { Link } from "react-router-dom";
import Product from "../Components/Product";
import PriceFilter from "../Components/Categories/PriceFilter";
import BrandFilter from "../Components/Categories/BrandFilter";
import CategoriesFilter from "../Components/Categories/CategoriesFilter";
import SortBy from "../Components/Categories/SortBy";

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
          <CategoriesFilter
            categoryFilters={categoryFilters}
            setCategoryFilters={setCategoryFilters}
            setFilter={setFilter}
            dispatch={dispatch}
            getAllProducts={getAllProducts}
            filter={filter}
          />

          {/* Filter by Brand */}
          <BrandFilter
            brand={brand}
            setbrand={setbrand}
            setFilter={setFilter}
            dispatch={dispatch}
            getAllProducts={getAllProducts}
          />

          {/* Filter by Price */}
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
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
            <SortBy
              sortBy={sortBy}
              setSortBy={setSortBy}
              filter={filter}
              setFilter={setFilter}
              dispatch={dispatch}
              getAllProducts={getAllProducts}
            />
          </div>

          {/* Product List */}
          <div className="product-list flex flex-wrap gap-5 justify-center items-center border-b border-gray-500 pb-3">
            {products.length === 0 && (
              <p className="text-gray-500">No products found.</p>
            )}
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {products.map((product) => (
                <Product key={product._id} product={product} />
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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Categories;
