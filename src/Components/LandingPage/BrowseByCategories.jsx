import Jacket from "../../Images/Hero.png";
import TS from "../../Images/T-S.png";
import WRC from "../../Images/Watch.png";
import Wallets from "../../Images/Wallet.png";
import Shoes from "../../Images/Shoes.png";
import { useSelector } from "react-redux";

const Categories = () => {
  const { secondaryBg } = useSelector((state) => state.colors.colors);

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
        className="categories-container py-16 px-5 sm:px-20"
        style={{ backgroundColor: secondaryBg }}
      >
        <h2 className="sm:text-5xl text-4xl text-black font-extrabold text-center mb-12 tracking-wide">
          Browse By Categories
        </h2>
        <div className="category-layer-1 flex flex-wrap justify-center gap-10">
          {categoriesList.map((category, index) => {
            return (
              <div
                key={index}
                className={`category-${
                  index + 1
                } w-[400px] h-[250px] flex flex-row items-center justify-around text-center px-4 py-2 gap-2 rounded-lg shadow-2xl hover:transition-shadow duration-300 cursor-pointer overflow-hidden`}
                style={{
                  backgroundColor: "white",
                }}
              >
                <h1
                  className="sm:text-3xl text-xl text-black font-bold"
                  style={{ color: "black" }}
                >
                  {category}
                </h1>
                <img
                  src={categoryImages[index]}
                  alt={category}
                  className="rounded-md aspect-[4/3] w-50 h-[200px] object-cover object-top"
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
