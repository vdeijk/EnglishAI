import { AnswerStatus } from "../Enums/AnswerStatus";

export default interface OptionType {
  text: string;
  isCorrect: AnswerStatus;
}
