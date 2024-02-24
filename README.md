# Unique Word Generator

`word-generator` generates a random string using english words and numbers. The code is developed based on the [random-words](https://github.com/apostrophecms/random-words).

### Installation

```
npm install word-generator
```

### Methods

| API          | Description               |
| ------------ | ------------------------- |
| `generate()` | generates a random string |

### Options

| API               | Default Value | Type     | Description                                                       |
| ----------------- | ------------- | -------- | ----------------------------------------------------------------- |
| `minLength`       | null          | Number   | minimum length of the random word                                 |
| `maxLength`       | null          | Number   | maximum length of the random word                                 |
| `minNumberLength` | null          | Number   | minimum length of the random number                               |
| `maxNumberLength` | 0             | Number   | maximum length of the random number                               |
| `min`             | null          | Number   | minimum number of strings to generate                             |
| `max`             | null          | Number   | maximum number of strings to generate                             |
| `exactly`         | null          | Number   | exact number of strings to generate                               |
| `join`            | null          | String   | string that is used for joining the generated strings             |
| `wordsPerString`  | 1             | Number   | the number of words per a generated string                        |
| `separator`       | null          | String   | the separator that goes between the words in the generated string |
| `seed`            | null          | String   | seed that is used for initializing the generator                  |
| `formatter`       | null          | Function | a function that formats the generated string                      |
