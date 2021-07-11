import { isPosition } from './isPosition.typeguard';

export const isLineStringCoordinate = (coordinates: any) => {
  return (
    Array.isArray(coordinates) &&
    coordinates.every((position) => isPosition(position))
  );
};
