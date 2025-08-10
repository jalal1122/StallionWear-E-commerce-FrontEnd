import { useState } from "react";

const ImageGallery = ({ product }) => {
  // state for the main product image
  const [mainImage, setMainImage] = useState("");

  // Handle image gallery click - Switch main image with clicked thumbnail
  const handleImageGallery = (clickedImage) => {
    setMainImage(clickedImage);
    console.log("Switched to image:", clickedImage);
  };

  return (
    <>
      <div className="flex-1">
        {/* main Product Image */}
        <img
          src={mainImage || product?.images?.[0] || "/placeholder-image.jpg"}
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
    </>
  );
};

export default ImageGallery;
