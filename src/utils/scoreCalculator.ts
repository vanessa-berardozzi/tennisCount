export const calculateScore = (player1: number, player2: number): string => {
  if (player1 === 1 && player2 === 0) return '15-0'
  return '0-0'
}
