import type { GameScore, MatchScore } from '../../types/tennis.types';
import { calculateSetScore } from './setCalculator';
import { calculateGameScore } from './gameCalculator';

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

  // Calculate each set score and determine winners
  const setScores = setGames.map(set => calculateSetScore(set));

  // Compter les sets terminés et arrêter dès qu'un joueur gagne 3 sets
  let player1WonSets = 0;
  let player2WonSets = 0;
  let matchFinished = false;

  for (const score of setScores) {
    if (matchFinished) break;

    const [p1Score, p2Score] = score;
    if ((p1Score === 6 && p1Score >= p2Score + 2) || p1Score === 7) {
      player1WonSets++;
      if (player1WonSets === 3) matchFinished = true;
    }
    if ((p2Score === 6 && p2Score >= p1Score + 2) || p2Score === 7) {
      player2WonSets++;
      if (player2WonSets === 3) matchFinished = true;
    }
  }

  return {
    sets: setScores.slice(0, 3),
    currentGame: matchFinished ? '0-0' as GameScore : 
      games.length > 0 ? calculateGameScore(games[games.length - 1].map((winner, index) => ({
        pointNumber: index + 1,
        winner
      }))) : '0-0' as GameScore,
    isMatchFinished: matchFinished
  };
};