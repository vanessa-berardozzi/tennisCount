import { NextResponse } from 'next/server'
import { calculateMatchScore } from '@/lib/utils/matchCalculator'
import { calculateGameScore } from '@/lib/utils/gameCalculator'
import type { GameScore } from '@/types/tennis.types'

export async function POST(request: Request) {
  try {
    const { points, player1, player2 } = await request.json()

    // Group points into complete games (4 points)
    const games: string[][] = [];
    for (let i = 0; i < points.length; i += 4) {
      const game: string[] = points.slice(i, i + 4).map((p: { winner: string }) => p.winner);
      if (game.length === 4) {
        games.push(game);
      }
    }

    const matchScore = calculateMatchScore(games);

    // Compter les sets gagnés
    let player1Sets = 0;
    let player2Sets = 0;
    let isMatchFinished = false;
    
    for (let i = 0; i < matchScore.sets.length && !isMatchFinished; i++) {
      const [p1Score, p2Score] = matchScore.sets[i];
      if ((p1Score === 6 && p1Score >= p2Score + 2) || p1Score === 7) {
        player1Sets++;
        if (player1Sets === 3) isMatchFinished = true;
      }
      if ((p2Score === 6 && p2Score >= p1Score + 2) || p2Score === 7) {
        if (++player2Sets === 3) isMatchFinished = true;
      }
    }

    // Ne prendre que les points jusqu'à la fin du match
    const remainingPoints = isMatchFinished ? [] : 
      points.slice(games.length * 4);

    // If match is not finished and there are remaining points
    const gameScore = !isMatchFinished && remainingPoints.length > 0
      ? calculateGameScore(remainingPoints)
      : "0-0" as GameScore;

    // Format currentGame
    const currentGame = {
      score: gameScore,
      player1Score: !isMatchFinished && remainingPoints.length > 0
        ? (gameScore === "AV-" ? "AV" : gameScore.split("-")[0])
        : "-",
      player2Score: !isMatchFinished && remainingPoints.length > 0
        ? (gameScore === "-AV" ? "AV" : gameScore.split("-")[1])
        : "-"
    }

    return NextResponse.json({
      status: isMatchFinished 
        ? `Victoire de ${player1Sets === 3 ? player1.name : player2.name}` 
        : "Jeu en cours, pas de vainqueur",
      sets: matchScore.sets.slice(0, 3),
      currentGame,
      players: {
        player1: player1.name,
        player2: player2.name
      },
      isMatchFinished,
      winner: isMatchFinished 
        ? (player1Sets === 3 ? player1.name : player2.name)
        : null
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Error calculating match score', err },
      { status: 500 }
    )
  }
}