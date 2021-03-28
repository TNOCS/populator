import { MultiPolygon } from 'geojson';
import { isMultiPolygonCoordinate } from './isMultiPolygonCoordinate.typeguard';

export const isMultiPolygon = (
  multiPolygon: any,
): multiPolygon is MultiPolygon => {
  return (
    multiPolygon.type === 'MultiPolygon' &&
    isMultiPolygonCoordinate(multiPolygon.coordinates)
  );
};
