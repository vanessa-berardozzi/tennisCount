import { Player, Point } from '@/types/tennis.types';
import { PlayerValidationError, PointsValidationError } from '@/types/error.types';

/**
 * @function validatePlayer
 * @description Validates player data
 * @param {Player} player - The player to validate
 * @throws {PlayerValidationError} If player data is invalid
 */
export const validatePlayer = (player: Player): void => {
  if (!player.name.trim()) {
    throw new PlayerValidationError("Player name is required");
  }
  
  if (player.level < 1 || player.level > 10) {
    throw new PlayerValidationError("Level must be between 1 and 10");
  }
};

/**
 * @function validatePoints
 * @description Validates an array of points
 * @param {Point[]} points - The points to validate
 * @throws {PointsValidationError} If points are invalid
 */
export const validatePoints = (points: Point[]): void => {
  if (!Array.isArray(points)) {
    throw new PointsValidationError("Points must be an array");
  }
  
  if (points.length === 0) {
    throw new PointsValidationError("Points list cannot be empty");
  }

  points.forEach((point, index) => {
    if (point.winner !== 'WIN-' && point.winner !== '-WIN') {
      throw new PointsValidationError(
        `Point ${index + 1}: Winner must be 'WIN-' or '-WIN'`
      );
    }
  });
};