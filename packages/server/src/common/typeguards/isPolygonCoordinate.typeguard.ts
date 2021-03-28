import { isLinearRingCoordinate } from './isLinearRingCoordinate.typeguard';

export const isPolygonCoordinate = (coordinates: any) => {
  console.log(
    'isPolygonCoordinate',
    Array.isArray(coordinates) &&
      coordinates.every((element) => isLinearRingCoordinate(element)),
  );
  return (
    Array.isArray(coordinates) &&
    coordinates.every((element) => isLinearRingCoordinate(element))
  );
};
