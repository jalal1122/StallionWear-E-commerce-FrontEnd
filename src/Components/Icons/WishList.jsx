import { FaHeart } from 'react-icons/fa';
import { useSelector } from "react-redux";

const WishList = () => {
    const textColor1 = useSelector((state) => state.colors.colors.textColor1);
  const bgColor1 = useSelector((state) => state.colors.colors.bgColor1);

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block' }}>
    <FaHeart size={24} color="gray" style={
        {
            color: textColor1,
            backgroundColor: bgColor1,
            cursor: 'pointer',
            transition: 'color 0.3s ease, background-color 0.3s ease'
        }
    } />
    {/* Optional badge */}
    <span
      style={{
        position: 'absolute',
        top: -8,
        right: -8,
        background: 'red',
        color: bgColor1,
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '12px'
      }}
    >
      5
    </span>
  </div>
    </>
  )
}

export default WishList
