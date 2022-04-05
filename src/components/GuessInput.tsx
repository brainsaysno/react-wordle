import React, { ChangeEvent, FormEvent, useState } from "react";
import Dictionary from "../Dictionary";
import GameSettings from "../GameSettings";

interface Props {
  onInput: (newGuess: string) => void;
  disabled: boolean;
}

function GuessInput({ onInput, disabled }: Props) {
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
          maxLength={GameSettings.wordLength}
          disabled={disabled}
        />
      </form>
    </>
  );
}

export default GuessInput;
