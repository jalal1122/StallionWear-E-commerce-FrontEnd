import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { useRef } from "react";
import RenderStars from "../utils/RenderStars";
import { useSelector } from "react-redux";

const Reviews = ({ heading, reviews }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { primaryBg, primaryText } = useSelector((state) => state.colors.colors);

  // If no reviews are provided, return null
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white py-16 px-4 md:px-20">
        <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
          {heading || "Reviews"}
        </h2>
        <p className="text-center text-lg text-gray-500">
          No reviews available at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-20 relative" style={{
      backgroundColor: primaryBg, color: primaryText
    }}>
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
        {heading || "Reviews"}
      </h2>

      {/* Navigation Buttons */}
      <div className=" flex items-center absolute top-[60%] left-0 z-10 translate-y-[-50%] hidden md:flex">
        <button
          ref={prevRef}
          className="text-4xl p-3 rounded-full hover:bg-gray-200"
        >
          <FaChevronLeft />
        </button>
      </div>
      <div className="fex items-center absolute top-[60%] right-0 z-10 translate-y-[-50%] hidden md:flex">
        <button
          ref={nextRef}
          className="text-4xl p-3 rounded-full hover:bg-gray-200"
        >
          <FaChevronRight />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="border rounded-xl shadow-md p-6 h-full" style={{
              backgroundColor: primaryBg, color: primaryText
            }}>
              <div className="">
                <RenderStars rating={parseFloat(review.rating)} />
              </div>
              <div className="flex items-center gap-2 font-semibold text-lg mb-2">
                {review.name}
                <FaCheckCircle className="text-green-500" />
              </div>
              <p className=" text-sm leading-relaxed">
                “{review.review}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
