import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { FaMoneyBillWave, FaPaypal } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import COD from "../assets/cash-on-delivery.png";
import paypal from "../assets/paypal.png";
import stripe from "../assets/stripe.png";

const Checkout = () => {
  // get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

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
          <div className="flex flex-col p-2 gap-3">
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
                    backgroundColor: primaryBg,
                    color: primaryText,
                  }}
                >
                  <img src={COD} alt="" className="h-8 w-10" />
                </li>
                <li
                  className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-md hover:cursor-pointer"
                  style={{
                    backgroundColor: primaryBg,
                    color: primaryText,
                  }}
                >
                  <img src={stripe} alt="" className="h-8 w-10" />
                </li>
                <li
                  className="flex items-center gap-2 px-2 py-1 rounded-lg shadow-md hover:cursor-pointer"
                  style={{
                    backgroundColor: primaryBg,
                    color: primaryText,
                  }}
                >
                  {" "}
                  <img src={paypal} alt="" className="h-10 w-12" />
                </li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col p-2 gap-3">
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

            <form>
              <div className="flex flex-col gap-5 text-lg">
                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Email Address */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Phone Number */}
                <input
                  type="text"
                  minLength={11}
                  placeholder="Phone Number 03000000000"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Address */}
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* City */}
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Zip Code */}
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                />

                {/* Country */}
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
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
              <img src={COD} alt="" className="w-10" />
            </li>

            {/* Customer Name */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Customer Name</h3>
              <span>jalal</span>
            </li>

            {/* Customer Email */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Customer Email</h3>
              <span>jalal@example.com</span>
            </li>

            {/* Customer Phone */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Customer Phone</h3>
              <span>03000000000</span>
            </li>

            {/* Total Amount */}
            <li className="flex justify-between">
              <h3 className="font-semibold">Total Amount</h3>
              <span className="font-bold">1000 $</span>
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
