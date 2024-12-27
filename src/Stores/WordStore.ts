import { makeAutoObservable, action, runInAction } from "mobx";
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

class WordStore {
  wordListLength = 10;
  currentWordIndex = -1;
  currentWordInfo: WordInfo = {
    word: "",
    exampleSentence: "",
    options: [],
    definition: "",
    audioUrl: "",
  };
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      fetchNewQuestion: action,
      reset: action,
    });
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
      this.fetchNewQuestion();
    });
  }

  private setWordInfoOptions(correctDefinition: string): OptionType[] {
    const options = this.addOptions(correctDefinition);
    const optionArray = this.transformToOptionTypes(options, correctDefinition);
    const shuffledOptions = this.shuffleOptions(optionArray);

    shuffledOptions.push({
      label: "E.",
      text: "E. I don't know",
      isCorrect: AnswerStatus.Unsure,
    });

    return optionArray;
  }

  private addOptions(correctDefinition: string) {
    const options = new Set<string>();
    options.add(correctDefinition);

    while (options.size < 4) {
      const randomDefinition =
        wrongDefinitions[Math.floor(Math.random() * wrongDefinitions.length)];
      if (randomDefinition && randomDefinition !== correctDefinition) {
        options.add(randomDefinition);
      }
    }

    return Array.from(options);
  }

  private transformToOptionTypes(options: string[], correctDefinition: string) {
    return options.map((option, index) => ({
      text: `${String.fromCharCode(65 + index)}. ${option}`,
      isCorrect:
        option === correctDefinition
          ? AnswerStatus.Correct
          : AnswerStatus.Incorrect,
    }));
  }

  private shuffleOptions(options: OptionType[]) {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options.map((option, index) => ({
      ...option,
      label: String.fromCharCode(65 + index) + ".",
    }));
  }
}

const wordStore = new WordStore();
export default wordStore;
