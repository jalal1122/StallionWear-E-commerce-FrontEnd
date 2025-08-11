import { MdCategory } from "react-icons/md";

const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  // Price change handlers
  const minPriceChangeHandler = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMinPrice(value);
      console.log("Min price changed:", value);
    }
  };

  const maxPriceChangeHandler = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMaxPrice(value);
      console.log("Max price changed:", value);
    }
  };

  return (
    <>
      {/* Filter by Price */}
      <div className="p-2 border-b border-gray-500 pb-3 flex flex-col gap-3">
        <div className="categories-filters flex items-center justify-between border-b border-gray-500 pb-3 gap-5">
          {/* sub heading */}
          <h2 className="text-md font-semibold">Filter by Price</h2>
          <MdCategory size={22} />
        </div>

        {/* Min Price Input */}
        <input
          type="text"
          placeholder="Min Price"
          className="border w-1/2 mx-auto border-gray-300 rounded-md p-2 h-8"
          value={minPrice}
          onChange={minPriceChangeHandler}
        />

        <h1 className="font-bold mx-auto text-lg">TO</h1>

        {/* Max Price Input */}
        <input
          type="text"
          placeholder="Max Price"
          className="border w-1/2 mx-auto border-gray-300 rounded-md p-2 h-8"
          value={maxPrice}
          onChange={maxPriceChangeHandler}
        />
      </div>
    </>
  );
};

export default PriceFilter;
