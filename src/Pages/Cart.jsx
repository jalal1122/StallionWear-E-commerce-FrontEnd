import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import {
  FaTrash,
  FaShoppingBag,
  FaMinus,
  FaPlus,
  FaTruck,
  FaTag,
  FaCreditCard,
} from "react-icons/fa";
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
import Loader from "../Components/Loader";

const Cart = () => {
  const dispatch = useDispatch();

  // Get colors from Redux store
  const colors = useSelector((state) => state.colors?.colors || {});

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
    dispatch(fetchCartItems());
  };
  const handleIncrement = (productId, size, color) => {
    dispatch(incrementCartItems({ productId, size, color }));
    dispatch(fetchCartItems());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          className="flex justify-center items-center min-h-screen"
          style={{ backgroundColor: colors?.primaryBg }}
        >
          <Loader />
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
          className="flex flex-col items-center justify-center min-h-screen"
          style={{ backgroundColor: colors?.primaryBg }}
        >
          <div
            className="text-center p-8 rounded-lg shadow-md max-w-md mx-auto"
            style={{
              backgroundColor:
                colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
              borderColor: colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
            }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Cart
            </h2>
            <p className="mb-6" style={{ color: colors?.primaryText }}>
              {typeof error === "string" ? error : "Failed to load cart"}
            </p>
            <button
              onClick={() => dispatch(fetchCartItems())}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div
        className="min-h-screen py-8 px-4 transition-colors duration-200"
        style={{ backgroundColor: colors?.primaryBg }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/"
                className="hover:underline transition-colors duration-200"
                style={{
                  color:
                    colors?.secondaryText ||
                    (colors?.primaryText === "#fff" ? "#9ca3af" : "#6b7280"),
                }}
              >
                Home
              </Link>
              <span
                style={{
                  color:
                    colors?.secondaryText ||
                    (colors?.primaryText === "#fff" ? "#9ca3af" : "#6b7280"),
                }}
              >
                /
              </span>
              <span style={{ color: colors?.primaryText }}>Shopping Cart</span>
            </div>
          </nav>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaShoppingBag className="text-4xl text-blue-600" />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ color: colors?.primaryText }}
              >
                Shopping Cart
              </h1>
            </div>
            <p
              style={{
                color:
                  colors?.secondaryText ||
                  (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
              }}
            >
              {items.length === 0
                ? "Your cart is empty"
                : `${cartSummary.totalItems} item${
                    cartSummary.totalItems !== 1 ? "s" : ""
                  } in your cart`}
            </p>
          </div>

          {/* Empty State */}
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <FaShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: colors?.primaryText }}
                >
                  Your cart is empty
                </h3>
                <p
                  className="mb-8"
                  style={{
                    color:
                      colors?.secondaryText ||
                      (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
                  }}
                >
                  Browse our products and add items to your cart
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white 
                           rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            /* Cart Content */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Clear Cart Button */}
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className="text-2xl font-semibold"
                    style={{ color: colors?.primaryText }}
                  >
                    Cart Items ({cartSummary.totalItems})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 
                             rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                  >
                    <FaTrash className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
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
                        className="rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#1f2937"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#e5e7eb",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={itemImage}
                              alt={itemName}
                              className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg border"
                              style={{
                                borderColor:
                                  colors?.primaryBg === "#000"
                                    ? "#6b7280"
                                    : "#e5e7eb",
                              }}
                              onError={(e) => {
                                e.target.src = "/Images/J12.jpg";
                              }}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3
                                className="text-xl font-semibold mb-2"
                                style={{ color: colors?.primaryText }}
                              >
                                {itemName}
                              </h3>
                              {item.size && (
                                <p
                                  className="text-sm"
                                  style={{
                                    color:
                                      colors?.secondaryText ||
                                      (colors?.primaryText === "#fff"
                                        ? "#9ca3af"
                                        : "#6b7280"),
                                  }}
                                >
                                  Size: {item.size}
                                </p>
                              )}
                              {item.color && (
                                <p
                                  className="text-sm"
                                  style={{
                                    color:
                                      colors?.secondaryText ||
                                      (colors?.primaryText === "#fff"
                                        ? "#9ca3af"
                                        : "#6b7280"),
                                  }}
                                >
                                  Color: {item.color}
                                </p>
                              )}
                            </div>

                            {/* Price and Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              {/* Price */}
                              <div>
                                <p className="text-2xl font-bold text-blue-600">
                                  ${(itemPrice * itemQuantity).toFixed(2)}
                                </p>
                                <p
                                  className="text-sm"
                                  style={{
                                    color:
                                      colors?.secondaryText ||
                                      (colors?.primaryText === "#fff"
                                        ? "#9ca3af"
                                        : "#6b7280"),
                                  }}
                                >
                                  ${itemPrice.toFixed(2)} each
                                </p>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-4">
                                <div
                                  className="flex items-center border rounded-lg"
                                  style={{
                                    borderColor:
                                      colors?.primaryBg === "#000"
                                        ? "#6b7280"
                                        : "#d1d5db",
                                  }}
                                >
                                  <button
                                    onClick={() =>
                                      handleDecrement(
                                        item.product._id,
                                        item.size,
                                        item.color
                                      )
                                    }
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors duration-200"
                                  >
                                    <FaMinus
                                      className="w-3 h-3"
                                      style={{ color: colors?.primaryText }}
                                    />
                                  </button>
                                  <span
                                    className="px-4 py-2 font-semibold min-w-[50px] text-center"
                                    style={{ color: colors?.primaryText }}
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
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors duration-200"
                                  >
                                    <FaPlus
                                      className="w-3 h-3"
                                      style={{ color: colors?.primaryText }}
                                    />
                                  </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                  onClick={() => handleRemoveFromCart(item)}
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                                  title="Remove from cart"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div
                    className="rounded-xl shadow-lg border p-6"
                    style={{
                      backgroundColor:
                        colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
                      borderColor:
                        colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                    }}
                  >
                    <h3
                      className="text-2xl font-bold mb-6 text-center"
                      style={{ color: colors?.primaryText }}
                    >
                      Order Summary
                    </h3>

                    <div className="space-y-4">
                      {/* Subtotal */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FaShoppingBag
                            className="w-4 h-4"
                            style={{
                              color:
                                colors?.secondaryText ||
                                (colors?.primaryText === "#fff"
                                  ? "#9ca3af"
                                  : "#6b7280"),
                            }}
                          />
                          <span style={{ color: colors?.primaryText }}>
                            Subtotal ({cartSummary.totalItems} items)
                          </span>
                        </div>
                        <span
                          className="font-semibold text-lg"
                          style={{ color: colors?.primaryText }}
                        >
                          ${cartSummary.totalAmount?.toFixed(2)}
                        </span>
                      </div>

                      {/* Discount */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FaTag className="w-4 h-4 text-green-500" />
                          <span style={{ color: colors?.primaryText }}>
                            Discount
                          </span>
                        </div>
                        <span className="font-semibold text-green-600">
                          -$0.00
                        </span>
                      </div>

                      {/* Shipping */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FaTruck
                            className="w-4 h-4"
                            style={{
                              color:
                                colors?.secondaryText ||
                                (colors?.primaryText === "#fff"
                                  ? "#9ca3af"
                                  : "#6b7280"),
                            }}
                          />
                          <span style={{ color: colors?.primaryText }}>
                            Shipping
                          </span>
                        </div>
                        <span
                          className="font-semibold"
                          style={{ color: colors?.primaryText }}
                        >
                          $10.00
                        </span>
                      </div>

                      {/* Divider */}
                      <div
                        className="border-t pt-4"
                        style={{
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#e5e7eb",
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FaCreditCard className="w-5 h-5 text-blue-600" />
                            <span
                              className="text-xl font-bold"
                              style={{ color: colors?.primaryText }}
                            >
                              Total
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-blue-600">
                            ${(cartSummary.totalAmount + 10).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link to="/checkout" className="block mt-6">
                      <button
                        className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg 
                                       hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg
                                       flex items-center justify-center gap-2"
                      >
                        <FaCreditCard className="w-5 h-5" />
                        Proceed to Checkout
                      </button>
                    </Link>

                    {/* Continue Shopping Link */}
                    <Link
                      to="/"
                      className="block text-center mt-4 text-blue-600 hover:text-blue-700 
                               transition-colors duration-200 font-medium"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
