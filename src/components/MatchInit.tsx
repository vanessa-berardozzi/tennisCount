'use client'
import { useState } from 'react'
import { generatePoints } from '@/lib/utils/pointsGenerator'
import type { Point, Player, PlayerLevel } from '@/types/tennis.types'
import { Modal } from './Modal/index'

/**
 * @interface MatchInitProps
 * @description Props for the MatchInit component
 * @property {Function} onPointsGenerated - Callback function called when points are generated
 */
interface MatchInitProps {
  onPointsGenerated: (points: Point[], player1: Player, player2: Player) => void;
}

/**
 * @component MatchInit
 * @description Component for initializing a tennis match with two players and generating points
 * 
 * @param {MatchInitProps} props - The component props
 * @returns {JSX.Element} The MatchInit component
 */
export const MatchInit = ({ onPointsGenerated }: MatchInitProps) => {
  const [players, setPlayers] = useState<{
    player1: Player,
    player2: Player
  }>({
    player1: { name: '', level: 5 as PlayerLevel },
    player2: { name: '', level: 5 as PlayerLevel }
  });
 const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGeneratePoints = () => {


 try {
      // Check if the player names are provided
      if (!players.player1.name || !players.player2.name) {
        setError("Les noms des joueurs sont requis");
        return;
      }


   const generatedPoints = generatePoints(players.player1, players.player2);
      setPoints(generatedPoints);
      setError(null);
      onPointsGenerated(generatedPoints, players.player1, players.player2);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur s'est produite");
    }
  };




const validateLevel = (level: number): PlayerLevel => {
  if (level >= 1 && level <= 10) {
    return level as PlayerLevel;
  }
  return 1;
};
  
const handleLevelChange = (player: 'player1' | 'player2', newLevel: number) => {
  const validLevel = validateLevel(newLevel);
  
  setPlayers(prev => ({
    ...prev,
    [player]: {
      ...prev[player],
      level: validLevel
    }
  }));
};



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
  {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Points générés :</h3>
        {points.map((point, index) => (
          <div key={index}>
            Point {point.pointNumber} : gagné par {
              point.winner === 'WIN-' ? players.player1.name : players.player2.name
            }
          </div>
        ))}
      </Modal>
    </div>
  );
};
