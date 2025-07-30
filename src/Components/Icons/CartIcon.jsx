import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const { primaryText } = useSelector((state) => state.colors.colors);

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <FaShoppingCart
          size={24}
          style={{
            fill: primaryText,
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
        />
        {/* Optional: Badge */}
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            background: "red",
            color: primaryText,
            borderRadius: "50%",
            padding: "2px 4px",
            fontSize: "12px",
          }}
        >
          3
        </span>
      </div>
    </>
  );
};

export default CartIcon;
