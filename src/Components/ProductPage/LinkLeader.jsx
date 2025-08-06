import { Link } from "react-router";

const LinkLeader = ({ productId }) => {
  return (
    <div>
      <ul>
        {/* Home */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Categories */}
        <li>
          <Link to="/categories">Categories</Link>
        </li>

        {/* Product */}
        <li>
          <Link to={`/product/${productId}`}>Product</Link>
        </li>
      </ul>
    </div>
  );
};

export default LinkLeader;
