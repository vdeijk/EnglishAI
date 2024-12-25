import OptionType from "./OptionType";

export default interface WordInfo {
  word: string;
  exampleSentence: string;
  options: OptionType[];
  definition: string;
  audioSrc: string | undefined;
}
