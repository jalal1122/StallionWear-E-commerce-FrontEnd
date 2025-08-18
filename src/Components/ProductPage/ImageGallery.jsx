import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaExpandArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ImageGallery = ({ product }) => {
  // get the colors from redux store
  const { primaryBg } = useSelector((state) => state.colors.colors);

  // state for the main product image
  const [mainImage, setMainImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // Handle image gallery click - Switch main image with clicked thumbnail
  const handleImageGallery = (clickedImage, index) => {
    setMainImage(clickedImage);
    setCurrentImageIndex(index);
    console.log("Switched to image:", clickedImage);
  };

  // Navigate to previous image
  const previousImage = () => {
    const images = product?.images || [];
    if (images.length > 0) {
      const newIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      setMainImage(images[newIndex]);
      setCurrentImageIndex(newIndex);
    }
  };

  // Navigate to next image
  const nextImage = () => {
    const images = product?.images || [];
    if (images.length > 0) {
      const newIndex =
        currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      setMainImage(images[newIndex]);
      setCurrentImageIndex(newIndex);
    }
  };

  const displayedImage =
    mainImage || product?.images?.[0] || "/placeholder-image.jpg";
  const images = product?.images || [];

  return (
    <div className="space-y-4">
      {/* Main Product Image */}
      <div className="relative group">
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{
            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          }}
        >
          <img
            src={displayedImage}
            alt={product?.name || "Product"}
            className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
                aria-label="Previous image"
              >
                <FaChevronLeft size={20} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
                aria-label="Next image"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}

          {/* Zoom Icon */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
            title="View full size"
            aria-label="Zoom image"
          >
            <FaExpandArrowsAlt size={16} />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black bg-opacity-50 text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageGallery(image, index)}
              className={`flex-shrink-0 border-3 rounded-xl transition-all duration-300 overflow-hidden ${
                mainImage === image || (!mainImage && index === 0)
                  ? "border-blue-500 shadow-lg scale-105"
                  : "border-transparent hover:border-blue-300 hover:scale-102"
              }`}
              style={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              }}
            >
              <img
                src={image}
                alt={`${product?.name || "Product"} ${index + 1}`}
                className="w-20 h-20 lg:w-24 lg:h-24 object-cover transition-transform duration-300 hover:scale-110"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageGallery(images[index], index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index
                  ? "bg-blue-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
