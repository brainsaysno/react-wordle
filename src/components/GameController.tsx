import React, { useEffect } from "react";
import styled from "styled-components";
import GuessInput from "./GuessInput";
import WordGuessed from "./WordGuessed";
import GameSettings from "../GameSettings";
import Dictionary from "../Dictionary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function GameController(): JSX.Element {
  const [guesses, setGuesses] = React.useState<string[]>([]);
  const [guessesElements, setGuessesElements] = React.useState<JSX.Element[]>(
    []
  );
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);

  const handleGuess = (newGuess: string): void => {
    if (
      newGuess.length === GameSettings.targetWord.length &&
      !guesses.includes(newGuess) &&
      guesses.length < GameSettings.totalTries
    ) {
      setGuesses([...guesses, newGuess]);
    }
    // Win condition
    if (newGuess === GameSettings.targetWord) {
      toast.success("You win!");
      setIsPlaying(false);
    }
    // Lose condition
    if (guesses.length === GameSettings.totalTries - 1) {
      toast.error(
        `You lose... The correct word was ${GameSettings.targetWord.toUpperCase()}`
      );
      setIsPlaying(false);
      // Create toast with message and correct word
    }
  };

  const handleReset = () => {
    GameSettings.targetWord = Dictionary.getWord(GameSettings.wordLength);
    setGuesses([]);
    setIsPlaying(true);
  };

  useEffect(() => {
    console.log(GameSettings.targetWord);
    const newGuessesElements = guesses.map((guess, i) => (
      <WordGuessed key={i} guessedWord={guess} />
    ));
    for (let i = guesses.length; i < GameSettings.totalTries; i++) {
      newGuessesElements.push(<WordGuessed key={i} />);
    }
    setGuessesElements(newGuessesElements);
  }, [guesses]);

  return (
    <>
      <GameArea>
        <WordArea>{guessesElements}</WordArea>

        <GuessArea>
          <GuessInput onInput={handleGuess} disabled={!isPlaying} />
        </GuessArea>

        <br />
        <button onClick={handleReset}>Reset game</button>
      </GameArea>
      <ToastContainer />
    </>
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
