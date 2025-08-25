import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import LinkLeader from "../Components/ProductPage/LinkLeader";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getProductById,
  clearProduct,
  clearError,
  getRelevantProducts,
} from "../features/Products/productSlice.js";
import RenderStars from "../Components/RenderStars.jsx";
import { useState } from "react";
import ProductReviews from "../Components/Reviews/ProductReviews";
import RelevantProducts from "../Components/ProductPage/RelevantProducts";
import ImageGallery from "../Components/ProductPage/ImageGallery";
import SizeOptions from "../Components/ProductPage/SizeOptions";
import ColorOptions from "../Components/ProductPage/ColorOptions";
import QuantitySelection from "../Components/ProductPage/QuantitySelection";
import { addToCart } from "../features/Cart/cartSlice.js";
import { addWishlistItem } from "../features/Wishlist/wishlistSlice.js";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaExclamationCircle,
  FaHome,
  FaRedo,
} from "react-icons/fa";

// ProductPage component

const ProductPage = () => {
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  //   get the product details from the redux store
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  // get the id parameter from the URL
  const { id } = useParams();

  // initialize the dispatch
  const dispatch = useDispatch();

  // state for the current product size
  const [currentSize, setCurrentSize] = useState("");

  // state for the current product color
  const [currentColor, setCurrentColor] = useState("");

  // state for the main product image
  const [mainImage, setMainImage] = useState("");

  // state for quantity
  const [quantity, setQuantity] = useState(1);

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // price with modifiers
  const priceModifier = product?.variants?.find(
    (variant) => variant.size === currentSize && variant.color === currentColor
  )?.priceModifier;

  const basePrice = product?.price || 0;
  const finalPrice = basePrice + (priceModifier || 0);
  const price = finalPrice.toFixed(2);

  useEffect(() => {
    // Clear any previous errors when component mounts or ID changes
    dispatch(clearError());

    // Fetch product details by ID when the component mounts
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]); // Removed 'product' dependency to avoid infinite loop

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  // Set default size and color when product loads
  useEffect(() => {
    if (product?.images?.length > 0 && !mainImage) {
      setMainImage(product.images[0]);
    }

    if (product?.variants?.length > 0 && !currentSize && !currentColor) {
      setCurrentSize(product.variants[0].size);
      setCurrentColor(product.variants[0].color);
    }

    // Fetch relevant products when product is loaded and has a category
    // Only fetch if we don't already have relevant products or if the category changed
    if (product?.category) {
      dispatch(getRelevantProducts(product.category));
    }
  }, [
    product?.category,
    product?.images,
    product?.variants,
    mainImage,
    currentSize,
    currentColor,
    dispatch,
  ]); // Optimize dependencies

  // Retry loading the product
  const handleRetry = () => {
    dispatch(clearError());
    if (id) {
      dispatch(getProductById(id));
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: id,
        size: currentSize,
        color: currentColor,
        quantity: quantity,
        price: finalPrice,
      })
    );
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();

    dispatch(
      addWishlistItem({
        productId: id,
        size: currentSize,
        color: currentColor,
      })
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
          minHeight: "100vh",
        }}
      >
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 p-8">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent"></div>
              <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-blue-200 opacity-20"></div>
            </div>
            <div className="text-xl font-semibold">Loading product...</div>
            <div className="text-sm opacity-70">
              Please wait while we fetch the details
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state - server error (500, 404, etc.)
  if (isError) {
    const isServerError =
      message &&
      (message.includes("500") ||
        message.includes("Internal Server Error") ||
        message.includes("Network Error"));
    const is404Error =
      message && (message.includes("404") || message.includes("Not Found"));

    return (
      <div
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
          minHeight: "100vh",
        }}
      >
        <Header />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div
            className="flex flex-col items-center gap-6 text-center max-w-md p-8 rounded-2xl shadow-lg"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            }}
          >
            <div className="p-4 rounded-full bg-red-100">
              <FaExclamationCircle size={48} className="text-red-500" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">
                {isServerError
                  ? "Server Error"
                  : is404Error
                  ? "Product Not Found"
                  : "Something Went Wrong"}
              </h1>
              <p className="opacity-70 mb-4">
                {isServerError
                  ? "We're experiencing technical difficulties. Please try again in a moment."
                  : is404Error
                  ? "The product you're looking for doesn't exist or has been removed."
                  : message ||
                    "Sorry, we couldn't load this product. Please try again."}
              </p>
            </div>

            {message && (
              <details
                className="w-full text-left rounded-lg p-3 cursor-pointer"
                style={{ backgroundColor: isDarkMode ? "#374151" : "#f3f4f6" }}
              >
                <summary className="font-medium text-sm">
                  Technical Details
                </summary>
                <div className="mt-2 text-xs opacity-70 space-y-1">
                  <p>
                    <strong>Error:</strong> {message}
                  </p>
                  <p>
                    <strong>Product ID:</strong> {id}
                  </p>
                  <p>
                    <strong>Timestamp:</strong> {new Date().toLocaleString()}
                  </p>
                </div>
              </details>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaRedo className="mr-2" size={14} />
                Try Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaUndo className="mr-2" size={14} />
                Go Back
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaHome className="mr-2" size={14} />
                Go Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Product not found (different from server error)
  if (!product && !isLoading && !isError) {
    return (
      <div
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
          minHeight: "100vh",
        }}
      >
        <Header />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div
            className="flex flex-col items-center gap-6 text-center p-8 rounded-2xl shadow-lg"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            }}
          >
            <div className="p-4 rounded-full bg-gray-100">
              <FaExclamationCircle size={48} className="text-gray-500" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-600 mb-2">
                No Product Data
              </h1>
              <p className="opacity-70 mb-6">
                Product information is not available.
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <FaHome className="mr-2" size={16} />
              Browse Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <Header />
      <div
        className="my-5"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
          minHeight: "100vh",
        }}
      >
        {/* Link breadcrumb */}
        <LinkLeader productId={id} />

        {/* Main content for ProductPage */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Side - Images */}
            <div>
              <ImageGallery product={product} />
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-6">
              {/* Product Title */}
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {product?.name || "Loading..."}
              </h1>

              {/* Product Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {product?.reviews?.averageRating ? (
                    <RenderStars rating={product.reviews.averageRating} />
                  ) : (
                    <div className="flex text-gray-300">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={20} />
                      ))}
                    </div>
                  )}
                  <span className="ml-2 text-sm opacity-70">
                    ({product?.reviews?.totalReviews || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Product Price */}
              <div className="flex items-center gap-4">
                <p className="text-4xl font-bold text-green-600">${price}</p>
                {priceModifier && priceModifier > 0 && (
                  <p className="text-lg opacity-70 line-through">
                    ${basePrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Product Description */}
              <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb" }}
              >
                <p className="text-lg leading-relaxed">
                  {product?.description ||
                    "This is a brief description of the product. It highlights the key features and benefits that make this item special and worth purchasing."}
                </p>
              </div>

              {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#f0f9ff",
                  }}
                >
                  <FaTruck className="text-blue-500" size={20} />
                  <div>
                    <p className="font-semibold text-sm">Free Shipping</p>
                    <p className="text-xs opacity-70">On orders over $100</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#f0fdf4",
                  }}
                >
                  <FaShieldAlt className="text-green-500" size={20} />
                  <div>
                    <p className="font-semibold text-sm">Quality Assured</p>
                    <p className="text-xs opacity-70">Premium materials</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#fef2f2",
                  }}
                >
                  <FaUndo className="text-red-500" size={20} />
                  <div>
                    <p className="font-semibold text-sm">Easy Returns</p>
                    <p className="text-xs opacity-70">30-day return policy</p>
                  </div>
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

              {/* Size Selection */}
              <SizeOptions
                product={product}
                currentSize={currentSize}
                setCurrentSize={setCurrentSize}
              />

              {/* Color Selection */}
              <ColorOptions
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                product={product}
              />

              {/* Add to Cart Section */}
              <div className="space-y-6 pt-4">
                {/* Quantity Selector */}
                <QuantitySelection
                  quantity={quantity}
                  setQuantity={setQuantity}
                />

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    disabled={!currentSize || !currentColor}
                    onClick={handleAddToCart}
                    aria-label={
                      !currentSize || !currentColor
                        ? "Select size and color to add to cart"
                        : "Add to cart"
                    }
                  >
                    <FaShoppingCart size={20} />
                    {!currentSize || !currentColor
                      ? "Select Size & Color"
                      : "Add to Cart"}
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    onClick={handleAddToWishlist}
                    title="Add to Wishlist"
                    aria-label="Add to wishlist"
                  >
                    <FaHeart size={20} />
                  </button>
                </div>

                {/* Success Messages */}
                {(!currentSize || !currentColor) && (
                  <div className="flex items-center gap-2 text-amber-600 text-sm">
                    <FaExclamationCircle size={16} />
                    <span>
                      Please select both size and color to add to cart
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={id} heading="Customer Reviews & Ratings" />

        {/* Related Products Section */}
        <RelevantProducts />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
