export default interface Word {
  name: string;
  definition: string;
  status: string;
  languageLevel: string;
  correct: number;
  incorrect: number; 
  streak: number;
}