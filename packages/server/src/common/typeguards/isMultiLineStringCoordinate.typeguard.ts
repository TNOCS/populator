import { isLineStringCoordinate } from './isLineStringCoordinate.typeguard';

export const isMultiLineStringCoordinate = (coordinates: any) => {
  return (
    Array.isArray(coordinates) &&
    coordinates.every((element) => isLineStringCoordinate(element))
  );
};
