import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/Orders/ordersSlice.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader.jsx";

const Orders = () => {
  // initialize the dispatch function
  const dispatch = useDispatch();

  //   get the colors from redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  //   get the orders from redux store
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

      {/* Orders */}
      <div
        className="flex flex-col gap-5 p-4 my-5 text-center"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        {/* Main Heading */}
        <div className="flex justify-around my-3 font-semibold">
          <h1 className="text-4xl font-bold">My Orders</h1>
          <div>
            <label htmlFor="orderStatus">Order Status </label>
            <select
              name="orderStatus"
              id="orderStatus"
              className="rounded px-2 py-1"
              value={orderStatus}
              onChange={handleOrderStatusChange}
              disabled={isLoading}
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table Headings */}
        <div className="grid grid-cols-7 gap-5 items-center justify-center text-md font-bold">
          <div className="font-bold">Order</div>
          <div className="font-bold">Order ID</div>
          <div className="font-bold">Order Items</div>
          <div className="font-bold">Order Status</div>
          <div className="font-bold">Payment Status</div>
          <div className="font-bold">Payment Method</div>
          <div className="font-bold">Total</div>
        </div>

        {/* Orders Table */}
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Link to={`/orders/${order.id}`} key={order.id}>
              <div className="grid grid-cols-7 border gap-5 p-4 hover:cursor-pointer hover:bg-gray-500">
                <img
                  src={
                    order.orderItems[0]?.product?.images?.[0] ||
                    "/placeholder-image.jpg"
                  }
                  alt={order.orderItems[0]?.product?.name || "Order item"}
                  className="w-40"
                />
                <p
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    maxWidth: "100px",
                  }}
                >
                  {order.id}
                </p>
                <p>{order.totalItems}</p>
                <p>{order.orderStatus}</p>
                <p>{order.paymentStatus}</p>
                <p>{order.paymentMethod}</p>
                <p>${order.totalAmount}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-xl">No orders found</p>
            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {orders && orders.length > 0 && totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() =>
                dispatch(
                  getUserOrders({ currentPage: currentPage - 1, orderStatus })
                )
              }
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() =>
                dispatch(
                  getUserOrders({ currentPage: currentPage + 1, orderStatus })
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Orders;
