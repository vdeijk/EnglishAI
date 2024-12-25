import { observer } from "mobx-react";
import vocabularyStore from "../../../Stores/VocabularyStore";
import scoreStore from "../../../Stores/ScoreStore";
import styles from "./ScorePopup.module.css";
import Button from "../../Small/Button/Button";
import { useNavigate } from "react-router-dom";

const ScorePopup = observer(() => {
  const navigate = useNavigate();
  const maxScore = vocabularyStore.allWordList.length * 100;
  const score = scoreStore.score;

  const handleReturnToDashboard = () => {
    scoreStore.resetScore();
    vocabularyStore.reset();
    navigate("/");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h1 className={styles.h1}>Congratulations!</h1>
        <p className={styles.p}>You have completed the list of words.</p>
        <p className={styles.p}>
          Score: {score} / {maxScore}
        </p>
        <div className={styles.buttonContainer}>
          <Button onClick={handleReturnToDashboard} label="Return to dashboard" />
        </div>
      </div>
    </div>
  );
});

export default ScorePopup;
