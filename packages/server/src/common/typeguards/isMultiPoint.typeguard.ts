import { MultiPoint } from 'geojson';
import { isPosition } from './isPosition.typeguard';

export const isMultiPoint = (multiPoint: any): multiPoint is MultiPoint => {
  return (
    multiPoint.type === 'MultiPoint' &&
    Array.isArray(multiPoint.coordinates) &&
    multiPoint.coordinates.every((position) => isPosition(position))
  );
};
