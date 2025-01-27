'use client'
import type { SetScore, GameScore, APIResponse} from '@/types/tennis.types'
import styles from './ScoreBoard.module.css'

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
      <table className={styles.scoreTable}>
        <thead>
          <tr>
            <th className={styles.cell}></th>
            {sets.slice(0, 3).map((_, index) => (
              <th key={index} className={styles.cell}>Set {index + 1}</th>
            ))}
            <th className={styles.cell}>Current Game</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.cell}>{players.player1}</td>
            {sets.slice(0, 3).map((set, index) => (
              <td key={index} className={styles.cell}>{set[0]}</td>
            ))}
            <td className={styles.cell}>{currentGame.player1Score}</td>
          </tr>
          <tr>
            <td className={styles.cell}>{players.player2}</td>
            {sets.slice(0, 3).map((set, index) => (
              <td key={index} className={styles.cell}>{set[1]}</td>
            ))}
            <td className={styles.cell}>{currentGame.player2Score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}