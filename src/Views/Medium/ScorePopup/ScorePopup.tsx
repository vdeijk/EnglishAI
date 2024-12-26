import { useEffect, useRef } from "react";
import vocabularyStore from "../../../Stores/VocabularyStore";
import scoreStore from "../../../Stores/ScoreStore";
import styles from "./ScorePopup.module.css";
import Button from "../../Small/Button/Button";
import { useNavigate } from "react-router-dom";

const ScorePopup = () => {
  const popupRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const maxScore = vocabularyStore.allWordList.length * 100;
  const score = scoreStore.todayScore;

  const handleReturnToDashboard = () => {
    vocabularyStore.reset();
    navigate("/");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleReturnToDashboard();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent} ref={popupRef}>
        <h1 className={styles.h1}>Congratulations!</h1>
        <p className={styles.p}>You have completed the list of words.</p>
        <p className={styles.p}>
          Score: {score} / {maxScore}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleReturnToDashboard}
            label="Return to dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default ScorePopup;
