 
import { Player } from "@/types/tennis.types";
import { generatePoints } from "@/utils/pointsGenerator";

describe('Points Generator' , () => {
  test('Should génerate 150 points', () =>{
    const player1: Player = {name : "Joueur 1", level : 2};
    const player2: Player = {name : "Joueur 2", level : 4};
    const points = generatePoints(player1, player2);

    expect(points).toHaveLength(150);                         
    expect(points[0]).toHaveProperty('pointNumber');         
    expect(points[0]).toHaveProperty('winner');             
    expect(points[0].pointNumber).toBe(1);    
  })

  test('Should give more points to the player with higher level', () => {

const player1:    Player ={
  name: "Stronger Player",
  level: 7
}

const player2 : Player = {
    name: "weakerPlayer",
    level: 5
}
const points = generatePoints(player1 ,player2)

 const strongerPlayerWins = points.filter(point => point.winner === player1.name).length;
  const weakerPlayerWins = points.filter(point => point.winner === player2.name).length;

  expect(strongerPlayerWins).toBeGreaterThan(weakerPlayerWins);
  });
}) ;



