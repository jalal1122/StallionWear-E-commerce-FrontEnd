import { useDispatch, useSelector } from "react-redux";
import { getNewArrivals } from "../../features/Products/productSlice.js";
import { useEffect } from "react";

const NewArrivals = () => {
  // initialize this dispatch
  const dispatch = useDispatch();

  const { newArrivals, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);

    return (
      <div className="flex items-center">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-400">
            ⭐
          </span>
        ))}

        <span className="ml-2 text-sm text-gray-600">
          ({rating.toFixed(0)})
        </span>
      </div>
    );
  };

  useEffect(() => {
    // Fetch new arrivals when the component mounts
    dispatch(getNewArrivals());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center mt-10">
        <h2 className="text-6xl font-bold mb-8">New Arrivals</h2>
        <div className="newArrivals">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">{message}</p>}
          {!isLoading && !isError && newArrivals.length === 0 && (
            <p>No new arrivals found.</p>
          )}
          {!isLoading && !isError && newArrivals.length > 0 && (
            <div className="flex justify-center items-center text-center flex-wrap gap-10">
              {newArrivals.map((product) => (
                <div
                  key={product._id}
                  className="shadow-lg p-4 w-[20vw] rounded-2xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-gray-50 relative overflow-hidden group"
                >
                  {/* Image Container with Overlay */}
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={`${product.images[0]}`} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Sliding Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                      <div className="flex flex-col gap-3">
                        {/* Add to Cart Button */}
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100 delay-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add to cart:', product._id);
                            // Add your cart logic here
                          }}
                        >
                          🛒 Add to Cart
                        </button>
                        
                        {/* Add to Wishlist Button */}
                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100 delay-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add to wishlist:', product._id);
                            // Add your wishlist logic here
                          }}
                        >
                          ❤️ Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold mt-2 hover:text-blue-600 transition-colors duration-200">{product.name}</h3>

                  {/* rating */}
                  <div className="mt-2">
                    {product.reviews && product.reviews.averageRating ? (
                      renderStars(product.reviews.averageRating)
                    ) : (
                      <p className="text-gray-500">No ratings yet</p>
                    )}
                  </div>
                  
                  {/* Price */}
                  <p className="text-lg font-semibold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
