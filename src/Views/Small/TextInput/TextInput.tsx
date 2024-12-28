import React from "react";
import styles from "./TextInput.module.css";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
