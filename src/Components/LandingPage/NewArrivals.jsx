import { useDispatch, useSelector } from "react-redux";
import { getNewArrivals } from "../../features/Products/productSlice.js";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import RenderStars from "../../utils/RenderStars";
import Product from "../Product.jsx";

const NewArrivals = () => {
  // initialize this dispatch
  const dispatch = useDispatch();

  // get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  const { newArrivals, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Fetch new arrivals when the component mounts
    dispatch(getNewArrivals());
  }, [dispatch]);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center pt-5 pb-15 border-b border-gray-500"
        style={{
          backgroundColor: primaryBg,
        }}
      >
        <h2
          className="text-4xl xs:text-6xl font-bold mb-8"
          style={{
            color: primaryText,
          }}
        >
          New Arrivals
        </h2>
        <div className="newArrivals">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">{message}</p>}
          {!isLoading && !isError && newArrivals.length === 0 && (
            <p>No new arrivals found.</p>
          )}
          {!isLoading && !isError && newArrivals.length > 0 && (
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {newArrivals.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
