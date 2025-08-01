import heroImage from "../../Images/Hero.png";
import { useSelector } from "react-redux";

const Hero = () => {
  return (
    <>
      <div className="hero-container bg-white py-16 px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left side */}
        <div className="hero-content space-y-6 text-center delay-1000 transition-all duration-1000">
          <h1 className="hero-title text-5xl md:text-5xl font-bold text-black">
            FIND OUT-FITS THAT
            <br /> MATCHES YOUR
            <br /> STYLES
          </h1>
          <p className="hero-description text-gray-600 text-lg">
            Discover the latest trends and styles that suit your unique fashion
            sense.
          </p>
          <button className="hero-button bg-black text-white py-4 px-14 rounded-full hover:bg-black/80 transition duration-300">
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
        <div className="h-full flex items-center justify-center delay-1000 transition-all duration-1000">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-[550px] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
