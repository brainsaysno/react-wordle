import React, { useEffect } from "react";
import styled from "styled-components";
import GuessInput from "./GuessInput";
import WordGuessed from "./WordGuessed";

function GameController(): JSX.Element {
  const totalTries = 6;
  const targetWord: string = "train";
  const [guesses, setGuesses] = React.useState<string[]>([]);
  const [guessesElements, setGuessesElements] = React.useState<JSX.Element[]>(
    []
  );

  const handleGuess = (newGuess: string): void => {
    if (
      newGuess.length === targetWord.length &&
      !guesses.includes(newGuess) &&
      guesses.length < totalTries
    ) {
      setGuesses([...guesses, newGuess]);
    }
  };

  useEffect(() => {
    console.log(guesses);
    const newGuessesElements = guesses.map((guess, i) => (
      <WordGuessed key={i} guessedWord={guess} targetWord={targetWord} />
    ));
    for (let i = guesses.length; i < totalTries; i++) {
      newGuessesElements.push(<WordGuessed key={i} targetWord={targetWord} />);
    }
    setGuessesElements(newGuessesElements);
  }, [guesses]);

  return (
    <>
      <WordArea>{guessesElements}</WordArea>

      <GuessArea>
        <GuessInput onInput={handleGuess} wordLength={5} />
      </GuessArea>

      <br />
      <button onClick={() => setGuesses([])}>Clear</button>
    </>
  );
}

export default GameController;

const WordArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;

const GuessArea = styled.div`
  padding: 5rem;
`;
