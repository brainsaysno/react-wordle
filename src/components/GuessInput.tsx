import React, { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  onInput: (newGuess: string) => void;
  wordLength: number;
}

function GuessInput({ onInput, wordLength }: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInput(inputValue);
    setInputValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={wordLength}
        />
      </form>
    </>
  );
}

export default GuessInput;