import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import {
  fetchWishlist,
  removeWishlistItem,
} from "../features/Wishlist/wishlistSlice";
import { addToCart } from "../features/Cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    wishlistProducts,
    loading = false,
    error = null,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromWishlist = (itemId) => {
    if (token) {
      dispatch(removeWishlistItem({ itemId, token }));
    } else {
      console.log("User is not authenticated");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
      <Header />

      <div className="ml-5 mt-3">
        <a href="/" className="text-gray-500 hover:underline">
          Home
        </a>{" "}
        &gt; <span>Wishlist</span>
      </div>

      <div className="wishlist-container m-4">
        <h1 className="text-3xl font-bold sm:text-5xl text-black text-center">
          YOUR WISHLIST
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2">Add items to your wishlist</p>
            <a
              href="/products"
              className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {wishlistProducts.map((item) => (
              <div
                key={item?.product?._id}
                className="border p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{item?.product?.name}</h2>
                <p className="text-gray-600">${item?.priceAtTime}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id || item.id)}
                  className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
