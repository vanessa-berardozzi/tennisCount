import type { GameScore, MatchScore } from '../../types/tennis.types';
import { calculateSetScore } from './setCalculator';

export const calculateMatchScore = (games: string[][]): MatchScore => {
  if (games.length === 0) {
    return {
      sets: [[0, 0]],
      currentGame: '0-0' as GameScore,
      isMatchFinished: false
    };
  }

  // Group games into sets
  const setGames: string[][] = [];
  let currentSetGames: string[] = [];
  
  games.forEach(game => {
    // Determine the game winner (3 points or more)
    const winner = game.filter(point => point === 'WIN-').length >= 3 ? 'WIN-' : '-WIN';
    currentSetGames.push(winner);
    
    // Check if set is finished
    const p1Games = currentSetGames.filter(g => g === 'WIN-').length;
    const p2Games = currentSetGames.filter(g => g === '-WIN').length;
    
    if ((p1Games >= 6 && p1Games >= p2Games + 2) || 
        (p2Games >= 6 && p2Games >= p1Games + 2) ||
        p1Games === 7 || p2Games === 7) {
      setGames.push([...currentSetGames]);
      currentSetGames = [];
    }
  });

  // Add the current unfinished set
  if (currentSetGames.length > 0) {
    setGames.push(currentSetGames);
  }

  // Calculate each set score
  const setScores = setGames.map(set => calculateSetScore(set));

  // Determine if match is finished
  const player1Sets = setScores.filter(score => score[0] > score[1]).length;
  const player2Sets = setScores.filter(score => score[1] > score[0]).length;
  const isMatchFinished = player1Sets >= 3 || player2Sets >= 3;

  return {
    sets: setScores,
    currentGame: '0-0' as GameScore,
    isMatchFinished
  };
};