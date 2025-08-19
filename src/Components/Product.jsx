import { FaShoppingCart, FaHeart, FaStar, FaEye, FaTag } from "react-icons/fa";
import { Link } from "react-router";
import RenderStars from "../utils/RenderStars";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistItem } from "../features/Wishlist/wishlistSlice.js";
import { addToCart } from "../features/Cart/cartSlice.js";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  // get the colors from redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // Calculate discount percentage (mock data)
  const originalPrice = product.price * 1.2; // Simulate original price
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Add to wishlist:", product._id);

    dispatch(
      addWishlistItem({
        productId: product._id,
        size: product.variants[0]?.size || "M",
        color: product.variants[0]?.color || "Black",
      })
    );
  };

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("Add to Cart", product._id);

    dispatch(
      addToCart({
        productId: product._id,
        size: product.variants[0]?.size || "M",
        color: product.variants[0]?.color || "Black",
        price: product.price,
      })
    );
  };

  return (
    <div className="group">
      {/* Product Container */}
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-2xl"
        style={{
          backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
          border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
        }}
      >
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaTag size={10} />
              {discountPercent}% OFF
            </div>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          style={{
            backgroundColor: isDarkMode ? "#374151" : "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <FaHeart
            className="text-red-500 hover:text-red-600 transition-colors duration-300"
            size={16}
          />
        </button>

        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden">
          <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-t-2xl overflow-hidden">
            <img
              src={product.images?.[0] || "/placeholder-image.jpg"}
              alt={product.name}
              className="w-full h-30 xs:h-35 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Action Buttons Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex gap-3">
              {/* Quick View Button */}
              <Link
                to={`/product/${product._id}`}
                className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaEye size={14} />
                Quick View
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddtoCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaShoppingCart size={14} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-6">
          {/* Product Name */}
          <Link
            to={`/product/${product._id}`}
            className="block group-hover:text-blue-600 transition-colors duration-300"
          >
            <h3
              className="text-lg font-bold mb-2 line-clamp-2 leading-tight"
              style={{ color: primaryText }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            {product.reviews && product.reviews.averageRating ? (
              <>
                <div className="flex items-center">
                  <RenderStars rating={product.reviews.averageRating} />
                </div>
                <span className="text-sm opacity-70">
                  ({product.reviews.totalReviews || 0})
                </span>
              </>
            ) : (
              <div className="flex items-center gap-1 text-gray-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
                <span className="text-sm ml-1">No ratings</span>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {discountPercent > 0 ? (
                <>
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className="text-sm line-through opacity-60"
                    style={{ color: primaryText }}
                  >
                    ${originalPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span
                  className="text-2xl font-bold"
                  style={{ color: primaryText }}
                >
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Variant Info */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-4 text-xs opacity-70 mb-4">
              {product.variants[0]?.size && (
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  Size: {product.variants[0].size}
                </span>
              )}
              {product.variants[0]?.color && (
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{
                      backgroundColor: product.variants[0].color.toLowerCase(),
                    }}
                  ></div>
                  {product.variants[0].color}
                </span>
              )}
            </div>
          )}

          {/* Quick Action Buttons for Mobile */}
          <div className="flex gap-2 md:hidden">
            <button
              onClick={handleAddtoCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaShoppingCart size={14} />
              Add to Cart
            </button>

            <Link
              to={`/product/${product._id}`}
              className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
              style={{
                backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                color: primaryText,
              }}
            >
              <FaEye size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
};

export default Product;
