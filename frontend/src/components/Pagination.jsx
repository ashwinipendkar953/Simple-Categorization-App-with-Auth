import React from "react";
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleRight,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../features/user/userSlice";

const Pagination = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextTwoPages = () => {
    dispatch(setCurrentPage(Math.min(currentPage + 2, totalPages)));
  };

  const handlePrevTwoPages = () => {
    dispatch(setCurrentPage(Math.max(currentPage - 2, 1)));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages > 0) {
      pageNumbers.push(
        <button
          key={1}
          className={`btn mx-1 ${currentPage === 1 ? "active" : "text-grey"}`}
          onClick={() => dispatch(setCurrentPage(1))}
        >
          1
        </button>
      );
    }

    // Show ellipsis if needed
    if (currentPage > 4) {
      pageNumbers.push(
        <span key="ellipsis-left" className="mx-1 text-grey">
          ...
        </span>
      );
    }

    // Determine the range of pages to display
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    // Add page numbers from the calculated range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`btn mx-1 ${currentPage === i ? "active" : "text-grey"}`}
          onClick={() => dispatch(setCurrentPage(i))}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 3) {
      pageNumbers.push(
        <span key="ellipsis-right" className="mx-1 text-grey">
          ...
        </span>
      );
    }

    // Always show the last page
    pageNumbers.push(
      <button
        key={totalPages}
        className={`btn mx-1 ${
          currentPage === totalPages ? "active" : "text-grey"
        }`}
        onClick={() => dispatch(setCurrentPage(totalPages))}
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="d-flex mt-5 justify-content-center align-items-center mb-2 category-pagination">
      <div>
        <button
          className="btn "
          onClick={handlePrevTwoPages}
          disabled={currentPage <= 2}
        >
          <FaAnglesLeft />
        </button>
        <button
          className="btn "
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
      </div>
      <div className="d-flex align-items-center text-grey">
        {renderPageNumbers()}
      </div>
      <div>
        <button
          className="btn "
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
        <button
          className="btn "
          onClick={handleNextTwoPages}
          disabled={currentPage >= totalPages - 1}
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
