import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  clearCart,
  decrementCartItems,
  incrementCartItems,
} from "../features/Cart/cartSlice.js";
import { useEffect } from "react";
import { Link } from "react-router";

const Cart = () => {
  const dispatch = useDispatch();

  // Add fallback colors for first render
  const { primaryBg = "#fff", primaryText = "#222" } = useSelector(
    (state) => state.colors?.colors || {}
  );

  const {
    items = [],
    cartSummary = { totalItems: 0, totalAmount: 0 },
    loading = false,
    error = null,
  } = useSelector((state) => state.cart || {});

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveFromCart = (item) => {
    dispatch(
      removeFromCart({
        productId: item.product._id,
        size: item.size,
        color: item.color,
      })
    );
  };

  const handleDecrement = (productId, size, color) => {
    dispatch(decrementCartItems({ productId, size, color }));
  };
  const handleIncrement = (productId, size, color) => {
    dispatch(incrementCartItems({ productId, size, color }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          className="text-center mt-10"
          style={{ backgroundColor: primaryBg, color: primaryText }}
        >
          Loading cart...
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
          Error: {typeof error === "string" ? error : "Failed to load cart"}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div className="ml-5 mt-3" style={{ color: primaryText }}>
        <a href="/" className="hover:underline" style={{ color: primaryText }}>
          Home
        </a>
        &gt;
        <span className="ml-2" style={{ color: primaryText }}>
          Cart
        </span>
      </div>

      <div
        className="cart-container p-1"
        style={{ backgroundColor: primaryBg, color: primaryText }}
      >
        <h1
          className="text-3xl font-bold sm:text-5xl text-center"
          style={{ color: primaryText }}
        >
          YOUR CART
        </h1>

        {items.length === 0 ? (
          <div className="text-center mt-10" style={{ color: primaryText }}>
            <h2 className="text-2xl font-semibold bg-black text-white p-4">
              Your cart is empty
            </h2>
            <p className="mt-4" style={{ color: primaryText }}>
              Browse our products and add items to your cart.
            </p>
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
          <div className="flex flex-col lg:flex-row items-center lg:items-start w-[95%] mx-auto mt-10">
            {/* Cart Items */}
            <div
              className="flex flex-col justify-center items-center gap-5 px-5 py-2 lg:w-2/3 rounded-lg"
              style={{
                backgroundColor: primaryBg,
                color: primaryText,
              }}
            >
              <div>
                {items.map((item) => {
                  const itemId = item?.product?._id || item?._id || item?.id;
                  const itemName =
                    item?.product?.name || item?.name || "Unnamed Product";
                  const itemPrice = item?.product?.price || item?.price || 0;
                  const itemImage =
                    item?.product?.images?.[0] ||
                    item?.image ||
                    "/Images/J12.jpg";
                  const itemQuantity = item?.quantity || 1;

                  return (
                    <div
                      key={itemId}
                      className="flex flex-col sm:flex-row items-center justify-center w-full gap-10 px-10 py-5 rounded-lg shadow-md border-2"
                      style={{
                        backgroundColor: primaryText,
                        color: primaryBg,
                      }}
                    >
                      {/* Product Image */}
                      <div className="flex items-center justify-center w-fit h-fit p-2 rounded-lg shadow-lg">
                        <img
                          src={itemImage}
                          alt={itemName}
                          className="w-60 rounded-lg"
                          onError={(e) => {
                            e.target.src = "/Images/J12.jpg";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col gap-5 justify-center w-full">
                        <div className="flex flex-col gap-3">
                          <h2 className="text-2xl font-bold">{itemName}</h2>
                          <p className="text-lg font-semibold">
                            Size : {item.size}
                          </p>
                        </div>

                        <div className="flex gap-3 items-center justify-between" >
                          {/* Item Total */}
                          <h2 className="text-2xl font-bold">
                            ${(itemPrice * itemQuantity).toFixed(2)}
                          </h2>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between gap-5 px-3 py-1 rounded-full bg-[#f0f0f0]" style={{
                                color: primaryText,
                                backgroundColor: primaryBg,
                              }}>
                            <button
                              onClick={() =>
                                handleDecrement(
                                  item.product._id,
                                  item.size,
                                  item.color
                                )
                              }
                              className="hover:cursor-pointer text-xl sm:text-2xl rounded-full hover:bg-gray-300 hover:scale-95"
                              style={{
                                color: primaryText,
                                backgroundColor: primaryBg,
                              }}
                            >
                              -
                            </button>
                            <span
                              className="font-bold text-md sm:text-lg px-3"
                              style={{
                                color: primaryText,
                                backgroundColor: primaryBg,
                              }}
                            >
                              {itemQuantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(
                                  item.product._id,
                                  item.size,
                                  item.color
                                )
                              }
                              className="hover:cursor-pointer text-xl sm:text-2xl rounded-full hover:bg-gray-300 hover:scale-95"
                              style={{
                                color: primaryText,
                                backgroundColor: primaryBg,
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => handleRemoveFromCart(item)}
                            className="flex justify-center items-center w-3/4 px-4 py-2 mt-2 rounded-full hover:cursor-pointer hover:bg-red-600 hover:scale-105"
                            style={{
                              backgroundColor: primaryBg,
                              color: primaryText,
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6">
                <button
                  onClick={handleClearCart}
                  className="px-8 py-2 text-lg rounded-full hover:cursor-pointer transition-colors hover:scale-105"
                  style={{
                    backgroundColor: primaryText,
                    color: primaryBg,
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div
              className="flex flex-col items-center justify-center gap-5 p-5 w-full md:w-1/3 rounded-lg m-2 sticky top-0"
              style={{
                backgroundColor: primaryBg,
                color: primaryText,
              }}
            >
              <h3
                className="text-3xl font-bold px-5 py-2"
                style={{ backgroundColor: primaryText, color: primaryBg }}
              >
                Order Summary
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center w-2/3 gap-5 lg:w-full">
                  <p>SubTotal ({cartSummary.totalItems}):</p>
                  <p className="font-bold text-lg">
                    ${cartSummary.totalAmount}
                  </p>
                </div>
                <div className="flex justify-between items-center w-2/3 gap-5 lg:w-full">
                  <p>Discount:</p>
                  <p className="font-bold text-lg text-red-600">${0}</p>
                </div>
                <div className="flex justify-between items-center w-2/3 gap-5 lg:w-full">
                  <p>Shipping Fee:</p>
                  <p className="font-bold text-lg">${10}</p>
                </div>
                <div className="w-full h-[1px] border-t py-2"></div>
                <div className="flex justify-between items-center w-2/3 gap-5 lg:w-full">
                  <p className="font-bold text-lg">Total:</p>
                  <p className="font-bold text-xl">
                    ${cartSummary.totalAmount + 10}
                  </p>
                </div>
              </div>
              <Link to="/checkout">
                <button className="w-full mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 hover:cursor-pointer transition-colors">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
