import Jacket from "../../Images/Hero.png";
import TS from "../../Images/T-S.png";
import WRC from "../../Images/Watch.png";
import Wallets from "../../Images/Wallet.png";
import Shoes from "../../Images/Shoes.png";
import { useSelector } from "react-redux";

const Categories = () => {
  const { primaryBg, primaryText, secondaryBg } = useSelector(
    (state) => state.colors.colors
  );
  return (
    <>
      <div
        className="categories-container bg-white py-16 px-5 sm:px-20"
        style={{ backgroundColor: secondaryBg, color: primaryText }}
      >
        <h2 className="sm:text-5xl text-4xl font-extrabold text-center mb-12 tracking-wide">
          Browse By Categories
        </h2>
        <div className="category-layer-1 flex flex-row justify-center gap-10">
          {/* Category 1 */}
          <div
            className="category-1 flex flex-row items-center justify-center text-center p-4 gap-10 rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer"
            style={{
              backgroundColor: primaryBg,
            }}
          >
            <h1
              className="sm:text-3xl text-xl text-black font-bold"
              style={{ color: primaryText }}
            >
              Jackets
            </h1>
            <img src={Jacket} alt="Jackets" className="w-40  rounded-md" />
          </div>

          {/* Category 2 */}
          <div
            className="category-2 flex flex-row items-center justify-center text-center p-4 gap-10 rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer"
            style={{
              backgroundColor: primaryBg,
            }}
          >
            <h1
              className="sm:text-3xl text-xl text-black font-bold"
              style={{ color: primaryText }}
            >
              Trousers <br />
              and <br />
              T-Shirts
            </h1>
            <img src={TS} alt="Jackets" className="w-40  rounded-md" />
          </div>
        </div>
        <div className="category-layer-2 flex items-center justify-center m-10">
          {/* Category 3 */}
          <div
            className="category-3 flex flex-row items-center justify-center text-center p-4 gap-10   rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer"
            style={{
              backgroundColor: primaryBg,
            }}
          >
            <h1
              className="sm:text-3xl text-xl text-black font-bold"
              style={{ color: primaryText }}
            >
              Watches <br /> Rings <br /> Chains
            </h1>
            <img src={WRC} alt="Jackets" className="w-60  rounded-md" />
          </div>
        </div>
        <div className="category-layer-3 flex items-center justify-center gap-15 m-10">
          {/* Category 4 */}
          <div
            className="category-4 flex flex-row items-center justify-center text-center p-4 gap-10   rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer"
            style={{
              backgroundColor: primaryBg,
            }}
          >
            <h1
              className="sm:text-3xl text-xl text-black font-bold"
              style={{ color: primaryText }}
            >
              Wallets
            </h1>
            <img
              src={Wallets}
              alt="Jackets"
              className="w-50  rounded-md"
            />
          </div>
          {/* Category 5 */}
          <div
            className="category-5 flex flex-row items-center justify-center text-center p-4 gap-10   rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer"
            style={{
              backgroundColor: primaryBg,
            }}
          >
            <h1
              className="sm:text-3xl text-xl text-black font-bold"
              style={{ color: primaryText }}
            >
              Shoes
            </h1>
            <img src={Shoes} alt="Jackets" className="w-50  rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
