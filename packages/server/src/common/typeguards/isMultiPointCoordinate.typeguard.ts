import { isPosition } from './isPosition.typeguard';

export const isMultiPointCoordinate = (coordinates: any) => {
  return (
    Array.isArray(coordinates) &&
    coordinates.every((position) => isPosition(position))
  );
};
