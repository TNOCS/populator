import { isLineStringCoordinate } from './isLineStringCoordinate.typeguard';

export const isLinearRingCoordinate = (coordinates: any) => {
  return (
    Array.isArray(coordinates) &&
    isLineStringCoordinate(coordinates) &&
    coordinates.length >= 4 &&
    coordinates[0].every(
      (value, index) => value == coordinates[coordinates.length - 1][index],
    )
  );
};
