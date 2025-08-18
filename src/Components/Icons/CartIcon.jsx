import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartIcon = ({ className = "" }) => {
  const { primaryText } = useSelector((state) => state.colors.colors);

  return (
    <FaShoppingCart
      className={className}
      style={{
        color: primaryText,
        cursor: "pointer",
        transition: "color 0.3s ease",
      }}
    />
  );
};

export default CartIcon;
