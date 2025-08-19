import Jacket from "../../Images/Hero.png";
import TS from "../../Images/T-S.png";
import WRC from "../../Images/Watch.png";
import Wallets from "../../Images/Wallet.png";
import Shoes from "../../Images/Shoes.png";
import { useSelector } from "react-redux";

const Categories = () => {
  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  const categoriesList = [
    "Jackets",
    "Trousers and T-Shirts",
    "Watches, Rings, Chains",
    "Wallets",
    "Shoes",
  ];

  const categoryImages = [Jacket, TS, WRC, Wallets, Shoes];

  return (
    <>
      <div
        className="categories-container py-16 px-5 mt-10 sm:px-20"
        style={{ backgroundColor: primaryBg, color: primaryText }}
      >
        <h2 className="text-4xl xs:text-5xl font-extrabold text-center mb-12 tracking-wide">
          Browse By Categories
        </h2>
        <div className="category-layer-1 flex flex-wrap justify-center gap-10">
          {categoriesList.map((category, index) => {
            return (
              <div
                key={index}
                className={`category-${
                  index + 1
                } w-[200px] h-[250px] flex flex-col items-center justify-center mt-5 text-center px-8 py-2 gap-2 rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer overflow-hidden`}
                style={{
                  backgroundColor: primaryText === "#fff" ? "#1F2937" : "",
                }}
              >
                <h1
                  className="sm:text-xl text-lg font-bold"
                  style={{ color: primaryText }}
                >
                  {category}
                </h1>
                <img
                  src={categoryImages[index]}
                  alt={category}
                  className="rounded-md aspect-[4/3] w-40 h-35 object-cover object-top"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
