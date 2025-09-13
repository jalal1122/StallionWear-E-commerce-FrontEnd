import { FaSliders } from "react-icons/fa6";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/Products/productSlice.js";
import Product from "../Components/Product";
import PriceFilter from "../Components/Categories/PriceFilter";
import BrandFilter from "../Components/Categories/BrandFilter";
import CategoriesFilter from "../Components/Categories/CategoriesFilter";
import SortBy from "../Components/Categories/SortBy";
import PaginationSection from "../Components/Categories/PaginationSection";

const Categories = () => {
  const dispatch = useDispatch();

  // Get products, totalPages, and currentPage from the Redux store
  const { products, totalPages, currentPage, isLoading } = useSelector(
    (state) => state.products
  );

  // Get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // State for filter options
  const [filter, setFilter] = useState({
    category: [],
    nextPage: false,
    previousPage: false,
  });

  // state for Brand Input
  const [brand, setbrand] = useState("");

  // State for price filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(getAllProducts(filter));
  }, [dispatch, filter]);

  return (
    <>
      <Header />

      <div className="flex flex-col sm:flex-row items-center justify-center px-5 my-10 gap-5 relative">
        {/* Left Side */}
        <div
          className="left relative sm:sticky top-5 self-start flex flex-col gap-5 w-full sm:w-[30%] lg:w-[20%] border border-gray-500 p-3 rounded-2xl"
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
            setFilter={setFilter}
            dispatch={dispatch}
            getAllProducts={getAllProducts}
          />
        </div>

        {/* Right Side */}
        <div
          className="h-fit right w-full sm:w-[75%] flex flex-col gap-5 rounded-2xl p-4"
          style={{ backgroundColor: primaryBg, color: primaryText }}
        >
          {/* Heading  */}
          <div className="heading flex flex-col md:flex-row gap-5 items-center justify-between border-b border-gray-500 pb-3">
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
            {isLoading && (
              <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: primaryBg }}
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p style={{ color: primaryText }}>
                    Loading Products...
                  </p>
                </div>
              </div>
            )}
            {!isLoading && products && products.length === 0 && (
              <p className="text-gray-500">No products found.</p>
            )}
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {!isLoading &&
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </div>

          {/* Pagination */}
          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            setFilter={setFilter}
            dispatch={dispatch}
            getAllProducts={getAllProducts}
            filter={filter}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Categories;
