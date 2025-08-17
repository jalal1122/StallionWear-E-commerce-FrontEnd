import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/Orders/ordersSlice.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import {
  FaCalendarAlt,
  FaEye,
  FaFilter,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCog,
} from "react-icons/fa";

const Orders = () => {
  // initialize the dispatch function
  const dispatch = useDispatch();

  // Redux state selectors
  const colors = useSelector((state) => state.colors.colors);

  const { orders, totalPages, currentPage, isLoading, isError, errorMessage } =
    useSelector((state) => state.orders);

  //   state for order Status
  const [orderStatus, setOrderStatus] = useState("");

  const handleOrderStatusChange = (e) => {
    const selectedValue = e.target.value;
    setOrderStatus(selectedValue);

    // Dispatch with the new value directly, not the stale state
    if (selectedValue === "") {
      dispatch(getUserOrders());
    } else {
      dispatch(getUserOrders({ currentPage: 1, orderStatus: selectedValue }));
    }
  };

  // Fetch user orders on component mount
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          color: "text-yellow-600 bg-yellow-100 border-yellow-200",
          icon: <FaClock className="w-4 h-4" />,
          darkColor:
            "dark:text-yellow-400 dark:bg-yellow-900 dark:border-yellow-700",
        };
      case "processing":
        return {
          color: "text-blue-600 bg-blue-100 border-blue-200",
          icon: <FaCog className="w-4 h-4" />,
          darkColor: "dark:text-blue-400 dark:bg-blue-900 dark:border-blue-700",
        };
      case "confirmed":
        return {
          color: "text-green-600 bg-green-100 border-green-200",
          icon: <FaCheckCircle className="w-4 h-4" />,
          darkColor:
            "dark:text-green-400 dark:bg-green-900 dark:border-green-700",
        };
      case "shipped":
        return {
          color: "text-purple-600 bg-purple-100 border-purple-200",
          icon: <FaTruck className="w-4 h-4" />,
          darkColor:
            "dark:text-purple-400 dark:bg-purple-900 dark:border-purple-700",
        };
      case "delivered":
        return {
          color: "text-green-700 bg-green-200 border-green-300",
          icon: <FaBox className="w-4 h-4" />,
          darkColor:
            "dark:text-green-300 dark:bg-green-800 dark:border-green-600",
        };
      case "cancelled":
        return {
          color: "text-red-600 bg-red-100 border-red-200",
          icon: <FaTimesCircle className="w-4 h-4" />,
          darkColor: "dark:text-red-400 dark:bg-red-900 dark:border-red-700",
        };
      default:
        return {
          color: "text-gray-600 bg-gray-100 border-gray-200",
          icon: <FaClock className="w-4 h-4" />,
          darkColor: "dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600",
        };
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Orders
          </h2>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <button
            onClick={() => dispatch(getUserOrders())}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header Component */}
      <Header />

      <div
        className="min-h-screen py-8 px-4 transition-colors duration-200 my-5"
        style={{ backgroundColor: colors?.primaryBg }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: colors?.primaryText }}
            >
              My Orders
            </h1>
            <p
              style={{
                color:
                  colors?.secondaryText ||
                  (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
              }}
            >
              Track and manage your orders
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FaFilter style={{ color: colors?.primaryText }} />
              <span
                className="text-sm font-medium"
                style={{ color: colors?.primaryText }}
              >
                Filter by:
              </span>
            </div>
            <select
              name="orderStatus"
              id="orderStatus"
              value={orderStatus}
              onChange={handleOrderStatusChange}
              disabled={isLoading}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              style={{
                backgroundColor:
                  colors?.primaryBg === "#000" ? "#374151" : "#ffffff",
                borderColor:
                  colors?.primaryBg === "#000" ? "#6b7280" : "#d1d5db",
                color: colors?.primaryText,
              }}
            >
              <option value="">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Empty State */}
          {!isLoading && !isError && (!orders || orders.length === 0) && (
            <div className="text-center py-12">
              <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: colors?.primaryText }}
              >
                No Orders Found
              </h3>
              <p
                style={{
                  color:
                    colors?.secondaryText ||
                    (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
                }}
              >
                You haven't placed any orders yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white 
                         rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {/* Orders List */}
          {!isLoading && !isError && orders && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.orderStatus);
                const totalItems =
                  order.orderItems?.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  ) || 0;

                return (
                  <div
                    key={order._id || order.id}
                    className="rounded-lg shadow-md border p-6 hover:shadow-lg transition-shadow duration-200"
                    style={{
                      backgroundColor:
                        colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
                      borderColor:
                        colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                    }}
                  >
                    {/* Order Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 lg:mb-0">
                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: colors?.primaryText }}
                          >
                            Order ID
                          </p>
                          <p
                            className="text-xs font-mono"
                            style={{
                              color:
                                colors?.secondaryText ||
                                (colors?.primaryText === "#fff"
                                  ? "#9ca3af"
                                  : "#6b7280"),
                            }}
                          >
                            #{(order._id || order.id)?.toString().slice(-8)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt
                            className="w-4 h-4"
                            style={{
                              color:
                                colors?.secondaryText ||
                                (colors?.primaryText === "#fff"
                                  ? "#9ca3af"
                                  : "#6b7280"),
                            }}
                          />
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{ color: colors?.primaryText }}
                            >
                              Order Date
                            </p>
                            <p
                              className="text-xs"
                              style={{
                                color:
                                  colors?.secondaryText ||
                                  (colors?.primaryText === "#fff"
                                    ? "#9ca3af"
                                    : "#6b7280"),
                              }}
                            >
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full 
                                         text-xs font-medium border ${statusInfo.color} ${statusInfo.darkColor}`}
                        >
                          {statusInfo.icon}
                          {order.orderStatus || "Pending"}
                        </span>
                        <Link
                          to={`/orders/${order._id || order.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
                                   rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                        >
                          <FaEye className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Order Image & Summary */}
                    <div
                      className="border-t pt-4"
                      style={{
                        borderColor:
                          colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        {order.orderItems && order.orderItems[0] && (
                          <div className="flex-shrink-0">
                            <img
                              src={
                                order.orderItems[0]?.product?.images?.[0] ||
                                "/placeholder-image.jpg"
                              }
                              alt={
                                order.orderItems[0]?.product?.name ||
                                "Order item"
                              }
                              className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg border"
                              style={{
                                borderColor:
                                  colors?.primaryBg === "#000"
                                    ? "#6b7280"
                                    : "#e5e7eb",
                              }}
                            />
                          </div>
                        )}

                        {/* Order Details Grid */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <p
                              className="text-sm font-medium mb-1"
                              style={{ color: colors?.primaryText }}
                            >
                              Items
                            </p>
                            <p
                              style={{
                                color:
                                  colors?.secondaryText ||
                                  (colors?.primaryText === "#fff"
                                    ? "#d1d5db"
                                    : "#6b7280"),
                              }}
                            >
                              {totalItems ||
                                order.totalItems ||
                                order.orderItems?.length ||
                                0}{" "}
                              item
                              {(totalItems ||
                                order.totalItems ||
                                order.orderItems?.length ||
                                0) !== 1
                                ? "s"
                                : ""}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium mb-1"
                              style={{ color: colors?.primaryText }}
                            >
                              Total Amount
                            </p>
                            <p
                              className="text-lg font-bold"
                              style={{ color: colors?.primaryText }}
                            >
                              $
                              {(
                                order.totalPrice ||
                                order.totalAmount ||
                                0
                              ).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium mb-1"
                              style={{ color: colors?.primaryText }}
                            >
                              Payment
                            </p>
                            <p
                              className="text-sm"
                              style={{
                                color:
                                  colors?.secondaryText ||
                                  (colors?.primaryText === "#fff"
                                    ? "#d1d5db"
                                    : "#6b7280"),
                              }}
                            >
                              {order.paymentMethod || "N/A"}
                            </p>
                            <p
                              className={`text-xs ${
                                order.paymentStatus === "paid"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {order.paymentStatus || "Pending"}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium mb-1"
                              style={{ color: colors?.primaryText }}
                            >
                              Status
                            </p>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full 
                                             text-xs font-medium ${statusInfo.color} ${statusInfo.darkColor}`}
                            >
                              {statusInfo.icon}
                              {order.orderStatus || "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      {order.shippingAddress && (
                        <div
                          className="mt-4 pt-4 border-t"
                          style={{
                            borderColor:
                              colors?.primaryBg === "#000"
                                ? "#374151"
                                : "#e5e7eb",
                          }}
                        >
                          <p
                            className="text-sm font-medium mb-2"
                            style={{ color: colors?.primaryText }}
                          >
                            Shipping Address
                          </p>
                          <p
                            className="text-sm"
                            style={{
                              color:
                                colors?.secondaryText ||
                                (colors?.primaryText === "#fff"
                                  ? "#d1d5db"
                                  : "#6b7280"),
                            }}
                          >
                            {order.shippingAddress.address1}
                            {order.shippingAddress.address2 &&
                              `, ${order.shippingAddress.address2}`}
                            <br />
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.postalCode}
                            <br />
                            {order.shippingAddress.country}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {orders && orders.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() =>
                  dispatch(
                    getUserOrders({ currentPage: currentPage - 1, orderStatus })
                  )
                }
                disabled={currentPage <= 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${
                             currentPage <= 1
                               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                               : "bg-blue-600 text-white hover:bg-blue-700"
                           }`}
              >
                Previous
              </button>
              <span
                className="px-4 py-2 font-medium"
                style={{ color: colors?.primaryText }}
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    getUserOrders({ currentPage: currentPage + 1, orderStatus })
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${
                             currentPage === totalPages
                               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                               : "bg-blue-600 text-white hover:bg-blue-700"
                           }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Orders;
