import heroImage from "../../Images/Hero3.png";
import { useSelector } from "react-redux";

const Hero = () => {
  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  return (
    <>
      <div
        className="hero-container bg-white mt-7 px-4 flex flex-col lg:flex-row items-center gap-8"
        style={{ backgroundColor: primaryBg, color: primaryText }}
      >
        {/* Left side */}
        <div className="hero-content space-y-6 lg:w-[60%] text-center">
          <h1
            className="hero-title text-4xl xs:text-7xl font-bold text-black"
            style={{ color: primaryText }}
          >
            FIND OUT-FITS THAT
            <br /> MATCHES YOUR
            <br /> STYLES
          </h1>
          <p className="hero-description text-gray-600 text-lg">
            Discover the latest trends and styles that suit your unique fashion
            sense.
          </p>
          <button
            className="hero-button bg-black text-white py-4 px-14 rounded-full hover:bg-black/80 cursor-pointer transition duration-300"
            style={{ backgroundColor: primaryText, color: primaryBg }}
          >
            Shop Now
          </button>
          <div className="hero-stats flex justify-center items-center flex-wrap w-full gap-8 mt-10">
            <div className="brands border-r pr-8 border-[#858585]">
              <p className="text-4xl font-bold">200+</p>
              <p className="text-sm text-gray-500">International Brands</p>
            </div>
            <div className="products border-r pr-8 border-[#858585]">
              <p className="text-4xl font-bold">2,000+</p>
              <p className="text-sm text-gray-500">High-Quality Products</p>
            </div>
            <div className="customers border-r pr-8 border-[#858585]">
              <p className="text-4xl font-bold">30,000+</p>
              <p className="text-sm text-gray-500">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="h-full flex items-center justify-center">
          <img
            src={heroImage}
            alt="Hero"
            className="h-[50vh] lg:h-[85vh] object-cover rounded-2xl"
          />
        </div>
      </div>
      <div
        className="py-8 px-4 md:px-20 flex items-center justify-center top-0"
        style={{ backgroundColor: primaryText, color: primaryBg }}
      >
        <h1 className="text-4xl font-bold">STALLION-WEAR</h1>
      </div>
    </>
  );
};

export default Hero;
