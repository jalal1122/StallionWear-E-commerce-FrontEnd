import Footer from "../Components/Footer";
import Header from "../Components/Header/Header";
import { useSelector } from "react-redux";

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

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Order Details  */}
      <div
        className="flex flex-col gap-5 justify-center items-center my-5 font-semibold"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        <h1 className="text-5xl font-bold p-5">Order Details</h1>
        <div
          className="flex flex-wrap justify-center items-start p-5 gap-10 rounded-2xl"
          style={{}}
        >
          {/* Shipping Address Data */}
          <div className="flex flex-col gap-5">
            {/* Heading for Shipping Address */}
            <h1 className="font-bold text-3xl">Shipping Data</h1>
            {shippingAddress && (
              <div className="flex flex-col gap-2">
                <p>Full Name: {shippingAddress.fullName}</p>
                <p>Email: {shippingAddress.email}</p>
                <p>Phone: {shippingAddress.phone}</p>
                <p
                  style={{
                    maxWidth: "250px",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Address: {shippingAddress.address}
                </p>
                <p>City: {shippingAddress.city}</p>
                <p>Postal Code: {shippingAddress.postalCode}</p>
                <p>Country: {shippingAddress.country}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Payment Method</h2>
            <p> {paymentMethod || "CashOnDelivery"}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Order Summary</h2>
            <p>Shipping Charge: {shippingCharge}</p>
            <p>Total Amount: {totalAmount}</p>
            <p>Final Amount: {finalAmount}</p>
            <p>Discount: {discount}</p>
            {notes && <p>Notes: {notes}</p>}
          </div>
        </div>

        <button
          className="py-2 px-4 rounded my-5 hover:cursor-pointer"
          style={{
            backgroundColor: primaryText,
            color: primaryBg,
          }}
        >
          Continue to Payment
        </button>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default OrderDetails;
