'use client'
import { useState } from 'react'
import { generatePoints } from '@/lib/utils/pointsGenerator'
import type { Point, Player, PlayerLevel } from '@/types/tennis.types'
import { Modal } from './Modal'

interface MatchInitProps {
  onPointsGenerated: (points: Point[], player1: Player, player2: Player) => void;
}

export const MatchInit = ({ onPointsGenerated }: MatchInitProps) => {
  const [players, setPlayers] = useState<{
    player1: Player,
    player2: Player
  }>({
    player1: { name: '', level: 5 as PlayerLevel },
    player2: { name: '', level: 5 as PlayerLevel }
  });

  const [points, setPoints] = useState<Point[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGeneratePoints = () => {
    const generatedPoints = generatePoints(players.player1, players.player2);
    setPoints(generatedPoints);
    onPointsGenerated(generatedPoints, players.player1, players.player2);
  };

  
  const handleLevelChange = (player: 'player1' | 'player2', value: number) => {
    // Ensure value is between 1 and 10
    const level = Math.min(Math.max(value, 1), 10) as PlayerLevel
    setPlayers(prev => ({
      ...prev,
      [player]: {...prev.player1, level}
    }))
  }



  return (
    <div>
      <h1>TennisCount</h1>
      
      <div>
        <h2>Joueur 1</h2>
        <input 
          type="text"
          placeholder="Nom du joueur 1"
          value={players.player1.name}
          onChange={(e) => setPlayers(prev => ({
            ...prev,
            player1: {...prev.player1, name: e.target.value}
          }))}
        />
        <input 
          type="number"
          min="1"
          max="10"
          value={players.player1.level}
          onChange={(e) => handleLevelChange('player1', parseInt(e.target.value))}
        />
      </div>

      <div>
        <h2>Joueur 2</h2>
        <input 
          type="text"
          placeholder="Nom du joueur 2"
          value={players.player2.name}
          onChange={(e) => setPlayers(prev => ({
            ...prev,
            player2: {...prev.player2, name: e.target.value}
          }))}
        />
        <input 
          type="number"
          min="1"
          max="10"
          value={players.player2.level}
          onChange={(e) => handleLevelChange('player2', parseInt(e.target.value))}
        />
      </div>

      <button onClick={handleGeneratePoints}>Générer les points</button>

      {points.length > 0 && (
        <button onClick={() => setIsModalOpen(true)}>
          Afficher les points
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Points générés:</h3>
        {points.map((point, index) => (
          <div key={index}>
            Point {point.pointNumber} : remporté par {
              point.winner === 'WIN-' ? players.player1.name : players.player2.name
            }
          </div>
        ))}
      </Modal>
    </div>
  );
};

 