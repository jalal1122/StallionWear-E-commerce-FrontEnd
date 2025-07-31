import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser, reset } from "../features/User/userSlice.js";
import Header from "../Components/Header/Header";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isError) {
      setFormError(message);
      console.log("Error:", message);
    }

    if (isSuccess) {
      console.log("User logged in:", user);
      navigate("/");
    }
    
    // Reset the user state after handling success or error
    dispatch(reset());

    return () => {
      setFormError("");
    };
  }, [isSuccess, isError, message, dispatch, navigate, user]);

  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!userData.email) {
      formErrors.email = "Email is required";
    }
    if (!userData.password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(loginUser(userData))
        .unwrap()
        .then((data) => {
          console.log("Login successful:", data);
        })
        .catch((error) => {
          const errorMessage =
            error?.message || "Login failed. Please try again.";
          setErrors((prev) => ({ ...prev, form: errorMessage }));
        });
    } else {
      console.error("Form validation failed:", errors);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div
        className="register-container w-[1200px] my-10 mx-auto flex flex-col items-center justify-center p-4"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        <div className="heading flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">Login</h1>
          <FaUser size={30} />
        </div>
        <form onSubmit={submitForm}>
          {isError ? (
            <>
              <p className="error-message">{formError}</p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-[300px]">
                {/* Email Div */}
                <div className="relative emailDiv">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className={`w-full p-2 border rounded ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={onchange}
                    value={userData.email}
                  />
                  <FaEnvelope
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Div */}
                <div className="relative passwordDiv">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className={`w-full p-2 border rounded ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={onchange}
                    value={userData.password}
                  />
                  <FaLock
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 my-2 rounded hover:bg-blue-600 transition duration-200"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </form>

        {errors.form && (
          <p className="text-red-500 text-sm mt-4">{errors.form}</p>
        )}
      </div>
    </>
  );
};

export default Login;
