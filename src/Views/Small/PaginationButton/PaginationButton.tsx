import React from "react";
import styles from "./PaginationButton.module.css";

interface PaginationButtonProps {
  title: string;
  onPageChange: () => void;
  disabled?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onPageChange,
  title,
  disabled,
}) => {
  return (
    <button
      onClick={() => onPageChange()}
      disabled={disabled}
      className={styles.pagination}
    >
      {title}
    </button>
  );
};

export default PaginationButton;
