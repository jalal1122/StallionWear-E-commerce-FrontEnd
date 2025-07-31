import styled from "styled-components";
import { useSelector } from "react-redux";

const Loader = () => {
  // get the color from colorSlice redux
  const { primaryBg } = useSelector((state) => state.colors.colors);

  return (
    <StyledWrapper>
      <div
        className="w-full h-screen flex items-center justify-center"
        style={{
          backgroundColor: primaryBg,
        }}
      >
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 45px;
    height: 40px;
    background: linear-gradient(
        #000 calc(1 * 100% / 6),
        #fff 0 calc(3 * 100% / 6),
        #000 0
      ),
      linear-gradient(
        #000 calc(2 * 100% / 6),
        #fff 0 calc(4 * 100% / 6),
        #000 0
      ),
      linear-gradient(
        #000 calc(3 * 100% / 6),
        #fff 0 calc(5 * 100% / 6),
        #000 0
      );
    background-size: 10px 400%;
    background-repeat: no-repeat;
    animation: matrix 1s infinite linear;
  }

  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%;
    }

    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%;
    }
  }
`;

export default Loader;
