import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { FaTrash} from "react-icons/fa6";
import CartIcon from "../Components/Icons/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeWishlistItem,
} from "../features/Wishlist/wishlistSlice";
import { addToCart } from "../features/Cart/cartSlice";
import { useEffect, useState } from "react"; 

const Wishlist = () => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(null); // For success feedback

  // Fixed: Added fallback for undefined state
  const {
    items: wishlistItems = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.wishlist || {});

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);


  const handleAddToCart = async (item) => {
    try {
      await dispatch(addToCart(item));
      setAddedToCart(item.id);

      setTimeout(() => setAddedToCart(null), 2000);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await dispatch(removeWishlistItem(itemId));
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  // Fixed: Add loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading wishlist...</div>
        </div>
        <Footer />
      </>
    );
  }

  // Fixed: Add error state
  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Breadcrumbs */}
      <div className="ml-5 mt-3">
        <a href="/" className="text-500 hover:underline">
          Home
        </a>{" "}
        &gt; <span>Wishlist</span>
      </div>

      {/* Wishlist Heading */}
      <div className="wishlist-container m-4">
        <h1 className="text-3xl font-bold sm:text-5xl text-black text-center">
          YOUR WISHLIST
        </h1>

        {/* Fixed: Added null check for wishlistItems */}
        {wishlistItems.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2">Add items to your wishlist</p>
            <a
              href="/products"
              className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:cursor-pointer transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="wishlist-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="wishlist-item border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold">
                  {item.name || "Unnamed Product"}
                </h3>
                <p className="text-gray-600 mt-2">${item.price}</p>

                {/* Fixed: Better button layout with proper icons */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={addedToCart === item.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                      addedToCart === item.id
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    <CartIcon />
                    {addedToCart === item.id ? "Added!" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 px-2 py-2 transition-colors"
                  >
                    <FaTrash />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}


export default Wishlist;
