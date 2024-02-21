import { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => handleClick(i + 1)}
          disabled={currentPage === i + 1}
          style={
            currentPage === i + 1
              ? { backgroundColor: "#007bff", color: "white" }
              : {}
          }
        >
          {i + 1}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
