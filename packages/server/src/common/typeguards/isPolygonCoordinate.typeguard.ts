import { isLinearRingCoordinate } from './isLinearRingCoordinate.typeguard';

export const isPolygonCoordinate = (coordinates: any) => {
  return (
    Array.isArray(coordinates) &&
    coordinates.every((element) => isLinearRingCoordinate(element))
  );
};
