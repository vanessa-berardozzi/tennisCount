/**
 * @class TennisError
 * @description Base class for tennis-related errors
 * @extends Error
 */
export class TennisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TennisError';
  }
}

/**
 * @class PlayerValidationError
 * @description Error thrown when player validation fails
 * @extends TennisError
 */
export class PlayerValidationError extends TennisError {
  constructor(message: string) {
    super(message);
    this.name = 'PlayerValidationError';
  }
}

/**
 * @class PointsValidationError
 * @description Error thrown when points validation fails
 * @extends TennisError
 */
export class PointsValidationError extends TennisError {
  constructor(message: string) {
    super(message);
    this.name = 'PointsValidationError';
  }
}