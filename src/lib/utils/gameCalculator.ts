import type { GameScore, Point } from '../../types/tennis.types';

/**
 * @constant
 * @description Array of possible score notations in tennis (0, 15, 30, 40)
 * @type {string[]}
 */
const SCORE_NOTATION: string[] = ['0', '15', '30', '40'];

/**
 * @function calculateGameScore
 * @description Calculates the current game score based on the points played
 * @param {Point[]} points - Array of points played in the current game
 * @returns {GameScore} The current game score in tennis notation
 * 
 * @example
 * const points = [
 *   { pointNumber: 1, winner: 'WIN-' },
 *   { pointNumber: 2, winner: '-WIN' }
 * ];
 * const score = calculateGameScore(points); // Returns '15-15'
 */
export const calculateGameScore = (points: Point[]): GameScore => {
  // Count points for each player
  const player1Points = points.filter(point => point.winner === 'WIN-').length;
  const player2Points = points.filter(point => point.winner === '-WIN').length;

  // Game won
  if (player1Points >= 4 && player1Points >= player2Points + 2) return 'WIN-';
  if (player2Points >= 4 && player2Points >= player1Points + 2) return '-WIN';

  // Advantage
  if (player1Points > player2Points) {
    return 'AV-' as GameScore;
  }
  if (player2Points > player1Points) {
    return '-AV' as GameScore;
  }

  // Deuce
  if (player1Points === player2Points) {
    return `${SCORE_NOTATION[player1Points]}-${SCORE_NOTATION[player2Points]}` as GameScore;
  }

  // Normal score
  if (player1Points < 4 && player2Points < 4) {
    return `${SCORE_NOTATION[player1Points]}-${SCORE_NOTATION[player2Points]}` as GameScore;
  }

  return '0-0' as GameScore;
};
