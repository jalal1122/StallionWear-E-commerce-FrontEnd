import { Link } from "react-router";

const LinkLeader = ({ productId }) => {
  return (
    <div className="p-2 m-3 font-bold">
      <ul className="breadcrumb flex items-center space-x-2 text-gray-600">
        {/* Home */}
        <li>
          <Link to="/">Home</Link>
        </li>

        &gt;
        {/* Categories */}
        <li>
          <Link to="/categories">Categories</Link>
        </li>

        &gt;
        {/* Product */}
        <li>
          <Link to={`/product/${productId}`}>Product</Link>
        </li>
      </ul>
    </div>
  );
};

export default LinkLeader;
