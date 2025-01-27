/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react'
import { MatchInit } from '@/components/MatchInit'
import { ScoreBoard } from '@/components/ScoreBoard'
import type { Point, Player, APIResponse } from '@/types/tennis.types'

export default function Home() {
  const [points, setPoints] = useState<Point[]>([])
  const [matchData, setMatchData] = useState<APIResponse | null>(null)

  const handlePointsGenerated = async (
    generatedPoints: Point[], 
    player1: Player, 
    player2: Player
  ) => {
    setPoints(generatedPoints)
    
    const response = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points: generatedPoints, player1, player2 })
    })
    
    const data = await response.json()
    setMatchData(data)
  }

  return (
    <main>
      <MatchInit onPointsGenerated={handlePointsGenerated} />
      {matchData && <ScoreBoard {...matchData} />}
    </main>
  )
}