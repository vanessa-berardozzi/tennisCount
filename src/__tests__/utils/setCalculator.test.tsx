import { calculateSetScore } from '../../utils/setCalculator';

describe('Set Calculator', () => {
  // Set initial
  test('should start with [0,0]', () => {
    const games: string[] = [];
    expect(calculateSetScore(games)).toEqual([0, 0]);
  });

  // Victoire standard 6-0
  test('should be [6,0] for a perfect set', () => {
    const games = ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'];
    expect(calculateSetScore(games)).toEqual([6, 0]);
  });

  // Victoire standard 6-4
  test('should be [6,4] for a normal set win', () => {
    const games = [
      'WIN-', '-WIN', 'WIN-',   // 2-1
      'WIN-', '-WIN', 'WIN-',   // 4-2
      '-WIN', '-WIN', 'WIN-',   // 5-4
      'WIN-'                    // 6-4
    ];
    expect(calculateSetScore(games)).toEqual([6, 4]);
  });

  // Set prolongé 7-5
  test('should be [7,5] for an extended set', () => {
    const games = [
     'WIN-', '-WIN', 'WIN-',   // 2-1
      'WIN-', '-WIN', 'WIN-',   // 4-2
      '-WIN', '-WIN', 'WIN-',   // 5-4
      'WIN-' , '-WIN', 'WIN-'
    ];
    expect(calculateSetScore(games)).toEqual([7, 5]);
  });

  // Tie-break 6-6
  test('should be [6,6] for a tie-break situation', () => {
    const games = [
      'WIN-', 'WIN-', '-WIN',   // 2-1
      'WIN-', '-WIN', 'WIN-',   // 4-2
      '-WIN', '-WIN', 'WIN-',   // 5-4
      '-WIN', '-WIN', 'WIN-'    // 6-6
    ];
    expect(calculateSetScore(games)).toEqual([6, 6]);
  });

  // Victoire tie-break 7-6
  test('should be [7,6] when winning tie-break', () => {
    const games = [
      'WIN-', 'WIN-', '-WIN',   // 2-1
      'WIN-', '-WIN', 'WIN-',   // 4-2
      '-WIN', '-WIN', 'WIN-',   // 5-4
      '-WIN', '-WIN', 'WIN-',   // 6-6
      'WIN-'                    // 7-6
    ];
    expect(calculateSetScore(games)).toEqual([7, 6]);
  });
});