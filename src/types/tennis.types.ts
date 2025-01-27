export type PlayerLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Player = {
    name: string;
    level: PlayerLevel;   
};

export type Point = {
  pointNumber: number;
  winner: string;
};

export type GameScore = 
  | "0-0" | "15-0" | "30-0" | "40-0" 
  | "0-15" | "15-15" | "30-15" | "40-15"
  | "0-30" | "15-30" | "30-30" | "40-30"
  | "0-40" | "15-40" | "30-40" | "40-40"
  | "AV-" | "-AV" | "WIN-" | "-WIN";

export type SetScore = number[];

export type MatchScore = {
    sets: SetScore[];
    currentGame: GameScore;
    isMatchFinished: boolean;
    winner?: string;
    player1?: Player;
    player2?: Player;
};

export type MatchHistory = {
    matchId: string;
    date: Date;
    player1: Player;
    player2: Player;
    finalScore: MatchScore;
    points: Point[];
};

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