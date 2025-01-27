'use client'
import type { SetScore, GameScore, APIResponse} from '@/types/tennis.types'


interface ScoreBoardProps extends APIResponse {
  status: string;
  sets: SetScore[];
  currentGame: {
    score: GameScore;
    player1Score: string;
    player2Score: string;
  };
  players: {
    player1: string;
    player2: string;
  };
  isMatchFinished: boolean;
  winner: string | null;
}

export const ScoreBoard = ({ status, sets, currentGame, players }: ScoreBoardProps) => {
  return (
    <div>
      <h3>Résultat : {status}</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            {sets.slice(0, 3).map((_, index) => (
              <th key={index}>Set {index + 1}</th>
            ))}
            <th>Current Game</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{players.player1}</td>
            {sets.slice(0, 3).map((set, index) => (
              <td key={index}>{set[0]}</td>
            ))}
            <td>{currentGame.player1Score}</td>
          </tr>
          <tr>
            <td>{players.player2}</td>
            {sets.slice(0, 3).map((set, index) => (
              <td key={index}>{set[1]}</td>
            ))}
            <td>{currentGame.player2Score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}