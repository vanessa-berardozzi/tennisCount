 
import type { Point, Player } from '../types/tennis.types';

export const generatePoints = (player1: Player, player2: Player): Point[] => {
  const points: Point[] = [];
  const totalPoints = 150;
  
  const totalLevel = player1.level + player2.level;
  const player1Probability = player1.level / totalLevel;
  
  for (let i = 1; i <= totalPoints; i++) {
    const random = Math.random();
    const winner = random < player1Probability ? player1.name : player2.name;
    
    points.push({
      pointNumber: i,
      winner: winner
    });
  }
  
  return points;
};