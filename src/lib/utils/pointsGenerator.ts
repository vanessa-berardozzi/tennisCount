import type { Point, Player } from '../../types/tennis.types';

/**
 * @function generatePoints
 * @description Génère des points aléatoires pour un match de tennis
 * @param {Player} player1 - Premier joueur
 * @param {Player} player2 - Second joueur
 * @returns {Point[]} Tableau de 150 points générés
 */
export const generatePoints = (player1: Player, player2: Player): Point[] => {
  const points: Point[] = [];
  const totalPoints = 150;
  
  // Calculate probability based on levels
  const totalLevel = player1.level + player2.level;
  const player1Probability = player1.level / totalLevel;
  
  // Generate 150 points
  for (let i = 1; i <= totalPoints; i++) {
    const random = Math.random();
    // Player with higher level has more chances to win
    const winner = random <= player1Probability ? 'WIN-' : '-WIN';
    
    points.push({
      pointNumber: i,
      winner
    });
  }
  
  return points;
};