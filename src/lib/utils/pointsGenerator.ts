import type { Point, Player } from '../../types/tennis.types';

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