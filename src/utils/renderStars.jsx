// Function to render star rating
const RenderStars = (rating) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className="text-yellow-400">
          ⭐
        </span>
      ))}

      <span className="ml-2 text-sm text-gray-600">
        ({rating && rating.toFixed(0)})
      </span>
    </div>
  );
};

export default RenderStars;
