import { Point } from 'geojson';
import { isPosition } from './isPosition.typeguard';

export const isPoint = (point: any): point is Point => {
  return point.type === 'Point' && isPosition(point.coordinates);
};
