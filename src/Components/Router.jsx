import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Categories from "../Pages/Categories";

const Router = () => {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Categories Route */}
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
};

export default Router;
