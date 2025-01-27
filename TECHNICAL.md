## Main Components

### MatchInit
Handles match initialization:
- Players names and levels input
- Points generation
- Data validation

### ScoreBoard
Displays match score:
- Sets score
- Current game score
- Match status (in progress/finished)

## Utilities

### gameCalculator
Calculates game score according to tennis rules:
- Points handling (0, 15, 30, 40)
- Advantage handling
- Tiebreak handling

### setCalculator
Calculates set score:
- Victory at 6 games with 2 games difference
- Tiebreak handling at 6-6

### matchCalculator
Manages complete match logic:
- Sets calculation
- Winner determination
- Match status

## API

### POST /api/score
Calculates complete match score:
```typescript
// Request
{
  points: Point[],
  player1: Player,
  player2: Player
}

// Response
{
  status: string,
  sets: number[][],
  currentGame: {
    score: GameScore,
    player1Score: string,
    player2Score: string
  },
  players: {
    player1: string,
    player2: string
  }
}
```