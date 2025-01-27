export class TennisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TennisError';
  }
}

export class PlayerValidationError extends TennisError {
  constructor(message: string) {
    super(message);
    this.name = 'PlayerValidationError';
  }
}

export class PointsValidationError extends TennisError {
  constructor(message: string) {
    super(message);
    this.name = 'PointsValidationError';
  }
}