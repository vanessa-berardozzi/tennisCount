import { calculateScore } from '../../utils/scoreCalculator';

describe('Tennis Score Calculator', () => {
	test('should return initial score "0-0"', () => {
		expect(calculateScore(0, 0)).toBe('0-0');
	});

	test('should return "15-0" when player 1 scores first point', () => {
		expect(calculateScore(1, 0)).toBe('15-0');
	});
});
