# Generate Unique String

`generate-unique-string` generates a random string using english words and numbers. The code is developed based on the [random-words](https://github.com/apostrophecms/random-words).

### Installation

```
npm install generate-unique-string
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
| `separator`       | " " (space)   | String   | the separator that goes between the words in the generated string |
| `seed`            | null          | String   | seed that is used for initializing the generator                  |
| `formatter`       | null          | Function | a function that formats the generated string                      |

### Examples

First of all, import the `generate` method using the following syntax:

```js
import { generate } from "generate-unique-string";
```

If you want a string with a word that is 5 letters long followed by 3 numbers, you can do the following:

```js
generate({
  minLength: 5,
  maxLength: 5,
  minNumberLength: 3,
  maxNumberLength: 3,
});
// example result: 'ocean799'
```

If you want 3 strings and want each of them to be longer than 7 letters, you can do the following:

```js
generate({ minLength: 7, exactly: 3 });
// example result: ['customer', 'licence', 'solution']
```

If you want 2 to 5 strings and want each of them to be composed of 3 words, you can do the following:

```js
generate({ min: 2, max: 5, wordsPerString: 3 });
// example result: ['cleaners combining wheat', 'hispanic ruled for', 'illinois adam legislative']
```

The seed will help yield exactly the same results multiple times when the same `seed` was used and the other inputs are identical

```js
console.log(generate({ min: 2, max: 3, seed: "my-seed" }));
//output: ['plenty', 'pure']

console.log(generate({ min: 2, max: 3, seed: "my-seed" }));
//output: ['plenty', 'pure']
```

Other examples are as follows:

```js
console.log(generate());
//output: 'army'

console.log(generate(5));
//output: ['army', 'beautiful', 'became', 'if', 'actually']

console.log(generate({ min: 3, max: 10 }));
//output: ['became', 'arrow', 'article', 'therefore']

console.log(generate({ exactly: 2 }));
//output: ['beside', 'between']

console.log(generate({ exactly: 5, join: " " }));
//output: 'army beautiful became if exactly'

console.log(generate({ exactly: 5, join: "" }));
//output: 'armybeautifulbecameifexactly'

console.log(generate({ exactly: 2, minLength: 4 }));
//output: ['atom', 'window']

console.log(generate({ exactly: 5, maxLength: 4 }));
//output: ['army', 'come', 'eye', 'five', 'fur']

console.log(generate({ exactly: 3, minLength: 5, maxLength: 100000 }));
//output: ['understanding', 'should', 'yourself']

console.log(generate({ exactly: 5, wordsPerString: 2 }));
//output: [ 'salt practical', 'also brief', 'country muscle', 'neighborhood beyond', 'grew pig' ]

console.log(generate({ exactly: 5, wordsPerString: 2, separator: "-" }));
//output: [ 'equator-variety', 'salt-usually', 'importance-becoming', 'stream-several', 'goes-fight' ]

console.log(
  generate({
    exactly: 5,
    wordsPerString: 2,
    formatter: (word) => word.toUpperCase(),
  })
);
//output: [ 'HAVING LOAD', 'LOST PINE', 'GAME SLOPE', 'SECRET GIANT', 'INDEED LOCATION' ]
```
