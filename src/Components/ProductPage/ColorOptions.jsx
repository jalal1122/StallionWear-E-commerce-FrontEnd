import { useSelector } from "react-redux";

const ColorOptions = ({ currentColor, setCurrentColor, product }) => {
  const { primaryText } = useSelector((state) => state.colors.colors);

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

  return (
    <>
      {/* Color Selection */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold">Choose Color</h2>

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
    </>
  );
};

export default ColorOptions;
