import { useDispatch, useSelector } from "react-redux";
import { getTopSelling } from "../../features/Products/productSlice.js";
import Product from "../Product";
import { useEffect } from "react";

const TopSelling = () => {
  // initialize this dispatch
  const dispatch = useDispatch();

  // get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // get the topselling products from the redux store
  const { topSelling, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Fetch new arrivals when the component mounts
    dispatch(getTopSelling());
  }, [dispatch]);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center mt-10 pt-5 pb-15 border-b border-gray-500"
        style={{
          backgroundColor: primaryBg,
        }}
      >
        {/* Heading */}
        <h2
          className="text-6xl font-bold mb-8"
          style={{
            color: primaryText,
          }}
        >
          Top Selling
        </h2>
        {/* Top Selling Products */}
        <div className="topSelling">
          {/* Loading */}
          {isLoading && <p>Loading...</p>}

          {/* Error Message */}
          {isError && <p className="text-red-500">{message}</p>}

          {/* No Products Found */}
          {!isLoading && !isError && topSelling.length === 0 && (
            <p>No top selling products found.</p>
          )}

          {/* Product List */}
          {!isLoading && !isError && topSelling.length > 0 && (
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {topSelling.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopSelling;
