import axios from "../../utils/axios.js";

const Api_URL = "/api/order";

const createOrder = async ({ items, billingInfo, payment }) => {
  console.log("recieving data...", { items, billingInfo, payment });

  const response = await axios.post(`${Api_URL}`, {
    orderItems: items,
    shippingAddress: billingInfo,
    paymentMethod: payment,
  });
  console.log("response data...", response.data);
  
  return response.data;
};

export const orderService = { createOrder };
