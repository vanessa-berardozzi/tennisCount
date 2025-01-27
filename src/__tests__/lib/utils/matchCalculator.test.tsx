import { calculateMatchScore } from '@/lib/utils/matchCalculator';
import type { MatchScore, GameScore } from '@/types/tennis.types';

describe('Match Calculator', () => {
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

  describe('Set completion rules', () => {
    test('should detect 6-0 set completion', () => {
      const sets = Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']); // 6 jeux gagnés à 0
      expect(calculateMatchScore(sets).sets[0]).toEqual([6, 0]);
    });

    test('should detect 7-5 set completion', () => {
      const sets = [
        ...Array(5).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 5-0
        ...Array(5).fill(['-WIN', '-WIN', '-WIN', '-WIN']), // 5-5
        ['WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-5
        ['WIN-', 'WIN-', 'WIN-', 'WIN-']  // 7-5
      ];
      expect(calculateMatchScore(sets).sets[0]).toEqual([7, 5]);
    });

    test('should handle 7-6 tiebreak set', () => {
      // Pour avoir un vrai 7-6, il faut simuler tous les jeux correctement
      const sets = [
        // Premier joueur mène 5-2
        ...Array(5).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']),
        ...Array(2).fill(['-WIN', '-WIN', '-WIN', '-WIN']),
        // Deuxième joueur revient à 5-5
        ...Array(3).fill(['-WIN', '-WIN', '-WIN', '-WIN']),
        // Premier joueur gagne son service 6-5
        ['WIN-', 'WIN-', 'WIN-', 'WIN-'],
        // Deuxième joueur égalise 6-6
        ['-WIN', '-WIN', '-WIN', '-WIN'],
        // Premier joueur gagne le tie-break
        ['WIN-', 'WIN-', 'WIN-', 'WIN-']
      ];
      expect(calculateMatchScore(sets).sets[0]).toEqual([7, 6]);
    });
  });

  describe('Match completion rules', () => {
    test('should detect player 1 victory with three straight sets', () => {
      const sets = [
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-'])  // 6-0
      ];
      const result = calculateMatchScore(sets);
      expect(result.isMatchFinished).toBe(true);
      expect(result.sets).toEqual([[6, 0], [6, 0], [6, 0]]);
    });

    test('should detect player 2 victory with three straight sets', () => {
      const sets = [
        ...Array(6).fill(['-WIN', '-WIN', '-WIN', '-WIN']), // 0-6
        ...Array(6).fill(['-WIN', '-WIN', '-WIN', '-WIN']), // 0-6
        ...Array(6).fill(['-WIN', '-WIN', '-WIN', '-WIN'])  // 0-6
      ];
      const result = calculateMatchScore(sets);
      expect(result.isMatchFinished).toBe(true);
      expect(result.sets).toEqual([[0, 6], [0, 6], [0, 6]]);
    });

    test('should continue match if no player has won three sets', () => {
      const sets = [
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['-WIN', '-WIN', '-WIN', '-WIN']), // 0-6
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-'])  // 6-0
      ];
      const result = calculateMatchScore(sets);
      expect(result.isMatchFinished).toBe(false);
      expect(result.sets).toEqual([[6, 0], [0, 6], [6, 0]]);
    });
  });

  describe('Current game handling', () => {
    test('should show current game score when match is not finished', () => {
      // Un joueur a 2 points et l'autre 1 point, donc le score devrait être 30-15
      const result = calculateMatchScore([
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']),
        ['-WIN', 'WIN-', 'WIN-'] // 30-15
      ]);
      
      expect(result.isMatchFinished).toBe(false);
      expect(result.currentGame).toBe('AV-' as GameScore);
    });

    test('should not show current game score when match is finished', () => {
      const sets = [
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        [['WIN-', '-WIN', 'WIN-']] // Should be ignored
      ];
      const result = calculateMatchScore(sets);
      expect(result.isMatchFinished).toBe(true);
      expect(result.currentGame).toBe('0-0');
    });
  });

  describe('Special cases', () => {
    test('should handle incomplete games', () => {
      const game = ['WIN-', '-WIN'];
      const result = calculateMatchScore([
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']),
        game
      ]);
      
      expect(result.sets[0]).toEqual([6, 0]);
      expect(result.currentGame).toBe('15-15' as GameScore);
    });

    test('should handle match with exact three sets win', () => {
      const sets = [
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-']), // 6-0
        ...Array(6).fill(['WIN-', 'WIN-', 'WIN-', 'WIN-'])  // Ce set ne devrait pas être compté
      ];
      const result = calculateMatchScore(sets);
      expect(result.isMatchFinished).toBe(true);
      expect(result.sets).toEqual([[6, 0], [6, 0], [6, 0]]);
    });
  });
});