import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ScoreBoard } from '@/components/ScoreBoard';
import type { GameScore } from '@/types/tennis.types';

describe('ScoreBoard Component', () => {
  const defaultProps = {
    status: 'In Progress',
    sets: [[0, 0]],
    currentGame: {
      score: '0-0' as GameScore,
      player1Score: '0',
      player2Score: '0'
    },
    players: {
      player1: 'Roger Federer',
      player2: 'Rafael Nadal'
    },
    isMatchFinished: false,
    winner: null
  };

  test('renders basic scoreboard structure', () => {
    render(<ScoreBoard {...defaultProps} />);
    
    expect(screen.getByText(/Résultat/)).toBeInTheDocument();
    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByText('Current Game')).toBeInTheDocument();
  });

  test('displays players names correctly', () => {
    const { getByText } = render(<ScoreBoard {...defaultProps} />);
    
    expect(getByText('Roger Federer')).toBeInTheDocument();
    expect(getByText('Rafael Nadal')).toBeInTheDocument();
  });

  test('shows multiple sets scores', () => {
    const propsWithSets = {
      ...defaultProps,
      sets: [[6, 4], [4, 6], [6, 3]],
    };

    const { getAllByRole } = render(<ScoreBoard {...propsWithSets} />);
    
    const cells = getAllByRole('cell');
    // Skip player names cells (first column)
    expect(cells[1]).toHaveTextContent('6'); // First set player 1
    expect(cells[5]).toHaveTextContent('4'); // First set player 2
  });

  test('displays current game score correctly', () => {
    const propsWithGame = {
      ...defaultProps,
      currentGame: {
        score: '40-30' as GameScore,
        player1Score: '40',
        player2Score: '30'
      }
    };

    const { getByText } = render(<ScoreBoard {...propsWithGame} />);
    
    expect(getByText('40')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
  });

  test('handles finished match display', () => {
    const finishedMatchProps = {
      ...defaultProps,
      status: 'Finished',
      sets: [[6, 4], [6, 2], [6, 3]],
      isMatchFinished: true,
      winner: 'Roger Federer'
    };

    const { getByText, getAllByRole } = render(<ScoreBoard {...finishedMatchProps} />);
    
    expect(getByText(/Finished/)).toBeInTheDocument();
    const cells = getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('6');
    expect(cells[2]).toHaveTextContent('6');
    expect(cells[3]).toHaveTextContent('6');
  });

  test('displays maximum of 3 sets correctly', () => {
    const fiveSetsProps = {
      ...defaultProps,
      sets: [[6, 4], [4, 6], [6, 3], [3, 6], [6, 4]]
    };

    const { getAllByText } = render(<ScoreBoard {...fiveSetsProps} />);
    
    const setHeaders = getAllByText(/Set [1-3]/);
    expect(setHeaders).toHaveLength(3);
    expect(setHeaders[0]).toHaveTextContent('Set 1');
    expect(setHeaders[2]).toHaveTextContent('Set 3');
  });
});
