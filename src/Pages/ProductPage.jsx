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
} from "../features/Products/productSlice.js";
import RenderStars from "../utils/RenderStars";
import { useState } from "react";
import Reviews from "../Components/Reviews";
import RelevantProducts from "../Components/ProductPage/RelevantProducts";

// ProductPage component

const ProductPage = () => {
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
      console.log("Fetching product with ID:", id);
      dispatch(getProductById(id));
    }
  }, [dispatch, id]); // Remove 'product' to avoid infinite loop

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
  }, [product, mainImage, currentSize, currentColor]); // Include all dependencies

  // get the colors from the redux store
  const { primaryText, primaryBg, secondaryText } = useSelector(
    (state) => state.colors.colors
  );

  // Handle size selection
  const handleSizeSelect = (size) => {
    setCurrentSize(size);
    console.log("Selected size:", size);
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setCurrentColor(color);
    console.log("Selected color:", color);
  };

  // Get unique sizes from variants
  const getUniqueSizes = () => {
    if (!product?.variants) return [];
    const sizes = product.variants.map((variant) => variant.size);
    return [...new Set(sizes)]; // Remove duplicates
  };

  // Get unique colors from variants
  const getUniqueColors = () => {
    if (!product?.variants) return [];
    const colors = product.variants.map((variant) => variant.color);
    const uniqueColors = [...new Set(colors)]; // Remove duplicates

    // Filter out invalid colors
    return uniqueColors.filter(
      (color) => color && typeof color === "string" && color.trim() !== ""
    );
  };

  // Handle image gallery click - Switch main image with clicked thumbnail
  const handleImageGallery = (clickedImage) => {
    setMainImage(clickedImage);
    console.log("Switched to image:", clickedImage);
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Retry loading the product
  const handleRetry = () => {
    console.log("Retrying product fetch for ID:", id);
    dispatch(clearError());
    if (id) {
      dispatch(getProductById(id));
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("ProductPage state:", {
      product,
      isLoading,
      isError,
      message,
      id,
    });
  }, [product, isLoading, isError, message, id]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <div className="text-xl" style={{ color: primaryText }}>
              Loading product...
            </div>
          </div>
        </div>
        <Footer />
      </>
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
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center max-w-md">
            <div className="text-6xl text-red-500 mb-4">
              {isServerError ? "🔧" : is404Error ? "📭" : "⚠️"}
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              {isServerError
                ? "Server Error"
                : is404Error
                ? "Product Not Found"
                : "Something Went Wrong"}
            </h1>
            <p className="text-gray-600 mb-4">
              {isServerError
                ? "We're experiencing technical difficulties. Please try again in a moment."
                : is404Error
                ? "The product you're looking for doesn't exist or has been removed."
                : message ||
                  "Sorry, we couldn't load this product. Please try again."}
            </p>
            {message && (
              <div className="text-sm text-gray-500 mb-4">
                <details className="bg-gray-100 p-3 rounded cursor-pointer">
                  <summary className="font-medium">
                    Technical Details (Click to expand)
                  </summary>
                  <div className="mt-2 font-mono text-xs">
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
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Product not found (different from server error)
  if (!product && !isLoading && !isError) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-6xl text-gray-400 mb-4">📦</div>
            <h1 className="text-3xl font-bold text-gray-600 mb-2">
              No Product Data
            </h1>
            <p className="text-gray-500 mb-4">
              Product information is not available.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Link breadcrumb */}
      <LinkLeader productId={id} />

      {/* Main content for ProductPage */}
      <div className="product-content flex flex-col items-center p-2">
        {/* Product Detail */}
        <div className="flex justify-between items-start w-[90%] gap-8">
          {/* Left Side - Images */}
          <div className="flex-1">
            {/* main Product Image */}
            <img
              src={
                mainImage || product?.images?.[0] || "/placeholder-image.jpg"
              }
              alt={product?.name || "Product"}
              className="w-full max-w-md h-96 object-cover rounded-lg shadow-lg"
            />

            {/* Multiple small images */}
            <div className="flex gap-2 mt-4">
              {product?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageGallery(image)}
                  className={`border-2 rounded transition-all duration-200 ${
                    mainImage === image
                      ? "border-blue-500"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product?.name || "Product"} ${index + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex-1 flex flex-col items-start gap-4 p-2">
            {/* Product Title */}
            <h1 className="text-4xl font-bold" style={{ color: primaryText }}>
              {product?.name || "Loading..."}
            </h1>

            {/* Product Rating */}
            <div className="flex items-center">
              <span>
                {product?.reviews?.averageRating ? (
                  <RenderStars rating={product.reviews.averageRating} />
                ) : (
                  "No ratings"
                )}
              </span>
              <span className="ml-2 text-gray-500">
                ({product?.reviews?.totalReviews || 0} reviews)
              </span>
            </div>

            {/* Product Price */}
            <p className="text-3xl font-bold text-green-600">
              ${price}
              {priceModifier && (
                <span className="text-lg text-gray-500 ml-2">
                  (Base: ${basePrice.toFixed(2)} + ${priceModifier.toFixed(2)})
                </span>
              )}
            </p>

            {/* Product Description */}
            <p className="text-gray-600 max-w-md">
              {product?.description ||
                "This is a brief description of the product. It highlights the key features and benefits."}
            </p>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] my-4 bg-gray-500"> </div>

            {/* Size Selection */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-xl font-semibold"
                style={{ color: secondaryText }}
              >
                Choose Size
              </h2>

              {/* Size Options */}
              <div className="sizeOptions flex gap-2 flex-wrap">
                {getUniqueSizes().map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="text-lg font-bold px-6 py-2 rounded-3xl hover:cursor-pointer transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor:
                        currentSize === size ? primaryText : "transparent",
                      color: currentSize === size ? primaryBg : primaryText,
                      borderColor: primaryText,
                    }}
                    aria-label={`Select size ${size}`}
                    aria-pressed={currentSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-xl font-semibold"
                style={{ color: secondaryText }}
              >
                Choose Color
              </h2>

              {/* Color Options */}
              <div className="colorOptions flex gap-2 flex-wrap">
                {getUniqueColors().map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className="w-8 h-8 rounded-full border-4 hover:cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      borderColor:
                        currentColor === color ? primaryText : "transparent",
                    }}
                    title={color}
                    aria-label={`Select color ${color}`}
                    aria-pressed={currentColor === color}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex flex-col gap-4 w-full mt-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: secondaryText }}
                >
                  Quantity:
                </h3>
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!currentSize || !currentColor}
                  onClick={() =>
                    console.log("Add to cart:", {
                      productId: id,
                      size: currentSize,
                      color: currentColor,
                      quantity: quantity,
                      price: finalPrice,
                    })
                  }
                  aria-label={
                    !currentSize || !currentColor
                      ? "Select size and color to add to cart"
                      : "Add to cart"
                  }
                >
                  {!currentSize || !currentColor
                    ? "Select Size & Color"
                    : "Add to Cart"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                  onClick={() => console.log("Add to wishlist:", id)}
                  title="Add to Wishlist"
                  aria-label="Add to wishlist"
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews heading={"Rating & Reviews"} reviews={product?.reviews} />

      {/* Related Products Section */}
      <RelevantProducts category={product?.category} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
