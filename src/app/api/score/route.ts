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

    const matchScore = calculateMatchScore(games)

    // Determine winner and status
    const player1Sets = matchScore.sets.filter(set => set[0] > set[1]).length;
    const player2Sets = matchScore.sets.filter(set => set[1] > set[0]).length;
    const isMatchFinished = player1Sets >= 3 || player2Sets >= 3;

    const remainingPoints = points.slice(games.length * 4);

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
        ? `Victoire de ${player1Sets > player2Sets ? player1.name : player2.name}` 
        : "Jeu en cours, pas de vainqueur",
      sets: matchScore.sets.slice(0, 3),
      currentGame,
      players: {
        player1: player1.name,
        player2: player2.name
      },
      isMatchFinished,
      winner: isMatchFinished 
        ? (player1Sets > player2Sets ? player1.name : player2.name)
        : null
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Error calculating match score', err },
      { status: 500 }
    )
  }
}