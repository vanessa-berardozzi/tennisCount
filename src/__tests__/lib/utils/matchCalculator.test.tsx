import type { GameScore, MatchScore } from '../../../types/tennis.types';
import { calculateMatchScore } from '../../../lib/utils/matchCalculator';

describe('Match Calculator', () => {
  // Initial tests
  describe('Initial state', () => {
    test('should start with empty match', () => {
      const sets: string[][] = [];
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[0, 0]],
        currentGame: '0-0' as GameScore,
        isMatchFinished: false,
      } as MatchScore);
    });
  });

  // Three sets victory tests
  describe('Three sets victories', () => {
    test('should detect player 1 victory in straight sets', () => {
      const sets = [
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[6, 0], [6, 0], [6, 0]],
        currentGame: '-',
        isMatchFinished: true
      });
    });

    test('should detect player 1 victory with competitive sets', () => {
      const sets = [
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 7-5
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-2
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[7, 5], [6, 2], [6, 0]],
        currentGame: '0-0' as GameScore,
        isMatchFinished: true
      });
    });

    test('should detect player 2 victory in straight sets', () => {
      const sets = [
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'], // 0-6
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'], // 0-6
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'], // 0-6
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[0, 6], [0, 6], [0, 6]],
        currentGame: '0-0' as GameScore,
        isMatchFinished: true
      });
    });
  });

  // Five sets victory tests
  describe('Five sets victories', () => {
    test('should detect player 2 victory in five sets', () => {
      const sets = [
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', 'WIN-', 'WIN-'],    // 6-1 
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],            // 0-6
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', 'WIN-', 'WIN-'],    // 6-1 
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],            // 0-6
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN']             // 0-6
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[6, 1], [0, 6], [6, 1], [0, 6], [0, 6]],
        currentGame: '0-6' as GameScore,
        isMatchFinished: true
      });
    });

    test('should detect victory with fifth set tie-break', () => {
      const sets = [
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'],           // 6-0
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],           // 0-6
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'],           // 6-0
        ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],           // 0-6
        // Fifth set tie-break
        ['WIN-', '-WIN', 'WIN-', '-WIN', 'WIN-', '-WIN', 'WIN-']    // 7-6
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[6, 0], [0, 6], [6, 0], [0, 6], [7, 6]],
        currentGame: '7-6' as GameScore,
        isMatchFinished: true
      });
    });
  });

  // Special scenario tests
  describe('Special cases', () => {
    test('should handle unfinished match correctly', () => {
      const sets = [
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
        ['WIN-', 'WIN-', '-WIN', '-WIN', 'WIN-'], // 3-2 (in progress)
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[6, 0], [3, 2]],
        currentGame: '0-0' as GameScore,
        isMatchFinished: false
      });
    });

    test('should handle match with tiebreak in regular sets', () => {
      const sets = [
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', '-WIN', 'WIN-'], // 7-6
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
        ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
      ];
      
      expect(calculateMatchScore(sets)).toEqual({
        sets: [[7, 6], [6, 0], [6, 0]],
        currentGame: '-',
        isMatchFinished: true
      });
    });
  });
});
