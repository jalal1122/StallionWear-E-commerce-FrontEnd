import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import CashOnDelivery from "../assets/cash-on-delivery.png";
import Paypal from "../assets/paypal.png";
import Stripe from "../assets/stripe.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../features/Order/orderSlice.js";
import { useNavigate, Link } from "react-router";
import {
  FaShieldAlt,
  FaCreditCard,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaGlobe,
  FaLock,
  FaCheck,
  FaShoppingBag,
} from "react-icons/fa";

const Checkout = () => {
  // get the colors from the redux store
  const colors = useSelector((state) => state.colors?.colors || {});

  // get the cart items selected
  const { items, cartSummary } = useSelector((state) => state.cart);

  // get the order data from the redux store
  const { isSuccess, error } = useSelector((state) => state.order);

  // initailize the dispatch function
  const dispatch = useDispatch();

  // initalize the useNavigate function
  const navigate = useNavigate();

  // manage billing information state
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // manage payment State
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payment, setPayment] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === CashOnDelivery) {
      setPayment("CashOnDelivery");
    } else if (method === Stripe) {
      setPayment("Stripe");
    } else if (method === Paypal) {
      setPayment("PayPal");
    }
  };

  useEffect(() => {
    setPaymentMethod(CashOnDelivery);
    setPayment("CashOnDelivery");

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setBillingInfo((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
      }));
    }
  }, [setBillingInfo]);

  const confirmOrder = (e) => {
    e.preventDefault();

    dispatch(createOrder({ items, billingInfo, payment }));
  };

  if (isSuccess) {
    navigate("/order-details");
  }

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
      </div>
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
              <Link
                to="/cart"
                className="hover:underline transition-colors duration-200"
                style={{
                  color:
                    colors?.secondaryText ||
                    (colors?.primaryText === "#fff" ? "#9ca3af" : "#6b7280"),
                }}
              >
                Cart
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
              <span style={{ color: colors?.primaryText }}>Checkout</span>
            </div>
          </nav>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaShieldAlt className="text-4xl text-green-600" />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ color: colors?.primaryText }}
              >
                Secure Checkout
              </h1>
            </div>
            <p
              style={{
                color:
                  colors?.secondaryText ||
                  (colors?.primaryText === "#fff" ? "#d1d5db" : "#6b7280"),
              }}
            >
              Complete your order safely and securely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Methods Section */}
              <div
                className="rounded-xl shadow-lg border p-8"
                style={{
                  backgroundColor:
                    colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
                  borderColor:
                    colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaCreditCard className="text-2xl text-blue-600" />
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: colors?.primaryText }}
                  >
                    Payment Methods
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      paymentMethod === CashOnDelivery
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        paymentMethod === CashOnDelivery
                          ? "#3b82f6"
                          : colors?.primaryBg === "#000"
                          ? "#6b7280"
                          : "#d1d5db",
                      backgroundColor:
                        paymentMethod === CashOnDelivery
                          ? "#eff6ff"
                          : "transparent",
                    }}
                    onClick={() => handlePaymentMethodChange(CashOnDelivery)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={CashOnDelivery}
                        alt="Cash on Delivery"
                        className="h-12 w-16 object-contain"
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors?.primaryText }}
                      >
                        Cash on Delivery
                      </span>
                      {paymentMethod === CashOnDelivery && (
                        <FaCheck className="text-blue-600 w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      paymentMethod === Stripe
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        paymentMethod === Stripe
                          ? "#3b82f6"
                          : colors?.primaryBg === "#000"
                          ? "#6b7280"
                          : "#d1d5db",
                      backgroundColor:
                        paymentMethod === Stripe ? "#eff6ff" : "transparent",
                    }}
                    onClick={() => handlePaymentMethodChange(Stripe)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={Stripe}
                        alt="Stripe"
                        className="h-12 w-16 object-contain"
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors?.primaryText }}
                      >
                        Credit Card
                      </span>
                      {paymentMethod === Stripe && (
                        <FaCheck className="text-blue-600 w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      paymentMethod === Paypal
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    style={{
                      borderColor:
                        paymentMethod === Paypal
                          ? "#3b82f6"
                          : colors?.primaryBg === "#000"
                          ? "#6b7280"
                          : "#d1d5db",
                      backgroundColor:
                        paymentMethod === Paypal ? "#eff6ff" : "transparent",
                    }}
                    onClick={() => handlePaymentMethodChange(Paypal)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={Paypal}
                        alt="PayPal"
                        className="h-12 w-16 object-contain"
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors?.primaryText }}
                      >
                        PayPal
                      </span>
                      {paymentMethod === Paypal && (
                        <FaCheck className="text-blue-600 w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Information Section */}
              <div
                className="rounded-xl shadow-lg border p-8"
                style={{
                  backgroundColor:
                    colors?.primaryBg === "#000" ? "#1f2937" : "#ffffff",
                  borderColor:
                    colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaUser className="text-2xl text-blue-600" />
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: colors?.primaryText }}
                  >
                    Billing Information
                  </h2>
                </div>

                <form onSubmit={confirmOrder} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        name="fullName"
                        value={billingInfo.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        name="email"
                        value={billingInfo.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        minLength={11}
                        placeholder="9230XXXXXXX"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>

                    {/* Address */}
                    <div className="relative">
                      <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Street Address"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>

                    {/* City */}
                    <div className="relative">
                      <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="City"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>

                    {/* Postal Code */}
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Postal Code"
                        name="postalCode"
                        value={billingInfo.postalCode}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>

                    {/* Country */}
                    <div className="relative">
                      <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Country"
                        name="country"
                        value={billingInfo.country}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#ffffff",
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#6b7280"
                              : "#d1d5db",
                          color: colors?.primaryText,
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-green-600 text-white 
                               rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold text-lg
                               shadow-lg hover:shadow-xl"
                    >
                      <FaLock className="w-5 h-5" />
                      Complete Order Securely
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Section - Order Summary */}
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
                  <div className="flex items-center gap-3 mb-6">
                    <FaShoppingBag className="text-2xl text-blue-600" />
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: colors?.primaryText }}
                    >
                      Order Summary
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Selected Payment Method */}
                    <div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{
                        backgroundColor:
                          colors?.primaryBg === "#000" ? "#374151" : "#f8fafc",
                      }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: colors?.primaryText }}
                      >
                        Payment Method
                      </span>
                      <div className="flex items-center gap-2">
                        {paymentMethod === CashOnDelivery && (
                          <>
                            <img
                              src={CashOnDelivery}
                              alt="COD"
                              className="w-8 h-6 object-contain"
                            />
                            <span
                              className="text-sm"
                              style={{ color: colors?.primaryText }}
                            >
                              COD
                            </span>
                          </>
                        )}
                        {paymentMethod === Stripe && (
                          <>
                            <img
                              src={Stripe}
                              alt="Stripe"
                              className="w-8 h-6 object-contain"
                            />
                            <span
                              className="text-sm"
                              style={{ color: colors?.primaryText }}
                            >
                              Card
                            </span>
                          </>
                        )}
                        {paymentMethod === Paypal && (
                          <>
                            <img
                              src={Paypal}
                              alt="PayPal"
                              className="w-8 h-6 object-contain"
                            />
                            <span
                              className="text-sm"
                              style={{ color: colors?.primaryText }}
                            >
                              PayPal
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Customer Information */}
                    {billingInfo.fullName && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span
                            style={{
                              color:
                                colors?.secondaryText ||
                                (colors?.primaryText === "#fff"
                                  ? "#9ca3af"
                                  : "#6b7280"),
                            }}
                          >
                            Customer
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: colors?.primaryText }}
                          >
                            {billingInfo.fullName}
                          </span>
                        </div>

                        {billingInfo.email && (
                          <div className="flex justify-between items-center">
                            <span
                              style={{
                                color:
                                  colors?.secondaryText ||
                                  (colors?.primaryText === "#fff"
                                    ? "#9ca3af"
                                    : "#6b7280"),
                              }}
                            >
                              Email
                            </span>
                            <span
                              className="font-medium text-sm"
                              style={{ color: colors?.primaryText }}
                            >
                              {billingInfo.email}
                            </span>
                          </div>
                        )}

                        {billingInfo.phone && (
                          <div className="flex justify-between items-center">
                            <span
                              style={{
                                color:
                                  colors?.secondaryText ||
                                  (colors?.primaryText === "#fff"
                                    ? "#9ca3af"
                                    : "#6b7280"),
                              }}
                            >
                              Phone
                            </span>
                            <span
                              className="font-medium"
                              style={{ color: colors?.primaryText }}
                            >
                              {billingInfo.phone}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Order Items */}
                    <div
                      className="border-t pt-4"
                      style={{
                        borderColor:
                          colors?.primaryBg === "#000" ? "#374151" : "#e5e7eb",
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          style={{
                            color:
                              colors?.secondaryText ||
                              (colors?.primaryText === "#fff"
                                ? "#9ca3af"
                                : "#6b7280"),
                          }}
                        >
                          Items ({items?.length || 0})
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: colors?.primaryText }}
                        >
                          ${cartSummary?.totalAmount?.toFixed(2) || "0.00"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span
                          style={{
                            color:
                              colors?.secondaryText ||
                              (colors?.primaryText === "#fff"
                                ? "#9ca3af"
                                : "#6b7280"),
                          }}
                        >
                          Shipping
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: colors?.primaryText }}
                        >
                          $10.00
                        </span>
                      </div>

                      <div
                        className="flex justify-between items-center pt-4 border-t"
                        style={{
                          borderColor:
                            colors?.primaryBg === "#000"
                              ? "#374151"
                              : "#e5e7eb",
                        }}
                      >
                        <span
                          className="text-xl font-bold"
                          style={{ color: colors?.primaryText }}
                        >
                          Total
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ${((cartSummary?.totalAmount || 0) + 10).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div
                      className="flex items-center justify-center gap-2 mt-6 p-3 rounded-lg"
                      style={{
                        backgroundColor:
                          colors?.primaryBg === "#000" ? "#374151" : "#f0f9ff",
                      }}
                    >
                      <FaShieldAlt className="text-green-600 w-5 h-5" />
                      <span className="text-sm font-medium text-green-600">
                        256-bit SSL Encryption
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
