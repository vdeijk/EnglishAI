import { makeAutoObservable } from "mobx";
import wordsData from "../data/words.json"; // Adjust the import path as needed
import Word from "../Interfaces/Word";

class StatisticsStore {
  languageLevel: string = "";
  wordStatus: string = "";
  searchQuery: string = "";
  words: Word[] = [];
  filteredWords: Word[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchWords();
  }

  setLanguageLevel = (level: string) => {
    this.languageLevel = level;
    console.log(this.languageLevel);
    this.filterWords();
  };

  setWordStatus = (status: string) => {
    this.wordStatus = status;
    this.filterWords();
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.filterWords();
  };

  fetchWords = () => {
    this.words = wordsData;
    this.filterWords();
  };

  filterWords = () => {
    this.filteredWords = this.words.filter(
      (word) =>
        word.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.wordStatus === "" || word.status === this.wordStatus) &&
        (this.languageLevel === "" || word.languageLevel === this.languageLevel)
    );
  };
}

const statisticsStore = new StatisticsStore();
export default statisticsStore;
