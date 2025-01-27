import { calculateGameScore } from '../../../lib/utils/gameCalculator';
import { GameScore, Point } from '../../../types/tennis.types';

describe('Game Score Calculator', () => {
  test('should start with 0-0', () => {
    const points: Point[] = [];
    expect(calculateGameScore(points)).toBe('0-0' as GameScore);
  });

  test('should be 30-0 when first player wins two points', () => {
    const points = [
      { pointNumber: 1, winner: 'WIN-' },
      { pointNumber: 2, winner: 'WIN-' },
    ];
    expect(calculateGameScore(points)).toBe('AV-' as GameScore);
  });

  test('should be 15-15 when each player wins one point', () => {
    const points = [
      { pointNumber: 1, winner: 'WIN-' },
      { pointNumber: 2, winner: '-WIN' },
    ];
    expect(calculateGameScore(points)).toBe('15-15' as GameScore);
  });

  test('Should be 40-15 when first player wins three points and second player one', () => {
    const points = [
      { pointNumber: 1, winner: 'WIN-' },
      { pointNumber: 2, winner: '-WIN' },
      { pointNumber: 3, winner: 'WIN-' }, 
      { pointNumber: 4, winner: 'WIN-' },
    ];
    expect(calculateGameScore(points)).toBe('AV-' as GameScore);
  });

	//Deuce

	test('Should be 40-40 when both players win three points', () => {
		const points = [
			{ pointNumber: 1, winner: 'WIN-' },
			{ pointNumber: 2, winner: 'WIN-' },
			{ pointNumber: 3, winner: '-WIN' },
			{ pointNumber: 4, winner: 'WIN-' },
			{ pointNumber: 5, winner: '-WIN' },
			{ pointNumber: 6, winner: '-WIN' },
		];
		expect(calculateGameScore(points)).toBe('40-40' as GameScore);
	});

	//Advantage player1

	test('Should be AV- when first player win one point after deuce', () => {
		const points = [
			{ pointNumber: 1, winner: 'WIN-' },
			{ pointNumber: 2, winner: 'WIN-' },
			{ pointNumber: 3, winner: '-WIN' },
			{ pointNumber: 4, winner: 'WIN-' },
			{ pointNumber: 5, winner: '-WIN' },
			{ pointNumber: 6, winner: '-WIN' },
			{ pointNumber: 7, winner: 'WIN-' },
		];
		expect(calculateGameScore(points)).toBe('AV-' as GameScore);
	});

	//Advantage player2

	test('Should be AV- when first player win one point after deuce', () => {
		const points = [
			{ pointNumber: 1, winner: 'WIN-' },
			{ pointNumber: 2, winner: 'WIN-' },
			{ pointNumber: 3, winner: '-WIN' },
			{ pointNumber: 4, winner: 'WIN-' },
			{ pointNumber: 5, winner: '-WIN' },
			{ pointNumber: 6, winner: '-WIN' },
			{ pointNumber: 7, winner: '-WIN' },
		];
		expect(calculateGameScore(points)).toBe('-AV' as GameScore);
	});

   test('Should be WIN- when first player wins 4 points in a row', () => {
    const points = [
      { pointNumber: 1, winner: 'WIN-' },
      { pointNumber: 2, winner: 'WIN-' },
      { pointNumber: 3, winner: 'WIN-' },
      { pointNumber: 4, winner: 'WIN-' }
    ];
    expect(calculateGameScore(points)).toBe('WIN-' as GameScore);
  });

  test('Should be -WIN when second player wins 4 points in a row', () => {
    const points = [
      { pointNumber: 1, winner: '-WIN' },
      { pointNumber: 2, winner: '-WIN' },
      { pointNumber: 3, winner: '-WIN' },
      { pointNumber: 4, winner: '-WIN' }
    ];
    expect(calculateGameScore(points)).toBe('-WIN' as GameScore);
  });

  test('Should be WIN- when first player wins after advantage', () => {
    const points = [
      { pointNumber: 1, winner: 'WIN-' },
      { pointNumber: 2, winner: 'WIN-' },
      { pointNumber: 3, winner: 'WIN-' },
      { pointNumber: 4, winner: '-WIN' },
      { pointNumber: 5, winner: '-WIN' },
      { pointNumber: 6, winner: '-WIN' },
      { pointNumber: 7, winner: 'WIN-' },
      { pointNumber: 8, winner: 'WIN-' }
    ];
    expect(calculateGameScore(points)).toBe('WIN-' as GameScore);
  });

});




