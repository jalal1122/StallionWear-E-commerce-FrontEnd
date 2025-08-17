import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { getOrderbyId, cancelOrder } from "../features/Orders/ordersSlice.js";
import Loader from "../Components/Loader";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard,
  FaArrowLeft,
  FaChevronRight,
} from "react-icons/fa";

const UserOrderDetails = () => {
  // get the id from params
  const { id } = useParams();

  // initalize the dispatch function
  const dispatch = useDispatch();

  // initialize the navigate function
  const navigate = useNavigate();

  //   get the colors from redux store
  const { primaryBg } = useSelector((state) => state.colors.colors);

  //   get the order details from redux store
  const { orderbyId, isLoading, isError, errorMessage } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderbyId(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!orderbyId) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              No Order Details Available
            </h2>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-700 bg-green-200";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Order Details Container */}
      <div
        className="min-h-screen bg-gray-50 my-5"
        style={{ backgroundColor: primaryBg }}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Orders
            </button>
            <FaChevronRight className="text-gray-400" />
            <span className="text-gray-700">Order #{orderbyId?.id}</span>
          </nav>

          {/* Order Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Order Details
                </h1>
                <div className="space-y-1">
                  <p className="text-gray-600">Order ID: #{orderbyId?.id}</p>
                  {orderbyId?.createdAt && (
                    <p className="text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      Ordered on: {formatDate(orderbyId.createdAt)}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    orderbyId?.orderStatus
                  )}`}
                >
                  {orderbyId?.orderStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaCreditCard className="mr-3 text-blue-600" />
                  Order Items ({orderbyId?.orderItems?.length || 0})
                </h2>

                <div className="space-y-4">
                  {orderbyId?.orderItems?.map((item, index) => (
                    <div
                      key={item?.product?.id || index}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="md:w-32 md:h-32 flex-shrink-0">
                        <img
                          src={
                            item?.product?.images?.[0] ||
                            "/placeholder-image.jpg"
                          }
                          alt={item?.product?.name || "Product"}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {item?.product?.name || "Product Name"}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Quantity:</span>
                            <p className="text-lg font-semibold text-gray-800">
                              {item?.quantity || 0}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Unit Price:</span>
                            <p className="text-lg font-semibold text-green-600">
                              ${item?.price || "0.00"}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Total:</span>
                            <p className="text-lg font-semibold text-green-600">
                              $
                              {(
                                (item?.price || 0) * (item?.quantity || 0)
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Takes 1 column */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      $
                      {(
                        orderbyId?.totalAmount - orderbyId?.shippingCharge || 0
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold">
                      ${orderbyId?.shippingCharge || "0.00"}
                    </span>
                  </div>
                  {orderbyId?.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span className="font-semibold">
                        -${orderbyId?.discount || "0.00"}
                      </span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">
                      $
                      {orderbyId?.finalAmount ||
                        orderbyId?.totalAmount ||
                        "0.00"}
                    </span>
                  </div>
                </div>

                {orderbyId?.notes && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm">
                      <span className="font-medium">Notes:</span>{" "}
                      {orderbyId.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  Shipping Address
                </h2>

                {orderbyId?.shippingAddress ? (
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center">
                      <FaUser className="mr-3 text-gray-400 w-4" />
                      <span className="font-medium">
                        {orderbyId.shippingAddress.fullName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="mr-3 text-gray-400 w-4" />
                      <span>{orderbyId.user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="mr-3 text-gray-400 w-4" />
                      <span>{orderbyId.shippingAddress.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mr-3 text-gray-400 w-4 mt-1" />
                      <div>
                        <p className="break-words">
                          {orderbyId.shippingAddress.address}
                        </p>
                        <p>
                          {orderbyId.shippingAddress.city},{" "}
                          {orderbyId.shippingAddress.postalCode}
                        </p>
                        <p>{orderbyId.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No shipping address available</p>
                )}
              </div>

              {/* Cancel Order Button */}
              {["Pending", "Processing", "Confirmed"].includes(
                orderbyId?.orderStatus
              ) && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Order Actions
                  </h3>
                  <button
                    className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:cursor-pointer"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this order?"
                        )
                      ) {
                        dispatch(cancelOrder(orderbyId.id));
                        navigate("/orders");
                      }
                    }}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default UserOrderDetails;
