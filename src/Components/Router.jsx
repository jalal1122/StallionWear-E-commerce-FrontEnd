import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Cart from "../Pages/Cart"

const Router = () => {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Cart Route */}
        <Route path="/cart" element={<Cart />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Router;
