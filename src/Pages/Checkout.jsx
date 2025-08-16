import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import CashOnDelivery from "../assets/cash-on-delivery.png";
import Paypal from "../assets/paypal.png";
import Stripe from "../assets/stripe.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../features/Order/orderSlice.js";
import { useNavigate } from "react-router";

const Checkout = () => {
  // get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // get the cart items selected
  const { items, cartSummary } = useSelector((state) => state.cart);

  // get the order data from the redux store
  const { isSuccess } = useSelector((state) => state.order);

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
      setPayment("Paypal");
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

    console.log(cartSummary);
    dispatch(createOrder({ items, billingInfo, payment }));
  };

  if (isSuccess) {
    navigate("/order-details");
  }

  return (
    <>
      {/* header component */}
      <Header />

      {/* Checkout Page Content */}
      <div
        className="flex justify-between items-start my-10 p-5"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        {/* Left */}
        <div className="left w-[62%] flex flex-col gap-5">
          {/* Payment Section */}
          <div className="flex flex-col gap-3">
            {/* Payment heading */}
            <h1
              className="text-2xl font-bold py-2 px-4"
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              PAYMENT METHODS
            </h1>

            {/* Payments List */}
            <div className="flex justify-center items-center">
              <ul className="flex justify-center items-center gap-10 font-semibold">
                <li
                  className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-md hover:cursor-pointer"
                  style={{
                    backgroundColor: primaryText,
                  }}
                  onClick={() => handlePaymentMethodChange(CashOnDelivery)}
                >
                  <img src={CashOnDelivery} alt="" className="h-8 w-10" />
                </li>
                <li
                  className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-md hover:cursor-pointer"
                  style={{
                    backgroundColor: primaryText,
                  }}
                  onClick={() => handlePaymentMethodChange(Stripe)}
                >
                  <img src={Stripe} alt="" className="h-8 w-10" />
                </li>
                <li
                  className="flex items-center gap-2 px-2 py-1 rounded-lg shadow-md hover:cursor-pointer"
                  style={{
                    backgroundColor: primaryText,
                  }}
                  onClick={() => handlePaymentMethodChange(Paypal)}
                >
                  {" "}
                  <img src={Paypal} alt="" className="h-10 w-12" />
                </li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col p-2 gap-5">
            {/* heading */}
            <h1
              className="text-2xl font-bold py-2 px-4"
              style={{
                backgroundColor: primaryText,
                color: primaryBg,
              }}
            >
              Billing Information
            </h1>

            <form onSubmit={confirmOrder}>
              <div className="flex flex-col gap-5 text-lg">
                {/* Full Name */}
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  name="fullName"
                  value={billingInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Email Address */}
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  name="email"
                  value={billingInfo.email}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Phone Number */}
                <input
                  type="text"
                  required
                  minLength={11}
                  placeholder="Phone Number 03000000000"
                  name="phone"
                  value={billingInfo.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Address */}
                <input
                  type="text"
                  required
                  placeholder="Address"
                  name="address"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* City */}
                <input
                  type="text"
                  required
                  placeholder="City"
                  name="city"
                  value={billingInfo.city}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Zip Code */}
                <input
                  type="text"
                  required
                  placeholder="Zip Code"
                  name="postalCode"
                  value={billingInfo.postalCode}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Country */}
                <input
                  type="text"
                  required
                  placeholder="Country"
                  name="country"
                  value={billingInfo.country}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-md px-3 py-1"
                />

                <input
                  type="submit"
                  value={"Confirm Order"}
                  className="w-1/3 self-center px-3 py-2 rounded-lg font-semibold"
                  style={{
                    backgroundColor: primaryText,
                    color: primaryBg,
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-[33%] flex flex-col p-2 gap-5 sticky top-0">
          {/* heading */}
          <h1
            className="text-2xl font-bold py-2 px-4"
            style={{
              backgroundColor: primaryText,
              color: primaryBg,
            }}
          >
            Billing Information
          </h1>

          {/* Order Data */}
          <ul className="flex flex-col gap-5 justify-center text-lg">
            {/* Selected Payment Method */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Selected Payment Method</h3>
              {paymentMethod === CashOnDelivery && (
                <img src={CashOnDelivery} alt="" className="w-10" />
              )}
              {paymentMethod === Stripe && (
                <img src={Stripe} alt="" className="w-10" />
              )}
              {paymentMethod === Paypal && (
                <img src={Paypal} alt="" className="w-10" />
              )}
            </li>

            {/* Customer Name */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Customer Name</h3>
              <span>{billingInfo.fullName}</span>
            </li>

            {/* Customer Email */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Customer Email</h3>
              <span>{billingInfo.email}</span>
            </li>

            {/* Customer Phone */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Customer Phone</h3>
              <span>{billingInfo?.phone || "03xxxxxx"}</span>
            </li>

            {/* Total Amount */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Total Amount</h3>
              <span className="font-bold">{cartSummary?.totalAmount}$</span>
            </li>
          </ul>
        </div>
      </div>

      {/* footer component */}
      <Footer />
    </>
  );
};

export default Checkout;
