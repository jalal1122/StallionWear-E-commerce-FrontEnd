import { useSelector } from "react-redux";
import RenderStars from "../RenderStars";
import Product from "../Product";

const RelevantProducts = () => {
  // get the colors from redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // get the relevant products from the redux store
  const { relevantProducts, isLoading, isError } = useSelector(
    (state) => state.products
  );

  return (
    <>
      <div
        className="flex flex-col justify-center items-center my-10 p-5"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        <h1 className="text-4xl font-bold my-10">You Might Also Like</h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-red-500 text-center">
            <p>Failed to load relevant products. Please try again.</p>
          </div>
        )}

        {/* Products List */}
        {!isLoading &&
          !isError &&
          relevantProducts &&
          Array.isArray(relevantProducts) &&
          relevantProducts.length > 0 && (
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {relevantProducts
                .slice(0, Math.min(4, relevantProducts.length))
                .map((product) => (
                  <Product key={product?._id} product={product} />
                ))}
            </div>
          )}

        {/* No Products State */}
        {!isLoading &&
          !isError &&
          (!relevantProducts ||
            !Array.isArray(relevantProducts) ||
            relevantProducts.length === 0) && (
            <div className="text-gray-500 text-center">
              <p>No relevant products found.</p>
            </div>
          )}
      </div>
    </>
  );
};

export default RelevantProducts;
