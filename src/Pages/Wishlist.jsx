import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import {
  fetchWishlist,
  removeWishlistItem,
  moveToCart,
} from "../features/Wishlist/wishlistSlice";
// import { useNavigate } from "react-router";

const Wishlist = () => {
  const dispatch = useDispatch();

  // Add fallback colors for first render
  const { primaryBg , primaryText } = useSelector(
    (state) => state.colors?.colors || {}
  );

  const {
    wishlistProducts = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.wishlist || {});

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(
      moveToCart({
        productId: item.product._id,
        size: item.variant.size,
        color: item.variant.color,
      })
    );
  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(
      removeWishlistItem({
        productId: item.product._id,
        size: item.variant.size,
        color: item.variant.color,
      })
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          className="text-center mt-10"
          style={{ backgroundColor: primaryBg, color: primaryText }}
        >
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div
          className="text-center mt-10 text-red-500"
          style={{ backgroundColor: primaryBg, color: primaryText }}
        >
          {error}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="ml-5 mt-3" style={{ color: primaryText }}>
        <a
          href="/"
          className="text-gray-500 hover:underline"
          style={{ color: primaryText }}
        >
          Home
        </a>{" "}
        &gt; <span>Wishlist</span>
      </div>

      <div
        className="wishlist-container p-2"
        style={{ backgroundColor: primaryBg, color: primaryText }}
      >
        <h1
          className="text-3xl font-bold sm:text-5xl text-center"
          style={{ color: primaryText }}
        >
          YOUR WISHLIST
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center mt-10" style={{ color: primaryText }}>
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2">Add items to your wishlist</p>
            <a
              href="/products"
              className="mt-4 inline-block px-6 py-2 rounded transition-colors"
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-10 mt-5">
            {wishlistProducts.map((item) => (
              <div
                key={item?.product?._id}
                className="flex border p-4 rounded-lg shadow-md w-2/4 "
                style={{
                  backgroundColor: primaryBg,
                  color: primaryText,
                  borderColor: "#f0f0f0",
                }}
              >
                <div className="flex items-center justify-center w-2/4 h-fit p-2 rounded-lg shadow-lg">
                  <img
                  src={item?.product?.images[0]}
                  alt={item?.product?.name}
                  className="w-[200px] h-auto object-cover rounded-md"
                  style={{ backgroundColor: primaryBg }}
                />
                </div>

                <div className="flex flex-col gap-5 mx-3 justify-center w-full">                  
                <h2
                   className="text-2xl font-bold"
                  style={{ color: primaryText }}
                >
                  {item?.product?.name}
                </h2>
                <p
                  className="text-black font-semibold text-xl"
                  style={{ color: primaryText }}
                >{`$${item?.priceAtTime}`}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center justify-center mt-3 w-full rounded-full px-4 py-2 hover:scale-105 hover:cursor-pointer transition-colors"
                  style={{
                    backgroundColor: primaryText,
                    color: primaryBg,
                  }}
                >
                  <FaShoppingCart className="mx-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item)}
                  className="flex items-center justify-center mt-2 w-full px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer transition-colors"
                  style={{
                    backgroundColor: primaryText,
                    color: primaryBg,
                  }}
                >
                  <FaTrash />
                </button>
                </div>

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
