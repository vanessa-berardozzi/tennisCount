import type { SetScore } from '../../types/tennis.types';

export const calculateSetScore = (games: string[]): SetScore => {
  if (games.length === 0) return [0, 0];
  
  const player1Games = games.filter(game => game === 'WIN-').length;
  const player2Games = games.filter(game => game === '-WIN').length;


  // Direct win at 6 games with 2-game difference
  if (player1Games >= 6 && player1Games >= player2Games + 2) {
    return [player1Games, player2Games];
  }
  if (player2Games >= 6 && player2Games >= player1Games + 2) {
    return [player1Games, player2Games];
  }

 // Extended set
  if ((player1Games === 7 && player2Games === 5) || 
      (player2Games === 7 && player1Games === 5)) {
    return [player1Games, player2Games];
  }


  // Tie-break at 6-6
  if (player1Games === 6 && player2Games === 6) {
    return [6, 6];
  }

  return [player1Games, player2Games];
};