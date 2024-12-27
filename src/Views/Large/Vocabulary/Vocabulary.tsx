import { useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styles from "./Vocabulary.module.css";
import Option from "../../Small/VocabularyOption/VocabularyOption";
import wordStore from "../../../Stores/WordStore";
import AudioIcon from "../../Small/AudioIcon/AudioIcon";
import OptionType from "../../../Interfaces/OptionType";
import ScorePopup from "../../Medium/ScorePopup/ScorePopup";
import { AnswerStatus } from "../../../Enums/AnswerStatus";
import scoreStore from "../../../Stores/ScoreStore";

const Vocabulary = observer(() => {
  useEffect(() => {
    wordStore.fetchNewQuestion();
  }, []);

  const navigate = useNavigate();
  const { currentWordInfo } = wordStore;

  const handleOptionClick = (answer: OptionType) => {
    navigate("/vocabulary-answer");

    if (answer.isCorrect === AnswerStatus.Correct) {
      scoreStore.incrementScore(100);
    } else if (answer.text !== "E. I don't know") {
      scoreStore.decrementScore(50);
    }
  };

  const getStyledSentence = () => {
    const sentence = currentWordInfo?.exampleSentence;
    const word = currentWordInfo?.word;
    if (sentence && word) {
      const parts = sentence.split(new RegExp(`(${word})`, "gi"));
      return (
        <span>
          {parts.map((part, index) =>
            part.toLowerCase() === word.toLowerCase() ? (
              <strong key={index}>{part}</strong>
            ) : (
              part
            )
          )}
        </span>
      );
    }
  };

  const displayCongratulationsPopup = () => {
    if (wordStore.currentWordIndex >= wordStore.wordListLength) {
      return <ScorePopup />;
    }
  };

  return (
    <div className={styles.vocabulary}>
      {displayCongratulationsPopup()}
      <h1 className={styles.h1}>
        {currentWordInfo?.word}
        <AudioIcon audioUrl={wordStore.currentWordInfo.audioUrl} />
      </h1>
      <h6 className={styles.h6Example}>{getStyledSentence()}</h6>
      <h6 className={styles.h6Question}>
        In this example, what is the meaning of {currentWordInfo?.word}?
      </h6>
      <ul className={styles.options}>
        {currentWordInfo.options.map((option, index) => (
          <Option
            key={index}
            text={option.text}
            onClick={() => handleOptionClick(option)}
          />
        ))}
      </ul>
    </div>
  );
});

export default Vocabulary;
