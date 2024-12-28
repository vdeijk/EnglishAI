import React from "react";
import styles from "./Pagination.module.css";
import PaginationButton from "../../Small/PaginationButton/PaginationButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <PaginationButton
        onPageChange={handlePreviousPage}
        disabled={currentPage === 1}
        title="Previous"
      />
      <span className={styles.pageNumber}>
        Page {currentPage} of {totalPages}
      </span>
      <PaginationButton
        onPageChange={handleNextPage}
        disabled={currentPage === totalPages}
        title="Next"
      />
    </div>
  );
};

export default Pagination;
