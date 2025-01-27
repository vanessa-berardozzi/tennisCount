/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react'
import { MatchInit } from '@/components/MatchInit'
import { ScoreBoard } from '@/components/ScoreBoard/index'
import type { Point, Player, APIResponse } from '@/types/tennis.types'

/**
 * @component Home
 * @description Main page component that manages the tennis match state and score calculation
 * 
 * @returns {JSX.Element} The Home page component
 */
export default function Home() {
  const [points, setPoints] = useState<Point[]>([])
  const [matchData, setMatchData] = useState<APIResponse | null>(null)

  /**
   * @function handlePointsGenerated
   * @description Handles the points generation and calls the API to calculate the match score
   * 
   * @param {Point[]} generatedPoints - Array of generated match points
   * @param {Player} player1 - First player information
   * @param {Player} player2 - Second player information
   * 
   * @returns {Promise<void>}
   */
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