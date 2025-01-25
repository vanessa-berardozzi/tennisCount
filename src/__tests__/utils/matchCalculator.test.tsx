import type { GameScore, MatchScore } from '../../types/tennis.types';
import { calculateMatchScore } from '../../utils/matchCalculator';

describe('Match Calculator', () => {
	test('should start with empty match', () => {
		const sets: string[][] = [];
		expect(calculateMatchScore(sets)).toEqual({
			sets: [],
			currentGame: '0-0' as GameScore,
			isMatchFinished: false,
		} as MatchScore);
	});

	test('should detect victory when player 1 wins 3 sets', () => {
		const sets = [
		 //7-5
      ['WIN-','WIN-','-WIN','WIN-','-WIN','WIN-','-WIN','-WIN','WIN-','-WIN','WIN-','WIN-' ], // 7-5
      ['WIN-', 'WIN-', 'WIN-', '-WIN', '-WIN', 'WIN-', 'WIN-', 'WIN-'], // 6-2
      ['WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-', 'WIN-'], // 6-0
		];
		expect(calculateMatchScore(sets)).toEqual({
			sets: [
				[7,5],
				[6, 2],
				[6, 0],
			],
			currentGame: '6-0' as GameScore,
			isMatchFinished: true,
		} as MatchScore);
	});

	test('should detect victory when player 2 ( -WIN) wins 3 sets', () => {
		const sets = [
      ['-WIN','-WIN','WIN-','-WIN','WIN-','-WIN','WIN-','-WIN','WIN-','-WIN','WIN-','-WIN' ], // 5-7
      ['-WIN', '-WIN', '-WIN', 'WIN-', 'WIN-', '-WIN', '-WIN', '-WIN'], // 2-6
      ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'], // 0-6
		
		];
		expect(calculateMatchScore(sets)).toEqual({
      sets: [
        [5,7],
        [2,6],
        [0,6],
      ],
      currentGame: '0-6' as GameScore,
      isMatchFinished: true,
    } as MatchScore);
  });

  test('Should detect player 2 victory in 5 sets ', () => {
  const sets = [
    ['WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', 'WIN-', 'WIN-'],    // 6-1 (ajout d'un jeu)
    ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],            // 0-6
    ['WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', 'WIN-', 'WIN-'],    // 6-1 (ajout d'un jeu)
    ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],            // 0-6
    ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN']             // 0-6
  ];
  expect(calculateMatchScore(sets)).toEqual({
    sets: [[6, 1], [0, 6], [6, 1], [0, 6], [0, 6]],
    currentGame: '0-6' as GameScore,
    isMatchFinished: true
  } as MatchScore);
});
 

  test('Should detect victory in fifth set tie-break', () => {
    const sets = [
      ['WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', 'WIN-', 'WIN-'],    // 6-1
      ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],            // 0-6
      ['WIN-', 'WIN-', 'WIN-', 'WIN-', '-WIN', 'WIN-', 'WIN-'],    // 6-1
      ['-WIN', '-WIN', '-WIN', '-WIN', '-WIN', '-WIN'],           // 0-6
      ['-WIN', 'WIN-','-WIN', 'WIN-', '-WIN', 'WIN-','-WIN', 'WIN-','-WIN', 'WIN-', '-WIN', 'WIN-', 'WIN-'] // 7-6
      
    ];
    expect(calculateMatchScore(sets)).toEqual({
      sets: [[6, 1], [0, 6], [6, 1], [0, 6], [7, 6]],
      currentGame: '7-6' as GameScore,
      isMatchFinished: true
    } as MatchScore);
  });



});
