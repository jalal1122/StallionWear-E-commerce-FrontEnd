import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Function to render star rating
const RenderStars = ({ rating }) => {
  // Input validation and sanitization
  if (rating === null || rating === undefined || rating === "") {
    return (
      <div className="flex items-center">
        {/* Show 5 empty stars for invalid/missing ratings */}
        {[...Array(5)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            <FaRegStar />
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-500">No rating</span>
      </div>
    );
  }

  // Convert the rating to a number and validate
  const numericRating = parseFloat(rating);

  if (isNaN(numericRating) || numericRating < 0) {
    return (
      <div className="flex items-center">
        {/* Show 5 empty stars for invalid ratings */}
        {[...Array(5)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            <FaRegStar />
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-500">Invalid rating</span>
      </div>
    );
  }

  // Ensure rating doesn't exceed 5
  const normalizedRating = Math.min(numericRating, 5);

  const fullStars = Math.floor(normalizedRating);
  const halfStar = normalizedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className="text-yellow-400">
          <FaStar />
        </span>
      ))}

      {/* Half Star */}
      {halfStar > 0 && (
        <span className="text-yellow-400">
          <FaStarHalfAlt />
        </span>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="text-gray-300">
          <FaRegStar />
        </span>
      ))}

      <span className="ml-2 text-sm text-gray-600">
        ({normalizedRating.toFixed(1)})
      </span>
    </div>
  );
};

export default RenderStars;
