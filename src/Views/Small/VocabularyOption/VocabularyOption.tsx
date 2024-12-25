import React from "react";
import styles from "./VocabularyOption.module.css";

interface OptionProps {
  text: string;
  onClick: () => void;
}

const Option: React.FC<OptionProps> = ({ text, onClick }) => {
  return (
    <li className={styles.option} onClick={onClick}>
      {text}
    </li>
  );
};

export default Option;
