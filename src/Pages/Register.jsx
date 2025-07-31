import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/User/userSlice.js";
import { FaUser, FaEnvelope, FaLock, FaFile } from "react-icons/fa";
import Header from "../Components/Header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Register = () => {
  // initialize the dispatch function from redux
  const dispatch = useDispatch();

  // initialize navigate function
  let navigate = useNavigate();

  // get the user state from redux store
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  // state for form submission error
  const [formError, setFormError] = useState("");

  // UseEffect to reset the user state on component mount
  useEffect(() => {
    if (isError) {
      setFormError(message);
      console.log("Error:", message);
    }

    if (isSuccess || user) {
      setFormError("");
      console.log("User registered successfully:", user);
      // Navigate to login page after successful registration
      navigate("/login");
    }

    // Reset the user state when the component unmounts or when the user state changes
    return () => {
      dispatch(reset());
      setFormError("");
    };
  }, [isError, isSuccess, user, message, dispatch, navigate, setFormError]);

  // get the colors from the redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Password regex: at least 8 characters, 1 letter, 1 digit, 1 special character
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // state to hold to profile picture for preview
  const [preview, setPreview] = useState(null);

  // state for validation errors
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    profilePicture: null,
  });

  // onchange to handle form inputs
  const onchange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];

      // Validate file if provided
      if (file) {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
          setErrors({
            ...errors,
            profilePicture:
              "Please select a valid image file (JPEG, JPG, PNG, WebP)",
          });
          return;
        }

        if (file.size > maxSize) {
          setErrors({
            ...errors,
            profilePicture: "File size must be less than 5MB",
          });
          return;
        }

        // Clear any previous file errors
        if (errors.profilePicture) {
          setErrors({ ...errors, profilePicture: "" });
        }
      }

      setUserData({ ...userData, [name]: file });

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result);
        };
      }
    } else {
      setUserData({ ...userData, [name]: value });

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  // Validate password
  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character (@$!%*#?&)";
    }
    return "";
  };

  // submit Form Function
  const submitForm = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate name
    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    }

    // Validate password
    const passwordError = validatePassword(userData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validate password confirmation
    if (userData.password !== userData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed with registration

    dispatch(registerUser(userData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* Header */}
      <Header />

      <div
        className="register-container w-[1200px] my-10 mx-auto flex flex-col items-center justify-center p-4"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        {/* heading */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold">Register</h1>
          <FaUser size={30} />
        </div>

        {/* Form */}
        <form onSubmit={submitForm}>
          {isError ? (
            <>
              <p className="error-message">{formError}</p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-[300px]">
                {/* Name Div */}
                <div className="relative nameDiv">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Full Name"
                    className={`w-full p-2 border rounded ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={onchange}
                    value={userData.name}
                  />
                  <FaUser
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

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

                {/* Confirm Password Div */}
                <div className="relative password2Div">
                  <input
                    type="password"
                    name="password2"
                    placeholder="Confirm your Password"
                    className={`w-full p-2 border rounded ${
                      errors.password2 ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={onchange}
                    value={userData.password2}
                  />
                  <FaLock
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.password2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password2}
                    </p>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="relative ProfilePictureDiv">
                  <input
                    type="file"
                    name="profilePicture"
                    className={`w-full p-2 border rounded ${
                      errors.profilePicture
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={onchange}
                    accept="image/*"
                  />
                  <FaFile
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.profilePicture && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.profilePicture}
                    </p>
                  )}
                </div>

                {/* Preview Image */}
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 p-2 bg-blue-500 font-bold text-lg text-white rounded hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                >
                  Register
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
