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

const Cart = () => {
  const dispatch = useDispatch();

  // Fixed: Added default array and get all needed values
  const {
    items = [], // Fixed: Added default empty array
    cartSummary = [], // Fixed: Added default empty array
    loading = false,
    error = null,
  } = useSelector((state) => state.cart || {});

  // Fixed: Calculate missing values
  // const shippingFee = totalPrice > 100 ? 0 : 10;
  // const finalTotal = totalPrice + shippingFee;

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleDecrement = (productId, size, color) => {
    dispatch(
      decrementCartItems({ productId, size, color })
    );
  };
  const handleIncrement = (productId, size, color) => {
    console.log(productId, size, color)
    dispatch(
      incrementCartItems({ productId, size, color})
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-10">Loading cart...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center mt-10 text-red-500">
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
      <div className="ml-5 mt-3">
        <a href="/" className="text-gray-500 hover:underline">
          Home
        </a>
        &gt;
        <span className="ml-2">Cart</span>
      </div>

      <div className="cart-container m-4">
        <h1 className="text-3xl font-bold sm:text-5xl text-black text-center">
          YOUR CART
        </h1>

        {items.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-4 text-gray-600">
              Browse our products and add items to your cart.
            </p>
            <a
              href="/products"
              className="mt-4 inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto mt-10">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="space-y-4">
                {items.map((item) => {
                  // Fixed: Determine correct item ID and properties
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
                      className="flex items-center justify-between border-b pb-4"
                    >
                      {/* Product Info */}
                      <div className="flex items-center flex-1">
                        <img
                          src={itemImage}
                          alt={itemName}
                          className="w-20 h-20 object-cover rounded mr-4"
                          onError={(e) => {
                            e.target.src = "/Images/J12.jpg";
                          }}
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{itemName}</h3>
                          <p className="text-gray-600">${itemPrice}</p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center mx-4">
                        <button
                          onClick={() =>
                            handleDecrement(
                              item.product._id,
                              item.size,
                              item.color,
                              
                            )
                          }
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          // disabled={item.quantity < 1}
                        >
                          -
                        </button>
                        <span className="mx-3 min-w-[2rem] text-center">
                          {itemQuantity}
                        </span>
                        <button
                          onClick={() =>
                            
                            handleIncrement(
                              item.product._id,
                              item.size,
                              item.color,
                              
                            )
                          }
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-lg font-semibold min-w-[4rem] text-center">
                        ${(itemPrice * itemQuantity).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFromCart(itemId)}
                        className="text-red-600 hover:text-red-800 ml-4 p-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6">
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-80">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({cartSummary.totalItems}):</span>
                    <span>${cartSummary.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${10}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${cartSummary.totalAmount + 10}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
