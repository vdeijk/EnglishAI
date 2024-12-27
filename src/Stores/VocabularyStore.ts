import { makeAutoObservable, action, runInAction } from "mobx";
import scoreStore from "./ScoreStore";
import { fetchWordInfo } from "../Apis/get";
import OptionType from "../Interfaces/OptionType";
import WordInfo from "../Interfaces/WordInfo";
import { wrongDefinitions } from "../Data/wrongDefinitions";
import { AnswerStatus } from "../Enums/AnswerStatus";
import { fetchWordAudio } from "../Apis/get";
import { A1 } from "../Data/A1WordList";
import { A2 } from "../Data/A2WordList";
import { B1 } from "../Data/B1WordList";
import { B2 } from "../Data/B2WordList";
import { C1 } from "../Data/C1WordList";
import profileStore from "./ProfileStore";

class VocabularyStore {
  allWordList: string[] = [
    "ubiquitous",
    "ephemeral",
    "gregarious",
    "obfuscate",
    "mellifluous",
    "quixotic",
    "laconic",
    "serendipity",
    "voracious",
    "zealous",
  ];

  wordListLength = 10;
  currentWordIndex = -1;
  currentWordInfo: WordInfo = {
    word: "",
    exampleSentence: "",
    options: [],
    definition: "",
    audioUrl: "",
  };
  userAnswer: OptionType | null = null;
  loading: boolean = false;
  onNavigateNext: () => void = () => {};

  constructor() {
    makeAutoObservable(this, {
      setUserAnswer: action,
      fetchNewQuestion: action,
      reset: action,
    });
  }

  public setOnNavigateNext(callback: () => void) {
    this.onNavigateNext = callback;
  }

  public setUserAnswer(answer: OptionType) {
    this.userAnswer = answer;
    if (answer.text === "E. I don't know") {
      this.fetchNewQuestion();
    } else if (answer.isCorrect === AnswerStatus.Correct) {
      runInAction(() => {
        scoreStore.incrementScore(100);
      });
    }
  }

  public async fetchNewQuestion() {
    if (this.currentWordIndex <= this.wordListLength && !this.loading) {
      runInAction(() => {
        this.loading = true;
        this.currentWordIndex++;
      });
      const wordList = this.getWordListByLevel(profileStore.getLanguageLevel());
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      const [wordInfo, audioUrl] = await Promise.all([
        fetchWordInfo(randomWord),
        fetchWordAudio(randomWord),
      ]);

      runInAction(() => {
        this.currentWordInfo = {
          ...wordInfo,
          options: this.setWordInfoOptions(wordInfo.definition),
          audioUrl: audioUrl ?? undefined,
        };
        this.userAnswer = null;
        this.loading = false;
      });
    }
  }

  public getWordListByLevel(level: string) {
    switch (level) {
      case "A1":
        return A1;
      case "A2":
        return A2;
      case "B1":
        return B1;
      case "B2":
        return B2;
      case "C1":
        return C1;
      default:
        return [];
    }
  }
  public reset() {
    runInAction(() => {
      this.currentWordIndex = 0;
      this.userAnswer = null;
      this.fetchNewQuestion();
    });
  }

  private setWordInfoOptions(correctDefinition: string): OptionType[] {
    const options = new Set<string>();
    options.add(correctDefinition);

    while (options.size < 4) {
      const randomDefinition =
        wrongDefinitions[Math.floor(Math.random() * wrongDefinitions.length)];
      if (randomDefinition && randomDefinition !== correctDefinition) {
        options.add(randomDefinition);
      }
    }

    const optionArray = Array.from(options).map((option, index) => ({
      text: `${String.fromCharCode(65 + index)}. ${option}`,
      isCorrect:
        option === correctDefinition
          ? AnswerStatus.Correct
          : AnswerStatus.Incorrect,
    }));

    optionArray.push({
      text: "E. I don't know",
      isCorrect: AnswerStatus.Unsure,
    });

    return optionArray;
  }
}

const vocabularyStore = new VocabularyStore();
export default vocabularyStore;

/*

  public addCurrentWordInfo(wordInfo: WordInfo) {
    runInAction(() => {
      wordInfo.options = this.setWordInfoOptions(wordInfo.definition);
      this.currentWordInfo = wordInfo;
    });
  }
  private async fetchAudio() {
    if (vocabularyStore.currentWordInfo?.word) {
      const url = await fetchWordAudio(this.currentWordInfo.word);
      runInAction(() => {
        this.currentWordInfo = {
          ...this.currentWordInfo,
          audioUrl: url ?? undefined,
        };
      });
    }
  }
*/
