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
import RenderStars from "../utils/RenderStars";
import { useState } from "react";
import Reviews from "../Components/Reviews";
import RelevantProducts from "../Components/ProductPage/RelevantProducts";
import ImageGallery from "../Components/ProductPage/ImageGallery";
import SizeOptions from "../Components/ProductPage/SizeOptions";
import ColorOptions from "../Components/ProductPage/ColorOptions";
import QuantitySelection from "../Components/ProductPage/QuantitySelection";

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

    // Fetch relevant products when product is loaded and has a category
    // Only fetch if we don't already have relevant products or if the category changed
    if (product?.category) {
      console.log("Fetching relevant products for category:", product.category);
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
    console.log("Retrying product fetch for ID:", id);
    dispatch(clearError());
    if (id) {
      dispatch(getProductById(id));
    }
  };

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
      <div
        className="product-content flex flex-col items-center px-2 py-5"
        style={{
          backgroundColor: primaryBg,
        }}
      >
        {/* Product Detail */}
        <div className="flex justify-center items-start w-[90%] gap-8">
          {/* Left Side - Images */}
          <ImageGallery product={product} />

          {/* Right Side - Product Details */}
          <div
            className="flex-1 flex flex-col items-start gap-4 p-2"
            style={{ color: primaryText }}
          >
            {/* Product Title */}
            <h1 className="text-4xl font-bold">
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
            <p className="text-3xl font-bold">${price}</p>

            {/* Product Description */}
            <p className=" max-w-md">
              {product?.description ||
                "This is a brief description of the product. It highlights the key features and benefits."}
            </p>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] my-4 bg-gray-500"> </div>

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
            <div className="flex flex-col gap-4 w-full mt-4">
              {/* Quantity Selector */}
              <QuantitySelection quantity={quantity} setQuantity={setQuantity} />

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
      <RelevantProducts />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
