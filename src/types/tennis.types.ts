/**
 * @typedef {1|2|3|4|5|6|7|8|9|10} PlayerLevel
 * Tennis player level, from 1 to 10
 */
export type PlayerLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * @typedef {Object} Player
 * @description Represents a tennis player
 * @property {string} name - Player's name
 * @property {PlayerLevel} level - Player's level
 */
export type Player = {
    name: string;
    level: PlayerLevel;   
};

/**
 * @typedef {Object} Point
 * @description Represents a point played in a match
 * @property {number} pointNumber - Point number in the match
 * @property {string} winner - Name of the player who won the point
 */
export type Point = {
    pointNumber: number;
    winner: string;
};

/**
 * @typedef {string} GameScore
 * @description Possible tennis game scores
 */
export type GameScore = 
  | "0-0" | "15-0" | "30-0" | "40-0" 
  | "0-15" | "15-15" | "30-15" | "40-15"
  | "0-30" | "15-30" | "30-30" | "40-30"
  | "0-40" | "15-40" | "30-40" | "40-40"
  | "AV-" | "-AV" | "WIN-" | "-WIN";

/**
 * @typedef {number[]} SetScore
 * @description Set score represented by an array of numbers
 */
export type SetScore = number[];

/**
 * @typedef {Object} MatchScore
 * @description Represents the complete match score
 * @property {SetScore[]} sets - Array of played sets
 * @property {GameScore} currentGame - Current game score
 * @property {boolean} isMatchFinished - Indicates if the match is finished
 * @property {string} [winner] - Name of the match winner
 * @property {Player} [player1] - First player
 * @property {Player} [player2] - Second player
 */
export type MatchScore = {
    sets: SetScore[];
    currentGame: GameScore;
    isMatchFinished: boolean;
    winner?: string;
    player1?: Player;
    player2?: Player;
};

/**
 * @typedef {Object} MatchHistory
 * @description Complete match history
 * @property {string} matchId - Unique match identifier
 * @property {Date} date - Match date
 * @property {Player} player1 - First player
 * @property {Player} player2 - Second player
 * @property {MatchScore} finalScore - Final match score
 * @property {Point[]} points - List of played points
 */
export type MatchHistory = {
    matchId: string;
    date: Date;
    player1: Player;
    player2: Player;
    finalScore: MatchScore;
    points: Point[];
};

/**
 * @interface APIResponse
 * @description API Response for a match
 * @property {string} status - Response status
 * @property {SetScore[]} sets - Array of played sets
 * @property {Object} currentGame - Current game information
 * @property {GameScore} currentGame.score - Current game score
 * @property {string} currentGame.player1Score - Player 1 score
 * @property {string} currentGame.player2Score - Player 2 score
 * @property {Object} players - Players information
 * @property {string} players.player1 - Player 1 name
 * @property {string} players.player2 - Player 2 name
 * @property {boolean} isMatchFinished - Indicates if the match is finished
 * @property {string|null} winner - Winner name or null if match is not finished
 */
export interface APIResponse {
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