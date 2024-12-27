import React from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styles from "./VocabularyAnswer.module.css";
import vocabularyStore from "../../../Stores/WordStore";
import Button from "../../Small/Button/Button";

const VocabularyAnswer: React.FC = observer(() => {
  const navigate = useNavigate();
  const { currentWordInfo, userAnswer } = vocabularyStore;

  const dictionaryUrl = `https://www.oxfordlearnersdictionaries.com/definition/english/${currentWordInfo.word}`;

  const handleNextQuestion = () => {
    vocabularyStore.fetchNewQuestion();
    navigate("/vocabulary");
  };

  return (
    <div className={styles.vocabularyAnswer}>
      <h1 className={styles.h1}>
        {userAnswer?.isCorrect ? "Correct" : "Incorrect"}
      </h1>
      <h6 className={styles.h6}>
        In the previous sentence, what was the meaning of
        <strong> {currentWordInfo.word} </strong>?
      </h6>
      <h6 className={styles.h6}>Your answer: {userAnswer?.text} </h6>
      <a
        className={styles.dictionaryLink}
        href={dictionaryUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View in Oxford Learner's Dictionaries
      </a>
      <div className={styles.button}>
        <Button label="Next Question" onClick={handleNextQuestion} />
      </div>
    </div>
  );
});

export default VocabularyAnswer;
