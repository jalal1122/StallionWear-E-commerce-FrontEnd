import Footer from "../Components/Footer";
import Header from "../Components/Header/Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaGlobe,
  FaCreditCard,
  FaShoppingBag,
  FaTruck,
  FaTag,
  FaDollarSign,
  FaStickyNote,
  FaPrint,
  FaDownload,
} from "react-icons/fa";

const OrderDetails = () => {
  // get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  //   get the order details from the redux store
  const {
    shippingAddress,
    paymentMethod,
    shippingCharge,
    totalAmount,
    finalAmount,
    discount,
    notes,
  } = useSelector((state) => state.order);

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  return (
    <>
      <Header />
      <div
      className="my-5"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
          minHeight: "100vh",
        }}
      >
        {/* Header Component */}

        {/* Order Details  */}
        <div className="px-4 py-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div
                className="p-3 rounded-full mr-4"
                style={{
                  backgroundColor: isDarkMode ? "#10b981" : "#10b981",
                  color: "#ffffff",
                }}
              >
                <FaCheckCircle size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Order Confirmed!
                </h1>
                <p className="text-lg mt-2 opacity-80">
                  Thank you for your purchase
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Information Card */}
            <div
              className="p-6 rounded-2xl shadow-lg"
              style={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
              }}
            >
              <div className="flex items-center mb-6">
                <div
                  className="p-2 rounded-lg mr-3"
                  style={{
                    backgroundColor: isDarkMode ? "#3b82f6" : "#3b82f6",
                    color: "#ffffff",
                  }}
                >
                  <FaTruck size={20} />
                </div>
                <h2 className="text-2xl font-bold">Shipping Information</h2>
              </div>

              {shippingAddress ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUser className="mr-3 opacity-70" size={16} />
                    <div>
                      <p className="text-sm opacity-70">Full Name</p>
                      <p className="font-semibold">
                        {shippingAddress.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaEnvelope className="mr-3 opacity-70" size={16} />
                    <div>
                      <p className="text-sm opacity-70">Email</p>
                      <p className="font-semibold">{shippingAddress.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaPhone className="mr-3 opacity-70" size={16} />
                    <div>
                      <p className="text-sm opacity-70">Phone</p>
                      <p className="font-semibold">{shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaHome className="mr-3 opacity-70 mt-1" size={16} />
                    <div>
                      <p className="text-sm opacity-70">Address</p>
                      <p className="font-semibold break-words">
                        {shippingAddress.address}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaCity className="mr-2 opacity-70" size={14} />
                      <div>
                        <p className="text-xs opacity-70">City</p>
                        <p className="font-medium text-sm">
                          {shippingAddress.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 opacity-70" size={14} />
                      <div>
                        <p className="text-xs opacity-70">Postal Code</p>
                        <p className="font-medium text-sm">
                          {shippingAddress.postalCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaGlobe className="mr-3 opacity-70" size={16} />
                    <div>
                      <p className="text-sm opacity-70">Country</p>
                      <p className="font-semibold">{shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="opacity-50">
                    No shipping information available
                  </p>
                </div>
              )}
            </div>

            {/* Payment & Order Summary */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Method Card */}
              <div
                className="p-6 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="p-2 rounded-lg mr-3"
                    style={{
                      backgroundColor: isDarkMode ? "#10b981" : "#10b981",
                      color: "#ffffff",
                    }}
                  >
                    <FaCreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>
                <p className="text-lg font-semibold">
                  {paymentMethod || "Cash on Delivery"}
                </p>
              </div>

              {/* Order Summary Card */}
              <div
                className="p-6 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className="p-2 rounded-lg mr-3"
                    style={{
                      backgroundColor: isDarkMode ? "#f59e0b" : "#f59e0b",
                      color: "#ffffff",
                    }}
                  >
                    <FaShoppingBag size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>

                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between py-2 border-b border-opacity-20"
                    style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
                  >
                    <div className="flex items-center">
                      <FaDollarSign className="mr-2 opacity-70" size={14} />
                      <span>Total Amount</span>
                    </div>
                    <span className="font-semibold">${totalAmount}</span>
                  </div>

                  <div
                    className="flex items-center justify-between py-2 border-b border-opacity-20"
                    style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
                  >
                    <div className="flex items-center">
                      <FaTruck className="mr-2 opacity-70" size={14} />
                      <span>Shipping Charge</span>
                    </div>
                    <span className="font-semibold">${shippingCharge}</span>
                  </div>

                  {discount > 0 && (
                    <div
                      className="flex items-center justify-between py-2 border-b border-opacity-20"
                      style={{
                        borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                      }}
                    >
                      <div className="flex items-center">
                        <FaTag className="mr-2 text-green-500" size={14} />
                        <span>Discount</span>
                      </div>
                      <span className="font-semibold text-green-500">
                        -${discount}
                      </span>
                    </div>
                  )}

                  <div
                    className="flex items-center justify-between py-4 text-xl font-bold rounded-lg px-4"
                    style={{
                      backgroundColor: isDarkMode ? "#374151" : "#f9fafb",
                    }}
                  >
                    <span>Final Amount</span>
                    <span>${finalAmount}</span>
                  </div>

                  {notes && (
                    <div
                      className="mt-4 p-4 rounded-lg"
                      style={{
                        backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                      }}
                    >
                      <div className="flex items-start">
                        <FaStickyNote
                          className="mr-2 mt-1 opacity-70"
                          size={14}
                        />
                        <div>
                          <p className="text-sm opacity-70 mb-1">Order Notes</p>
                          <p className="text-sm">{notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <button
              className="flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
              }}
            >
              <FaPrint className="mr-2" size={16} />
              Print Order
            </button>

            <button
              className="flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
              }}
            >
              <FaDownload className="mr-2" size={16} />
              Download Invoice
            </button>

            <Link
              to="/"
              className="flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Footer Component */}
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
