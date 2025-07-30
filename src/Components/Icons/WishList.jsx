import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const WishList = () => {
  const { primaryText } = useSelector((state) => state.colors.colors);

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <FaHeart
          size={24}
          color="gray"
          style={{
            color: primaryText,
            cursor: "pointer",
            transition: "color 0.3s ease, background-color 0.3s ease",
          }}
        />
        {/* Optional badge */}
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            background: "red",
            color: primaryText,
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
          }}
        >
          5
        </span>
      </div>
    </>
  );
};

export default WishList;
