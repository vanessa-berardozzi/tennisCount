import type { GameScore, MatchScore, SetScore } from '../types/tennis.types';
import { calculateSetScore } from './setCalculator';

export const calculateMatchScore = (sets: string[][]): MatchScore => {
  if (sets.length === 0) {
    return {
      sets: [],
      currentGame: '0-0' as GameScore,
      isMatchFinished: false
    };
  }

  // Calculer scores de chaque set
  const setScores: SetScore[] = sets.map(set => calculateSetScore(set));

  // Compter sets gagnés
  const player1SetsWon = setScores.filter(score => score[0] > score[1]).length;
  const player2SetsWon = setScores.filter(score => score[1] > score[0]).length;

  // Vérifier si victoire (3 sets)
  const isMatchFinished = player1SetsWon >= 3 || player2SetsWon >= 3;

  // Calculer le score actuel
  const currentScore = setScores.length > 0 ? setScores[setScores.length - 1] : [0, 0];
  const currentGame = `${currentScore[0]}-${currentScore[1]}` as GameScore;

  return {
    sets: setScores,
    currentGame,
    isMatchFinished
  };
};