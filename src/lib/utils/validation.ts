import { Player, Point } from '@/types/tennis.types';
import { PlayerValidationError, PointsValidationError } from '@/types/error.types';

export const validatePlayer = (player: Player): void => {
  if (!player.name.trim()) {
    throw new PlayerValidationError("Le nom du joueur est requis");
  }
  
  if (player.level < 1 || player.level > 10) {
    throw new PlayerValidationError("Le niveau doit être entre 1 et 10");
  }
};

export const validatePoints = (points: Point[]): void => {
  if (!Array.isArray(points)) {
    throw new PointsValidationError("Les points doivent être un tableau");
  }
  
  if (points.length === 0) {
    throw new PointsValidationError("La liste des points ne peut pas être vide");
  }

  points.forEach((point, index) => {
    if (point.winner !== 'WIN-' && point.winner !== '-WIN') {
      throw new PointsValidationError(
        `Point ${index + 1}: Le gagnant doit être 'WIN-' ou '-WIN'`
      );
    }
  });
};