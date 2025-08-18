import { useSelector } from "react-redux";
import { FaRuler } from "react-icons/fa";

const SizeOptions = ({ product, currentSize, setCurrentSize }) => {
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // Handle size selection
  const handleSizeSelect = (size) => {
    setCurrentSize(size);
    console.log("Selected size:", size);
  };

  // Get unique sizes from variants
  const getUniqueSizes = () => {
    if (!product?.variants) return [];
    const sizes = product.variants.map((variant) => variant.size);
    return [...new Set(sizes)]; // Remove duplicates
  };

  // Size guide info
  const sizeGuide = {
    XS: "Extra Small",
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "Extra Large",
    XXL: "Double Extra Large",
  };

  return (
    <div className="space-y-4">
      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FaRuler className="text-blue-500" size={20} />
          <h2 className="text-xl font-semibold">Choose Size</h2>
          {currentSize && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                color: primaryText,
              }}
            >
              {currentSize}{" "}
              {sizeGuide[currentSize] && `- ${sizeGuide[currentSize]}`}
            </span>
          )}
        </div>

        {/* Size Options */}
        <div className="flex gap-3 flex-wrap">
          {getUniqueSizes().map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className="relative min-w-[3rem] px-4 py-3 rounded-xl font-bold transition-all duration-300 border-2 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-lg transform hover:scale-105"
              style={{
                backgroundColor:
                  currentSize === size
                    ? "#3b82f6"
                    : isDarkMode
                    ? "#1f2937"
                    : "#ffffff",
                color: currentSize === size ? "#ffffff" : primaryText,
                borderColor:
                  currentSize === size
                    ? "#3b82f6"
                    : isDarkMode
                    ? "#374151"
                    : "#e5e7eb",
                boxShadow:
                  currentSize === size
                    ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                    : "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              aria-label={`Select size ${size}`}
              aria-pressed={currentSize === size}
              title={sizeGuide[size] || `Size ${size}`}
            >
              {size}
              {currentSize === size && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Size selection prompt */}
        {getUniqueSizes().length > 0 && !currentSize && (
          <div className="flex items-center gap-2 text-sm opacity-70">
            <span>Please select a size to continue</span>
          </div>
        )}

        {/* Size guide link */}
        <button
          className="text-sm text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
          onClick={() => console.log("Open size guide")}
        >
          View Size Guide
        </button>

        {/* No sizes available */}
        {getUniqueSizes().length === 0 && (
          <div className="text-sm opacity-50">No size options available</div>
        )}
      </div>
    </div>
  );
};

export default SizeOptions;
