
interface WordListFormatter {
    formatWordList(input: string): string;
  }
  
  export const wordListFormatter: WordListFormatter = {
    formatWordList(input: string): string {
      const lines: string[] = input.trim().split("\n");
  
      const formattedWords: string[] = lines.map((line) => {
        const word: string = line.trim().split(" ")[0];
        return `"${word}",`;
      });
  
      return formattedWords.join("\n");
    },
  };
  
  export const extractA1Words = (input: string): string[] => {
    const lines = input.trim().split("\n");
  
    const a1Lines = lines.filter((line) => line.includes("C1"));
  
    const a1Words = a1Lines.map((line) => `"${line.split(" ")[0]}"`);
  
    return a1Words;
  };
  