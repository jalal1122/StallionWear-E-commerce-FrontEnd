import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const WishList = ({ className = "" }) => {
  const { primaryText } = useSelector((state) => state.colors.colors);

  return (
    <FaHeart
      className={className}
      style={{
        color: primaryText,
        cursor: "pointer",
        transition: "color 0.3s ease",
      }}
    />
  );
};

export default WishList;
