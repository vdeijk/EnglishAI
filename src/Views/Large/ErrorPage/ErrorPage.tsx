import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Small/Button/Button";
import styles from "./ErrorPage.module.css";

const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist.
        </p>
        <Button
          label="Return to Dashboard"
          onClick={handleReturnToDashboard}
          type="button"
        />
      </div>
    </div>
  );
};

export default Error;
