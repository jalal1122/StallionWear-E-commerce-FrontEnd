import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { FaTrash, FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  fetchWishlist,
  removeWishlistItem,
  moveToCart,
} from "../features/Wishlist/wishlistSlice";
import Loader from "../Components/Loader";

const Wishlist = () => {
  const dispatch = useDispatch();

  // Get colors from Redux store
  const colors = useSelector((state) => state.colors?.colors || {});

  const {
    wishlistProducts = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.wishlist || {});

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(
      moveToCart({
        productId: item.product._id,
        size: item.variant.size,
        color: item.variant.color,
      })
    );
  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(
      removeWishlistItem({
        productId: item.product._id,
        size: item.variant.size,
        color: item.variant.color,
      })
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          className="flex justify-center items-center min-h-screen"
          style={{ backgroundColor: colors?.primaryBg }}
        >
          <Loader />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div
          className="flex flex-col items-center justify-center min-h-screen"
          style={{ backgroundColor: colors?.primaryBg }}
        >
          <div
            className="text-center p-8 rounded-lg shadow-md max-w-md mx-auto"
            style={{
              backgroundColor:
                colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
              borderColor: colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
            }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Wishlist
            </h2>
            <p className="mb-6" style={{ color: colors?.primaryText }}>
              {error}
            </p>
            <button
              onClick={() => dispatch(fetchWishlist())}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div
        className="min-h-screen py-8 px-4 transition-colors duration-200 my-5"
        style={{ backgroundColor: colors?.primaryBg }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/"
                className="hover:underline transition-colors duration-200"
                style={{
                  color:
                    colors?.secondaryText ||
                    (colors?.primaryText === "#fff" ? "#9ca3af" : "#6b7280"),
                }}
              >
                Home
              </Link>
              <span
                style={{
                  color:
                    colors?.secondaryText ||
                    (colors?.primaryText === "#fff" ? "#9ca3af" : "#6b7280"),
                }}
              >
                /
              </span>
              <span style={{ color: colors?.primaryText }}>Wishlist</span>
            </div>
          </nav>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaHeart className="text-4xl text-red-500" />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ color: colors?.primaryText }}
              >
                Your Wishlist
              </h1>
            </div>
            <p
              style={{
                color:
                  colors?.secondaryText ||
                  (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
              }}
            >
              {wishlistProducts.length === 0
                ? "Your wishlist is empty"
                : `${wishlistProducts.length} item${
                    wishlistProducts.length !== 1 ? "s" : ""
                  } saved for later`}
            </p>
          </div>

          {/* Empty State */}
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <FaHeart className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: colors?.primaryText }}
                >
                  Your wishlist is empty
                </h3>
                <p
                  className="mb-8"
                  style={{
                    color:
                      colors?.secondaryText ||
                      (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
                  }}
                >
                  Save your favorite items to your wishlist and shop them
                  anytime
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white 
                           rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            /* Wishlist Items Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {wishlistProducts.map((item) => (
                <div
                  key={`${item?.product?._id}-${item?.variant?.size}-${item?.variant?.color}`}
                  className="group rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor:
                      colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
                    borderColor:
                      colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                  }}
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        item?.product?.images?.[0] || "/placeholder-image.jpg"
                      }
                      alt={item?.product?.name || "Product"}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Remove Button - Floating */}
                    <button
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white 
                               rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group/btn"
                      title="Remove from wishlist"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                    {/* Discount Badge (if applicable) */}
                    {item?.product?.originalPrice > item?.priceAtTime && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round(
                          ((item.product.originalPrice - item.priceAtTime) /
                            item.product.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    {/* Product Name */}
                    <h3
                      className="text-xl font-semibold mb-2 line-clamp-2"
                      style={{ color: colors?.primaryText }}
                    >
                      {item?.product?.name}
                    </h3>

                    {/* Rating (if available) */}
                    {item?.product?.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className="text-sm"
                          style={{
                            color:
                              colors?.secondaryText ||
                              (colors?.primaryText === "#fff"
                                ? "#9ca3af"
                                : "#6b7280"),
                          }}
                        >
                          ({item.product.rating})
                        </span>
                      </div>
                    )}

                    {/* Variant Info */}
                    {(item?.variant?.size || item?.variant?.color) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.variant.size && (
                          <span
                            className="px-3 py-1 rounded-full text-sm border"
                            style={{
                              borderColor:
                                colors?.primaryBg === "#000"
                                  ? "#6b7280"
                                  : "#d1d5db",
                              color: colors?.primaryText,
                            }}
                          >
                            Size: {item.variant.size}
                          </span>
                        )}
                        {item.variant.color && (
                          <span
                            className="px-3 py-1 rounded-full text-sm border"
                            style={{
                              borderColor:
                                colors?.primaryBg === "#000"
                                  ? "#6b7280"
                                  : "#d1d5db",
                              color: colors?.primaryText,
                            }}
                          >
                            Color: {item.variant.color}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-2xl font-bold text-blue-600">
                        ${item?.priceAtTime?.toFixed(2)}
                      </span>
                      {item?.product?.originalPrice > item?.priceAtTime && (
                        <span
                          className="text-lg line-through"
                          style={{
                            color:
                              colors?.secondaryText ||
                              (colors?.primaryText === "#fff"
                                ? "#9ca3af"
                                : "#6b7280"),
                          }}
                        >
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white 
                               rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium group/cart"
                    >
                      <FaShoppingCart className="w-4 h-4 group-hover/cart:scale-110 transition-transform duration-200" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Continue Shopping Button (for non-empty wishlist) */}
          {wishlistProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 
                         hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
