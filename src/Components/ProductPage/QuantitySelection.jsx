import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelection = ({ quantity, setQuantity }) => {
  // get the colors from redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-6">
        <h3 className="text-xl font-semibold">Quantity</h3>
        <div
          className="flex items-center rounded-xl shadow-md overflow-hidden"
          style={{
            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          }}
        >
          <button
            className="flex items-center justify-center w-12 h-12 font-bold transition-all duration-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            style={{
              color: quantity <= 1 ? "#9ca3af" : "#ef4444",
              backgroundColor:
                quantity <= 1
                  ? "transparent"
                  : isDarkMode
                  ? "#374151"
                  : "#fef2f2",
            }}
          >
            <FaMinus size={14} />
          </button>

          <div
            className="flex items-center justify-center w-16 h-12 text-lg font-bold border-x"
            style={{
              borderColor: isDarkMode ? "#374151" : "#e5e7eb",
              color: primaryText,
            }}
          >
            {quantity}
          </div>

          <button
            className="flex items-center justify-center w-12 h-12 font-bold transition-all duration-200 hover:bg-green-50"
            onClick={() => handleQuantityChange(1)}
            aria-label="Increase quantity"
            style={{
              color: "#10b981",
              backgroundColor: isDarkMode ? "#374151" : "#f0fdf4",
            }}
          >
            <FaPlus size={14} />
          </button>
        </div>

        {/* Stock indicator */}
        <div className="text-sm opacity-70">
          <span className="text-green-600">✓</span> In Stock
        </div>
      </div>
    </div>
  );
};

export default QuantitySelection;
