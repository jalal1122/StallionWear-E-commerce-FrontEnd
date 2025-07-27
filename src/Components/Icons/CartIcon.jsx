import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const textColor1 = useSelector((state) => state.colors.colors.textColor1);
  const bgColor1 = useSelector((state) => state.colors.colors.bgColor1);

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <FaShoppingCart
          size={24}
          style={{
            fill: textColor1,
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
            color: bgColor1,
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
