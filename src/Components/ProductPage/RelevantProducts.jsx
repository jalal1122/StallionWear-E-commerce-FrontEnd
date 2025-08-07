import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import RenderStars from "../../utils/RenderStars.jsx";

const RelevantProducts = () => {
  const { relevantProducts, isLoading, isError } = useSelector(
    (state) => state.products
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="text-4xl font-bold my-5">You Might Also Like</h1>

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
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-xl font-bold mt-2 transition-colors duration-200">
                        {product.name}
                      </h3>

                      {/* rating */}
                      <div className="mt-2">
                        {product.reviews && product.reviews.averageRating ? (
                          <RenderStars rating={product.reviews.averageRating} />
                        ) : (
                          <p className="text-gray-500">No ratings yet</p>
                        )}
                      </div>

                      {/* Price */}
                      <p className="text-lg font-semibold mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </Link>
                  </div>
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
