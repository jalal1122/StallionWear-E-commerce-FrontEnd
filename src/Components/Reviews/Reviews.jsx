import { Swiper, SwiperSlide, } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar, FaCheckCircle, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useRef } from "react";

const reviews = [
  {
    name: "Anis Khan",
    review: "Loved the quality and comfort of the hoodie!",
    rating: "5"
  },
  {
    name: "Muhammad Jalal",
    review: "Great fitting and fabric, totally worth the price!",
    rating: "5"
  },
  {
    name: "Uzair Khan",
    review: "Soft material and trendy design. Will buy again!",
    rating: "5"
  },
  {
    name: "Fazle Samad",
    review: "Color is exactly like the picture. Very happy!",
    rating: "5"
  },
];

const Reviews = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-white py-16 px-4 md:px-20 relative">
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
        OUR HAPPY CUSTOMERS
      </h2>

      {/* Navigation Buttons */}
      <div className=" flex items-center absolute top-[60%] left-0 z-10 translate-y-[-50%] hidden md:flex">
        <button ref={prevRef} className="text-4xl p-3 rounded-full hover:bg-gray-200">
          <FaChevronLeft />
        </button>
      </div>
      <div className="fex items-center absolute top-[60%] right-0 z-10 translate-y-[-50%] hidden md:flex">
        <button ref={nextRef} className="text-4xl p-3 rounded-full hover:bg-gray-200">
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
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border rounded-xl shadow-md p-6 h-full">
              <div className="flex mb-3 text-yellow-400">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div className="flex items-center gap-2 font-semibold text-lg mb-2">
                {review.name}
                <FaCheckCircle className="text-green-500" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
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
