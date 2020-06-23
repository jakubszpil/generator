import React, { useEffect, useState, useRef } from 'react';
import './Generator.css';

const REGEX = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

// components
function GeneratedWord({ word }) {
  const handleClick = () => navigator.clipboard.writeText(word);
  return (
    <button className="app-btn" onClick={handleClick}>
      {word}
    </button>
  );
}
function GeneratedWords({ words }) {
  if (words.length < 1) return null;
  return (
    <div>
      <p style={{ marginBottom: 20 }}>Click any name to copy</p>
      {words.map((word, key) => (
        <GeneratedWord word={word} key={key} />
      ))}
    </div>
  );
}

// words operations
const syllabify = (word) => word.match(REGEX);
const concat = (...words) =>
  words.reduce((a, c) => {
    const l = a.charAt(a.length - 1);
    const f = c.charAt(0);
    return a + (l === f ? c.slice(1) : c);
  }, '');

// main component
function Generator() {
  const [words, setWords] = useState([]);
  const [generatedWords, setGeneratedWords] = useState([]);

  let input = useRef(null);

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setWords([...words, input.value]);
    input.value = null;
  };
  const handleReset = (e) => {
    input.value = null;
    setWords([]);
    setGeneratedWords([]);
  };

  //generating new words
  const generate = (arr, a = a < arr.length ? a : arr.length, c = a) => {
    if (a < 2) return arr;
    //concating arrays
    const carr = (l, r) => {
      const s = Array.from(l)
        .map((li) => {
          return Array.from(r)
            .filter((ri) => ri !== li && ri.indexOf(li) === -1)
            .map((ri) => concat(li, ri));
        })
        .flat();
      return a == c ? s : [...l, ...s];
    };
    return carr(arr, generate(arr, a - 1, c + 1));
  };

  useEffect(() => {
    const flattenWords = [...words.map(syllabify).flat()];
    setGeneratedWords(generate(flattenWords, flattenWords.length));
  }, [words]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} onReset={handleReset} className="form">
        <label className="form__label" htmlFor="word">
          Enter word:{' '}
        </label>
        <input
          className="form__input form__input--text"
          type="text"
          ref={(e) => (input = e)}
          onSubmit={handleSubmit}
          id="word"
        />
        <input
          type="reset"
          value="Reset"
          className="form__input form__input--reset"
        />
        {words.length > 0 && (
          <ul className="form-queries">
            {words.map((word, key) => (
              <li key={key} className="form-queries__item">
                {word}
              </li>
            ))}
          </ul>
        )}
      </form>

      <GeneratedWords words={generatedWords} />
    </React.Fragment>
  );
}

export default Generator;
