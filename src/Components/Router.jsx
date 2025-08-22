import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import Categories from "../Pages/Categories";
import ProductPage from "../Pages/ProductPage";
import Wishlist from "../Pages/Wishlist";
import Checkout from "../Pages/Checkout";
import OrderDetails from "../Pages/OrderDetails";
import Orders from "../Pages/Orders";
import UserOrderDetails from "../Pages/UserOrderDetails";
import Admin from "../Pages/Admin";

const Router = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Wishlist Route */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Categories Route */}
        <Route path="/categories" element={<Categories />} />

        {/* Product Page Route */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Checkout Page Route */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order Details Page Route */}
        <Route path="/order-details" element={<OrderDetails />} />

        {/* Orders Route */}
        <Route path="/orders" element={<Orders />} />

        {/* User Order Details */}
        <Route path="/orders/:id" element={<UserOrderDetails />} />

        {user && user.role === "admin" && (
          /* Admin Dashboard Route */
          <Route path="/admin" element={<Admin />} />
        )}

        {/* Fallback Route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default Router;
