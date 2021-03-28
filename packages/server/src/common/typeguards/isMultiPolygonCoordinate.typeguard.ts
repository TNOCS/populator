import { isPolygonCoordinate } from './isPolygonCoordinate.typeguard';

export const isMultiPolygonCoordinate = (coordinates: any) => {
  return (
    Array.isArray(coordinates) &&
    coordinates.every((array) => isPolygonCoordinate(array))
  );
};
