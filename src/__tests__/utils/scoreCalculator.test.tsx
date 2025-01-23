import { calculateGameScore } from '../../utils/scoreCalculator';
import type { GameScore } from '../../types/tennis.types';

describe('Tennis Game Calculator', () => {
  describe('Regular Game Scoring', () => {
    // Scores Joueur 1
    test('should return "0-0" when scores are 0-0', () => {
      expect(calculateGameScore(0, 0)).toBe('0-0' as GameScore);
    });
    test('should return "15-0" when scores are 1-0', () => {
      expect(calculateGameScore(1, 0)).toBe('15-0' as GameScore);
    });
    test('should return "30-0" when scores are 2-0', () => {
      expect(calculateGameScore(2, 0)).toBe('30-0' as GameScore);
    });
    test('should return "40-0" when scores are 3-0', () => {
      expect(calculateGameScore(3, 0)).toBe('40-0' as GameScore);
    });

    // Scores Joueur 2
    test('should return "0-15" when scores are 0-1', () => {
      expect(calculateGameScore(0, 1)).toBe('0-15' as GameScore);
    });
    test('should return "0-30" when scores are 0-2', () => {
      expect(calculateGameScore(0, 2)).toBe('0-30' as GameScore);
    });
    test('should return "0-40" when scores are 0-3', () => {
      expect(calculateGameScore(0, 3)).toBe('0-40' as GameScore);
    });

    // Scores mixtes
    test('should return "15-30" when scores are 1-2', () => {
      expect(calculateGameScore(1, 2)).toBe('15-30' as GameScore);
    });
    test('should return "30-15" when scores are 2-1', () => {
      expect(calculateGameScore(2, 1)).toBe('30-15' as GameScore);
    });
  });

  describe('Deuce Game Scoring', () => {
    test('should return "40-40" when scores are 3-3', () => {
      expect(calculateGameScore(3, 3)).toBe('40-40' as GameScore);
    });
    test('should return "40-40" when scores are 4-4', () => {
      expect(calculateGameScore(4, 4)).toBe('40-40' as GameScore);
    });
  });

  describe('Advantage Game Scoring', () => {
    test('should return "AV-" when scores are 4-3', () => {
      expect(calculateGameScore(4, 3)).toBe('AV-' as GameScore);
    });
    test('should return "-AV" when scores are 3-4', () => {
      expect(calculateGameScore(3, 4)).toBe('-AV' as GameScore);
    });
  });

  describe('Game Win Scoring', () => {
    test('should return "WIN-" when scores are 4-2', () => {
      expect(calculateGameScore(4, 2)).toBe('WIN-' as GameScore);
    });
    test('should return "-WIN" when scores are 2-4', () => {
      expect(calculateGameScore(2, 4)).toBe('-WIN' as GameScore);
    });
  });

  
});