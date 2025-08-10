const QuantitySelection = ({ quantity, setQuantity }) => {

  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <>
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold">Quantity </h3>
        <div className="flex items-center border rounded">
          <button
            className="px-3 py-1 font-extrabold hover:cursor-pointer disabled:opacity-50"
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
            className="px-3 py-1 font-bold hover:cursor-pointer"
            onClick={() => handleQuantityChange(1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default QuantitySelection;
