import Dictionary from "./Dictionary";

interface GameSettingsInterface {
  targetWord: string;
  wordLength: number;
  totalTries: number;
}

const GameSettings: GameSettingsInterface = {
  targetWord: Dictionary.getWord(5),
  wordLength: 5,
  totalTries: 6,
};

export default GameSettings;
