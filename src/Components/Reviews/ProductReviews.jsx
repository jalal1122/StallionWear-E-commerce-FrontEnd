import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  clearProductReviews,
} from "../../features/Reviews/reviewsSlice";
import RenderStars from "../../utils/RenderStars.jsx";
import {
  FaUser,
  FaStar,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ProductReviews = ({ productId, heading }) => {
  const dispatch = useDispatch();
  const {
    productReviews,
    reviewsPagination,
    ratingDistribution,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.reviews);

  const { colors } = useSelector((state) => state.colors);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterRating, setFilterRating] = useState("");
  const limit = 5;

  useEffect(() => {
    if (productId) {
      const options = {
        page: currentPage,
        limit: limit,
        rating: filterRating || undefined,
      };

      dispatch(getProductReviews({ productId, options }));
    }

    return () => {
      dispatch(clearProductReviews());
    };
  }, [dispatch, productId, currentPage, filterRating]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= reviewsPagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRatingFilter = (rating) => {
    setFilterRating(rating === filterRating ? "" : rating);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate total reviews and average rating
  const totalReviews = reviewsPagination.totalReviews || 0;
  const averageRating =
    totalReviews > 0
      ? Object.entries(ratingDistribution).reduce(
          (acc, [rating, count]) => acc + parseInt(rating) * count,
          0
        ) / totalReviews
      : 0;

  if (isLoading && productReviews.length === 0) {
    return (
      <div className="w-full py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full py-12 px-4"
      style={{ backgroundColor: colors.primaryBg, color: colors.primaryText }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {heading || "Customer Reviews"}
          </h2>

          {/* Summary */}
          {totalReviews > 0 && (
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Overall Rating */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {averageRating.toFixed(1)}
                  </div>
                  <RenderStars rating={averageRating} />
                  <div className="text-sm text-gray-600 mt-1">
                    Based on {totalReviews} review
                    {totalReviews !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="flex-1">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = ratingDistribution[rating] || 0;
                    const percentage =
                      totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                    return (
                      <div
                        key={rating}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-12 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-gray-600" />
            <span className="font-medium">Filter by rating:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRatingFilter("")}
              className={`px-4 py-2 rounded-full border transition-colors ${
                filterRating === ""
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:border-blue-600"
              }`}
            >
              All Reviews
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingFilter(rating.toString())}
                className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-1 ${
                  filterRating === rating.toString()
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:border-blue-600"
                }`}
              >
                {rating} <FaStar className="text-yellow-400" size={12} />
                {ratingDistribution[rating] && (
                  <span className="text-xs">
                    ({ratingDistribution[rating]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        {isError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {totalReviews === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p className="text-lg mb-2">No reviews yet</p>
            <p>Be the first to review this product!</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {productReviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      {review.user?.profilePicture ? (
                        <img
                          src={review.user.profilePicture}
                          alt={review.user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-gray-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">
                            {review.user?.name || "Anonymous"}
                          </h4>
                          <div className="flex items-center gap-2">
                            <RenderStars rating={review.rating} />
                            <span className="text-sm text-gray-600">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {reviewsPagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!reviewsPagination.hasPrevPage || isLoading}
                  className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-1">
                  {Array.from(
                    { length: reviewsPagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isLoading}
                      className={`w-10 h-10 rounded border transition-colors ${
                        page === currentPage
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!reviewsPagination.hasNextPage || isLoading}
                  className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
