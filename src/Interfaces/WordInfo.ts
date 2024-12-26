import OptionType from "./OptionType";

export default interface WordInfo {
  word: string;
  exampleSentence: string;
  options: OptionType[];
  definition: string;
  audioUrl: string | undefined;
}
