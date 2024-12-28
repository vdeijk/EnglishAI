import React from "react";
import styles from "./Pagination.module.css";

interface PaginationButtonProps {
  title: string;
  onPageChange: () => void;
  disabled?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onPageChange,
  title,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange()} disabled>
        {title}
      </button>
    </div>
  );
};

export default PaginationButton;
