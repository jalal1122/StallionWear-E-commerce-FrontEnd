import { useSelector } from "react-redux";

const PaginationSection = ({
  currentPage,
  totalPages,
  setFilter,
  // dispatch,
  // getAllProducts,
  filter
}) => {
  const { primaryText, primaryBg, secondaryBg } = useSelector(
    (state) => state.colors.colors
  );

  // Pagination Buttons Hover Function Enter
  const paginationButtonHoverEnter = (e) => {
    e.currentTarget.style.backgroundColor = secondaryBg;
    e.currentTarget.style.color = primaryBg;
    e.currentTarget.style.cursor = "pointer";
  };

  // Pagination Buttons Hover Function Leave
  const paginationButtonHoverLeave = (e) => {
    e.currentTarget.style.backgroundColor = primaryText;
    e.currentTarget.style.color = primaryBg;
  };

  // Pagination Next Button OnClick Function
  const paginationButtonOnClickNext = (e) => {
    if (currentPage >= totalPages) {
      return; // Prevent going to next page if already on the last page
    }

    if (e.currentTarget.textContent.trim() === "Next") {
      console.log("Next button clicked");

      setFilter({
        ...filter,
        nextPage: true,
        previousPage: false,
      });
    }

    // dispatch(getAllProducts(filter));
  };

  // Pagination Previous Button OnClick Function
  const paginationButtonOnClickPrevious = (e) => {
    if (currentPage <= 1) {
      return; // Prevent going to previous page if already on the first page
    }

    // Determine if the button clicked is Next or Previous
    if (e.currentTarget.textContent.trim() === "Previous") {
      console.log("Previous button clicked");

      setFilter({
        ...filter,
        nextPage: false,
        previousPage: true,
      });
    }
    // dispatch(getAllProducts(filter));
  };

  return (
    <>
      {/* Pagination */}
      <div className="pagination flex items-center justify-between p-3">
        <button
          className=" px-4 py-2 font-semibold rounded-md"
          style={{ backgroundColor: primaryText, color: primaryBg }}
          onMouseEnter={paginationButtonHoverEnter}
          onMouseLeave={paginationButtonHoverLeave}
          onClick={paginationButtonOnClickPrevious}
        >
          Previous
        </button>
        <span
          className="text-lg font-semibold"
          style={{
            color: primaryText,
          }}
        >
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 font-semibold rounded-md"
          style={{ backgroundColor: primaryText, color: primaryBg }}
          onMouseEnter={paginationButtonHoverEnter}
          onMouseLeave={paginationButtonHoverLeave}
          onClick={paginationButtonOnClickNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationSection;
