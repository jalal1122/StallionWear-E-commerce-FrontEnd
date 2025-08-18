import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

const ColorOptions = ({ currentColor, setCurrentColor, product }) => {
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // Handle color selection
  const handleColorSelect = (color) => {
    setCurrentColor(color);
    console.log("Selected color:", color);
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

  // Get color name for display
  const getColorDisplayName = (color) => {
    return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Choose Color</h2>
          {currentColor && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                color: primaryText,
              }}
            >
              {getColorDisplayName(currentColor)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex gap-3 flex-wrap">
          {getUniqueColors().map((color) => (
            <div key={color} className="relative">
              <button
                onClick={() => handleColorSelect(color)}
                className="relative w-12 h-12 rounded-full border-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: color.toLowerCase(),
                  borderColor:
                    currentColor === color
                      ? "#3b82f6"
                      : isDarkMode
                      ? "#374151"
                      : "#e5e7eb",
                  transform: currentColor === color ? "scale(1.1)" : "scale(1)",
                }}
                title={getColorDisplayName(color)}
                aria-label={`Select color ${color}`}
                aria-pressed={currentColor === color}
              >
                {/* Check icon for selected color */}
                {currentColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1 shadow-md">
                      <FaCheck size={12} className="text-blue-600" />
                    </div>
                  </div>
                )}
              </button>

              {/* Color name tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-lg"
                  style={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                    color: primaryText,
                    border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                  }}
                >
                  {getColorDisplayName(color)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Color selection prompt */}
        {getUniqueColors().length > 0 && !currentColor && (
          <div className="text-sm opacity-70">
            Please select a color to continue
          </div>
        )}

        {/* No colors available */}
        {getUniqueColors().length === 0 && (
          <div className="text-sm opacity-50">No color options available</div>
        )}
      </div>
    </div>
  );
};

export default ColorOptions;
