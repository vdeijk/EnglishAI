import React from "react";
import styles from "./SelectInput.module.css";

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, value, onChange, options }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange} className={styles.select}>
        <option value="">Select Level</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;