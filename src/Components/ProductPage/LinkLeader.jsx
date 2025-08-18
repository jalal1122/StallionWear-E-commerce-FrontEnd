import { Link } from "react-router";
import { useSelector } from "react-redux";
import { FaHome, FaChevronRight } from "react-icons/fa";

const LinkLeader = ({ productId }) => {
  // get the colors from redux store
  const { primaryText, primaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  return (
    <div
      className="px-4 py-4"
      style={{
        backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
        borderBottom: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav
          className="flex items-center space-x-3 text-sm font-medium"
          aria-label="Breadcrumb"
        >
          {/* Home */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-600"
            style={{ color: primaryText }}
          >
            <FaHome size={16} />
            <span>Home</span>
          </Link>

          <FaChevronRight size={12} className="opacity-50" />

          {/* Categories */}
          <Link
            to="/categories"
            className="transition-colors duration-200 hover:text-blue-600"
            style={{ color: primaryText }}
          >
            Categories
          </Link>

          <FaChevronRight size={12} className="opacity-50" />

          {/* Product */}
          <Link
            to={`/product/${productId}`}
            className="transition-colors duration-200 text-blue-600 font-semibold"
          >
            Product
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default LinkLeader;
