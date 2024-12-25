import axios from "axios";
import WordInfo from "../Interfaces/WordInfo";

const MERRIAM_WEBSTER_LEARNER_API_URL =
  "https://www.dictionaryapi.com/api/v3/references/learners/json/";
const MERRIAM_WEBSTER_API_KEY = import.meta.env
  .VITE_MERRIAM_WEBSTER_LEARNERS_API_KEY;

const cleanExampleSentence = (sentence: string): string => {
  return sentence.replace(/{[^}]+}/g, "");
};

const fetchWord = async (word: string) => {
  const response = await axios.get(
    `${MERRIAM_WEBSTER_LEARNER_API_URL}${word}?key=${MERRIAM_WEBSTER_API_KEY}`
  );
  return response.data;
};

export const fetchWordInfo = async (word: string): Promise<WordInfo> => {
  try {
    console.log("Fetching word info with API key:", MERRIAM_WEBSTER_API_KEY);
    const data = await fetchWord(word);

    const definition = data[0]?.shortdef?.[0];
    let exampleSentence =
      data[0]?.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.find(
        (item: [string]) => item[0] === "vis"
      )?.[1]?.[0]?.t || "No example available.";
    if (exampleSentence) {
      exampleSentence = cleanExampleSentence(exampleSentence);
    }

    const audioSrc = data[0]?.hwi?.prs?.[0]?.sound?.audio;

    const wordInfo: WordInfo = {
      word,
      definition,
      exampleSentence,
      options: [],
      audioSrc: audioSrc
        ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioSrc[0]}/${audioSrc}.mp3`
        : undefined,
    };

    return wordInfo;
  } catch (error) {
    console.error("Error fetching word info:", error);
    return {
      word,
      definition: "No definition available.",
      exampleSentence: "No example available.",
      options: [],
      audioSrc: "",
    };
  }
};
