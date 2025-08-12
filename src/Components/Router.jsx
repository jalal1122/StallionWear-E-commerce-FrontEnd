import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import Categories from "../Pages/Categories";
import ProductPage from "../Pages/ProductPage";
import Wishlist from "../Pages/Wishlist";

const Router = () => {
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

        {/* Fallback Route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default Router;
