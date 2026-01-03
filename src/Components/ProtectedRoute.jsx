import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute Component
 * Wrapper component to protect routes that require authentication
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render if authorized
 * @param {string} props.requiredRole - Required user role (optional, defaults to any authenticated user)
 * @param {string} props.redirectTo - Path to redirect if not authorized (defaults to "/login")
 */
const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = "/login" 
}) => {
  // Get user from Redux store
  const { user } = useSelector((state) => state.user);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized, render the protected content
  return children;
};

export default ProtectedRoute;

