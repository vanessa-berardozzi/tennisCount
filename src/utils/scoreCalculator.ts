import type { GameScore } from '../types/tennis.types';

const SCORE_NOTATION: GameScore[] = ["0", "15", "30", "40"];

export const calculateGameScore = (player1Points: number, player2Points: number): GameScore => {

  // Normal score
  if (player1Points < 4 && player2Points < 4) {
    return `${SCORE_NOTATION[player1Points]}-${SCORE_NOTATION[player2Points]}` as GameScore;
  }

  // Deuce
  if (player1Points >= 3 && player2Points >= 3 && player1Points === player2Points) {
    return "40-40" as GameScore;
  }

  // Advantage
  if (player1Points >= 4 && player1Points === player2Points + 1) return "AV-" as GameScore;
  if (player2Points >= 4 && player2Points === player1Points + 1) return "-AV" as GameScore;


  // Victory
  if (player1Points >= 4 && player1Points >= player2Points + 2) return "WIN-" as GameScore;
  if (player2Points >= 4 && player2Points >= player1Points + 2) return "-WIN" as GameScore;

  return "0-0" as GameScore;
};