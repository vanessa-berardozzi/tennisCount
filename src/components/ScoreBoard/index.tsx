'use client'
import type { SetScore, GameScore, APIResponse} from '@/types/tennis.types'
import styles from './ScoreBoard.module.css'

/**
 * @interface ScoreBoardProps
 * @description Props for the ScoreBoard component, extends APIResponse
 * @extends APIResponse
 * @property {string} status - Current match status
 * @property {SetScore[]} sets - Array of set scores
 * @property {Object} currentGame - Current game information
 * @property {GameScore} currentGame.score - Current game score
 * @property {string} currentGame.player1Score - Player 1's current score
 * @property {string} currentGame.player2Score - Player 2's current score
 * @property {Object} players - Players information
 * @property {string} players.player1 - Player 1's name
 * @property {string} players.player2 - Player 2's name
 * @property {boolean} isMatchFinished - Indicates if match is finished
 * @property {string | null} winner - Winner's name or null if match ongoing
 */
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

/**
 * @component ScoreBoard
 * @description Displays the current tennis match score including sets and current game
 * 
 * @param {ScoreBoardProps} props - The component props
 * @param {string} props.status - Current match status
 * @param {SetScore[]} props.sets - Array of set scores
 * @param {Object} props.currentGame - Current game information
 * @param {Object} props.players - Players information
 * 
 * @example
 * <ScoreBoard 
 *   status="In Progress"
 *   sets={[[6,4], [2,1]]}
 *   currentGame={{ score: "30-15", player1Score: "30", player2Score: "15" }}
 *   players={{ player1: "Player 1", player2: "Player 2" }}
 * />
 * 
 * @returns {JSX.Element} The ScoreBoard component
 */
export const ScoreBoard = ({ status, sets, currentGame, players }: ScoreBoardProps) => {
  return (
    <div>
      <h3>Statut : {status}</h3>
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