import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../features/Colors/colorsSlice.js";
import userReducer from "../features/User/userSlice.js";
import productReducer from "../features/Products/productSlice.js";
import wishlistReducer from "../features/Wishlist/wishlistSlice.js";
import cartReducer from "../features/Cart/cartSlice.js";
import orderReducer from "../features/Order/orderSlice.js";
import ordersReducer from "../features/Orders/ordersSlice.js";

export const store = configureStore({
  reducer: {
    colors: colorReducer,
    user: userReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    order: orderReducer,
    orders: ordersReducer,
  },
});
