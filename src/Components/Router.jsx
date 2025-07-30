import { Routes, Route } from "react-router";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";

const Router = () => {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Router;
