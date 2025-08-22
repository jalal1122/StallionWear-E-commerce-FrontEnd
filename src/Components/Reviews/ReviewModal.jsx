import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview, reset } from "../../features/Reviews/reviewsSlice";
import { FaStar, FaTimes, FaSpinner } from "react-icons/fa";

const ReviewModal = ({ isOpen, onClose, product, orderId }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.reviews
  );
  const { colors } = useSelector((state) => state.colors);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const reviewData = {
      productId: product.product._id,
      orderId: orderId,
      rating: rating,
      comment: comment.trim(),
    };

    try {
      await dispatch(submitReview(reviewData)).unwrap();

      // Reset form
      setRating(0);
      setComment("");
      setErrors({});

      // Close modal after successful submission
      setTimeout(() => {
        onClose();
        dispatch(reset());
      }, 1500);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
    setErrors({});
    dispatch(reset());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: colors.primaryBg, color: colors.primaryText }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Info */}
          <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={product.product.images?.[0] || "/placeholder-image.jpg"}
              alt={product.product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {product.productName || product.product.name}
              </h3>
              <p className="text-gray-600">Brand: {product.product.brand}</p>
              <div className="flex gap-4 text-sm text-gray-600 mt-1">
                <span>Size: {product.variant.size}</span>
                <span>Color: {product.variant.color}</span>
                <span>Qty: {product.quantity}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Rating *</label>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-colors"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <FaStar
                      size={28}
                      className={
                        star <= (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
              )}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block text-sm font-medium mb-2"
              >
                Your Review *
              </label>
              <textarea
                id="comment"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>{comment.length}/1000 characters</span>
                <span>Minimum 10 characters required</span>
              </div>
              {errors.comment && (
                <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
              )}
            </div>

            {/* Success/Error Messages */}
            {isSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                {message}
              </div>
            )}

            {isError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {message}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && <FaSpinner className="animate-spin" />}
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
