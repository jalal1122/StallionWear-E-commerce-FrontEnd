import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  // Get user from Redux store instead of localStorage for reactive updates
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Wishlist Route */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* Register Route - redirect to home if already logged in */}
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" replace /> : <Register />} 
        />

        {/* Login Route - redirect to home if already logged in */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />

        {/* Categories Route */}
        <Route path="/categories" element={<Categories />} />

        {/* Product Page Route */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Checkout Page Route - Protected (requires authentication) */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />

        {/* Order Details Page Route - Protected (requires authentication) */}
        <Route 
          path="/order-details" 
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          } 
        />

        {/* Orders Route - Protected (requires authentication) */}
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />

        {/* User Order Details - Protected (requires authentication) */}
        <Route 
          path="/orders/:id" 
          element={
            <ProtectedRoute>
              <UserOrderDetails />
            </ProtectedRoute>
          } 
        />

        {/* Admin Dashboard Route - Protected (requires admin role) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/">
              <Admin />
            </ProtectedRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default Router;
