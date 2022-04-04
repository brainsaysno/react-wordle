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
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);

  const handleGuess = (newGuess: string): void => {
    if (
      newGuess.length === targetWord.length &&
      !guesses.includes(newGuess) &&
      guesses.length < totalTries
    ) {
      setGuesses([...guesses, newGuess]);
    }
    // Win condition
    if (newGuess === targetWord) {
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setGuesses([]);
    setIsPlaying(true);
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
    <GameArea>
      <WordArea>{guessesElements}</WordArea>

      <GuessArea>
        <GuessInput
          onInput={handleGuess}
          wordLength={5}
          disabled={!isPlaying}
        />
      </GuessArea>

      <br />
      <button onClick={handleReset}>Reset game</button>
    </GameArea>
  );
}

export default GameController;

const GameArea = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
