import { useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styles from "./Vocabulary.module.css";
import Option from "../../Small/VocabularyOption/VocabularyOption";
import vocabularyStore from "../../../Stores/VocabularyStore";
import AudioIcon from "../../Small/AudioIcon/AudioIcon";
import OptionType from "../../../Interfaces/OptionType";
import ScorePopup from "../../Medium/ScorePopup/ScorePopup";
import { AnswerStatus } from "../../../Enums/AnswerStatus";

const Vocabulary = observer(() => {
  useEffect(() => {
    vocabularyStore.fetchNewQuestion();
  }, []);

  const navigate = useNavigate();
  const { currentWordInfo } = vocabularyStore;

  const handleOptionClick = (option: OptionType) => {
    vocabularyStore.setUserAnswer(option);
    if (option.isCorrect !== AnswerStatus.Unsure)
      navigate("/vocabulary-answer");
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
    if (
      vocabularyStore.currentWordIndex >= vocabularyStore.currentWordList.length
    ) {
      return <ScorePopup />;
    }
  };

  return (
    <div className={styles.vocabulary}>
      {displayCongratulationsPopup()}
      <h1 className={styles.h1}>
        {currentWordInfo?.word}
        <AudioIcon audioSrc={`/audio/${currentWordInfo?.word}.mp3`} />
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
