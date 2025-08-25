import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft,
  FaQuoteLeft,
  FaStar,
  FaUserCircle,
  FaThumbsUp,
  FaClock,
} from "react-icons/fa";
import { useRef } from "react";
import RenderStars from "./RenderStars";
import { useSelector } from "react-redux";

const Reviews = ({ heading, reviews }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  // Determine if current theme is dark mode
  const isDarkMode = primaryBg === "#000" || primaryBg === "#000000";

  // Function to get time ago format
  const getTimeAgo = (index) => {
    const timeOptions = [
      "2 days ago",
      "1 week ago",
      "3 days ago",
      "5 days ago",
      "1 month ago",
    ];
    return timeOptions[index % timeOptions.length];
  };

  // If no reviews are provided, return beautiful empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div
        className="py-20 px-4 md:px-20"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full"
              style={{
                backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
              }}
            >
              <FaStar className="text-yellow-400" size={24} />
              <h2 className="text-4xl font-bold tracking-wide">
                {heading || "Customer Reviews"}
              </h2>
            </div>
          </div>

          <div
            className="p-12 rounded-2xl shadow-lg max-w-md mx-auto"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            }}
          >
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-gray-300" size={20} />
                ))}
              </div>
              <p className="text-xl font-semibold mb-2">No Reviews Yet</p>
              <p className="opacity-70">
                Be the first to share your experience!
              </p>
            </div>

            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="py-20 px-4 md:px-20 relative overflow-hidden"
      style={{
        backgroundColor: primaryBg,
        color: primaryText,
      }}
    >
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-3 text-xl xs:text-2xl md:text-4xl mb-6 px-6 py-3 rounded-full"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
            }}
          >
            <FaStar className="text-yellow-400" size={24} />
            <h2 className=" font-bold tracking-wide">{heading}</h2>
          </div>

          {/* Review Stats */}
          <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">
                {reviews.length}
              </div>
              <div className="text-sm opacity-70">Total Reviews</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <RenderStars rating={4.5} />
              </div>
              <div className="text-sm opacity-70">Average Rating</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">98%</div>
              <div className="text-sm opacity-70">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 hidden lg:block">
          <button
            ref={prevRef}
            className="group p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            }}
          >
            <FaChevronLeft
              className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
              size={20}
            />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 hidden lg:block">
          <button
            ref={nextRef}
            className="group p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            }}
          >
            <FaChevronRight
              className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
              size={20}
            />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
            1280: { slidesPerView: 4, spaceBetween: 32 },
          }}
          className="pb-8"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div
                className="group h-full p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border"
                style={{
                  backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                  borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                }}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <FaQuoteLeft
                    className="text-blue-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    size={32}
                  />
                </div>

                {/* Star Rating */}
                <div className="mb-4">
                  <RenderStars rating={parseFloat(review.rating)} />
                </div>

                {/* Review Text */}
                <blockquote className="text-sm leading-relaxed mb-6 italic">
                  "{review.review}"
                </blockquote>

                {/* Reviewer Info */}
                <div
                  className="flex items-center justify-between pt-4 border-t border-opacity-20"
                  style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                      }}
                    >
                      <FaUserCircle className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {review.name}
                        </span>
                        <FaCheckCircle className="text-green-500" size={12} />
                      </div>
                      <div className="flex items-center gap-1 text-xs opacity-70">
                        <FaClock size={10} />
                        <span>{getTimeAgo(index)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
                      color: primaryText,
                    }}
                  >
                    <FaThumbsUp size={10} />
                    <span>Helpful</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Write Review CTA */}
        {/* <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold">
            <FaStar size={18} />
            Write Your Review
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Reviews;
