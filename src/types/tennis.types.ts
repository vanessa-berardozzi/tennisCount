export type PlayerLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Player = {
  name: string;
  level: PlayerLevel;
};
export type Point = {
  pointNumber: number;
  winner: string;
};
export type GameScore = "0" | "15" | "30" | "40" | "AV" | "40-40" | "AV-" | "-AV"| "-WIN" | "WIN-";

export type SetScore = number[];

export type MatchScore = {
  sets: SetScore[];
  currentGame: GameScore;
  isMatchFinished: boolean;
};