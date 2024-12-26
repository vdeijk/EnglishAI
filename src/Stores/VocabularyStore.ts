import { makeAutoObservable, action, runInAction } from "mobx";
import scoreStore from "./ScoreStore";
import { fetchWordInfo } from "../Apis/get";
import OptionType from "../Interfaces/OptionType";
import WordInfo from "../Interfaces/WordInfo";
import { wrongDefinitions } from "../Data/wrongDefinitions";
import { AnswerStatus } from "../Enums/AnswerStatus";
import { fetchWordAudio } from "../Apis/get";

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

  currentWordList: string[] = [];
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
      randomizeWordList: action,
    });
    this.randomizeWordList();
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
    if (this.currentWordIndex <= this.currentWordList.length && !this.loading) {
      runInAction(() => {
        this.loading = true;
        this.currentWordIndex++;
      });

      const currentWord = this.currentWordList[this.currentWordIndex];
      const [wordInfo, audioUrl] = await Promise.all([
        fetchWordInfo(currentWord),
        fetchWordAudio(currentWord),
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

  public reset() {
    runInAction(() => {
      this.currentWordIndex = 0;
      this.userAnswer = null;
      this.fetchNewQuestion();
    });
  }

  public randomizeWordList() {
    this.currentWordList = [...this.allWordList];
    for (let i = this.currentWordList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentWordList[i], this.currentWordList[j]] = [
        this.currentWordList[j],
        this.currentWordList[i],
      ];
    }
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