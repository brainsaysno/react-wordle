interface GameSettingsInterface {
  targetWord: string;
  wordLength: number;
  totalTries: number;
}

const GameSettings: GameSettingsInterface = {
  targetWord: "train",
  wordLength: 5,
  totalTries: 6,
};

export default GameSettings;
