import React from "react";
import styled from "styled-components";

interface FilledProps {
  guessedWord?: string;
  targetWord: string;
}

function WordGuessed({ guessedWord, targetWord }: FilledProps): JSX.Element {
  enum Accuracy {
    Incorrect = 0,
    OutOfPlace = 1,
    Correct = 2,
  }

  let letterElements: JSX.Element[];

  if (guessedWord) {
    const accuracy: Accuracy[] = [];

    for (let i = 0; i < targetWord.length; i++) {
      if (guessedWord[i] === targetWord[i]) {
        accuracy.push(Accuracy.Correct);
      } else if (targetWord.includes(guessedWord[i])) {
        accuracy.push(Accuracy.OutOfPlace);
      } else {
        accuracy.push(Accuracy.Incorrect);
      }
    }
    letterElements = accuracy.map((acc, i) => {
      const LetterElement =
        acc === Accuracy.Correct
          ? CorrectBox
          : acc === Accuracy.OutOfPlace
          ? OutOfPlaceBox
          : IncorrectBox;
      return <LetterElement key={i}>{guessedWord[i]}</LetterElement>;
    });
  } else {
    letterElements = Array(targetWord.length).fill(<IncorrectBox />);
  }

  return <WordContainer>{letterElements}</WordContainer>;
}

export default WordGuessed;

const WordContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;

const LetterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 5vw;
  width: 5vw;
  border: 1px solid gray;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
`;

const CorrectBox = styled(LetterBox)`
  background-color: green;
`;

const IncorrectBox = styled(LetterBox)`
  background-color: black;
`;

const OutOfPlaceBox = styled(LetterBox)`
  background-color: yellow;
  color: black;
`;
