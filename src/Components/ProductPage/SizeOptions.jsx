import { useSelector } from "react-redux";

const SizeOptions = ({ product, currentSize, setCurrentSize }) => {
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

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

  return (
    <>
      {/* Size Selection */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold">Choose Size</h2>

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
    </>
  );
};

export default SizeOptions;
