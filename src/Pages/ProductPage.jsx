import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import LinkLeader from "../Components/ProductPage/LinkLeader";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "../features/Products/productSlice.js";
import RenderStars from "../utils/RenderStars";
import { useState } from "react";

// ProductPage component

const ProductPage = () => {
  //   get the product details from the redux store
  const { product } = useSelector((state) => state.products);

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

  // price with modifiers
  const priceModifier = product?.variants?.find(
    (variant) => variant.size === currentSize && variant.color === currentColor
  )?.priceModifier;
  const price =
    product?.price?.toFixed(2) + (priceModifier ? ` + ${priceModifier}` : "");

  useEffect(() => {
    // Fetch product details by ID when the component mounts
    dispatch(getProductById(id));
  }, [dispatch, id]); // Remove 'product' to avoid infinite loop

  // Set default size and color when product loads
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }

    if (product?.variants?.length > 0) {
      setCurrentSize(product.variants[0].size);
      setCurrentColor(product.variants[0].color);
    }
  }, [product]); // Only depend on product

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
    return [...new Set(colors)]; // Remove duplicates
  };

  // Handle image gallery click - Switch main image with clicked thumbnail
  const handleImageGallery = (clickedImage) => {
    setMainImage(clickedImage);
    console.log("Switched to image:", clickedImage);
  };

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
                {product?.reviews?.averageRating
                  ? RenderStars(product.reviews.averageRating)
                  : "No ratings"}
              </span>
              <span className="ml-2 text-gray-500">
                ({product?.reviews?.totalReviews || 0} reviews)
              </span>
            </div>

            {/* Product Price */}
            <p className="text-3xl font-bold text-green-600">
              ${price || "0.00"}
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
                    className="text-lg font-bold px-6 py-2 rounded-3xl hover:cursor-pointer transition-all duration-200 border-2"
                    style={{
                      backgroundColor:
                        currentSize === size ? primaryText : "transparent",
                      color: currentSize === size ? primaryBg : primaryText,
                      borderColor: primaryText,
                    }}
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
                    className="w-8 h-8 rounded-full border-4 hover:cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      borderColor:
                        currentColor === color ? primaryText : "transparent",
                    }}
                    title={color}
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
                  <button className="px-3 py-1 hover:bg-gray-100">-</button>
                  <span className="px-4 py-1 border-x">1</span>
                  <button className="px-3 py-1 hover:bg-gray-100">+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                  disabled={!currentSize || !currentColor}
                  onClick={() =>
                    console.log("Add to cart:", {
                      productId: id,
                      size: currentSize,
                      color: currentColor,
                      quantity: 1,
                    })
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
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
