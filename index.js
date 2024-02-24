import seedrandom from "seedrandom";
import { WORDS } from "./dictionary";

const shortestWordSize = WORDS.reduce((shortestWord, currentWord) =>
  currentWord.length < shortestWord.length ? currentWord : shortestWord
).length;

const longestWordSize = WORDS.reduce((longestWord, currentWord) =>
  currentWord.length > longestWord.length ? currentWord : longestWord
).length;

export function generate(options) {
  // initalize random number generator for words if options.seed is provided
  const random = options?.seed ? new seedrandom(options.seed) : null;

  const { minLength, maxLength, minNumberLength, maxNumberLength, ...rest } =
    options || {};

  function word() {
    let minimumLength =
      typeof minLength !== "number"
        ? shortestWordSize
        : limitWordSize(minLength);

    const maximumLength =
      typeof maxLength !== "number"
        ? longestWordSize
        : limitWordSize(maxLength);

    if (minimumLength > maximumLength) minimumLength = maximumLength;

    let rightSize = false;
    let wordUsed;
    while (!rightSize) {
      wordUsed = generateRandomWord();
      rightSize =
        wordUsed.length <= maximumLength && wordUsed.length >= minimumLength;
    }

    const minNumLength =
      typeof minNumberLength !== "number" ? 0 : minNumberLength;
    const maxNumLength =
      typeof maxNumberLength !== "number" ? minNumberLength : maxNumberLength;

    if (maxNumLength > 0) {
      // total is between minNumLength and maxNumLength
      const total = minNumLength + randInt(maxNumLength + 1 - minNumLength);
      for (let i = 0; i < total; i++) {
        // add one digit to the word
        wordUsed += randInt(10);
      }
    }

    return wordUsed;
  }

  function generateRandomWord() {
    return WORDS[randInt(WORDS.length)];
  }

  // limits the size of words to the minimum and maximum possible
  function limitWordSize(wordSize) {
    if (wordSize < shortestWordSize) wordSize = shortestWordSize;
    if (wordSize > longestWordSize) wordSize = longestWordSize;
    return wordSize;
  }

  // random int as seeded by options.seed if applicable, or Math.random() otherwise
  function randInt(lessThan) {
    const r = random ? random() : Math.random();
    return Math.floor(r * lessThan);
  }

  // No arguments = generate one word
  if (options === undefined) {
    return word();
  }

  // Just a number = return that many words
  if (typeof options === "number") {
    options = { exactly: options };
  }
  // if only minLength and maxLength are given, simply return a word
  else if (Object.keys(rest).length === 0) {
    return word();
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }

  // not a number = one word par string
  if (typeof options.wordsPerString !== "number") {
    options.wordsPerString = 1;
  }

  // not a number = one is the minimum length
  if (typeof options.minLength !== "number") {
    options.minLength = 1;
  }

  // not a number = 999 is the maximum length
  if (typeof options.maxLength !== "number") {
    options.maxLength = 999;
  }

  // not a number = one is the min
  if (typeof options.min !== "number") {
    options.min = 1;
  }

  // not a number = min plus 10 is the max
  if (typeof options.max !== "number") {
    options.max = options.min + 10;
  }

  // not a number = 0 is the minNumberLength
  if (typeof options.minNumberLength !== "number") {
    options.minNumberLength = 0;
  }

  // not a number = minNumberLength is the maxNumberLength
  if (typeof options.maxNumberLength !== "number") {
    options.maxNumberLength = minNumberLength;
  }

  //not a function = returns the raw word
  if (typeof options.formatter !== "function") {
    options.formatter = (word) => word;
  }

  //not a string = separator is a space
  if (typeof options.separator !== "string") {
    options.separator = " ";
  }

  // total is a random number between min and max
  const total = options.min + randInt(options.max + 1 - options.min);

  let results = [];
  let token = "";
  let relativeIndex = 0;

  for (let i = 0; i < total * options.wordsPerString; i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      let generatedWord;
      let rightSize = false;
      while (!rightSize) {
        generatedWord = word();
        rightSize =
          generatedWord.length >= options.minLength &&
          generatedWord.length <= options.maxLength;
        console.log("generatedWord", generatedWord);
      }
      token += options.formatter(generatedWord, relativeIndex);
    } else {
      let generatedWord;
      let rightSize = false;
      while (!rightSize) {
        generatedWord = word();
        rightSize =
          generatedWord.length >= options.minLength &&
          generatedWord.length <= options.maxLength;
        console.log("generatedWord", generatedWord);
      }
      token +=
        options.formatter(generatedWord, relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = "";
      relativeIndex = 0;
    }
  }
  if (typeof options.join === "string") {
    results = results.join(options.join);
  }

  return results;
}
