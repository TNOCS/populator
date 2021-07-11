import { Feature } from 'geojson';
import { isPosition } from './isPosition.typeguard';

export const isCircle = (circle: any): circle is Feature => {
  return (
    circle.geometry.type === 'Point' &&
    isPosition(circle.geometry.coordinates) &&
    circle.properties !== 'undefined' &&
    circle.properties.shape === 'Circle' &&
    typeof circle.properties.radius === 'number' &&
    circle.properties.radius > 0
  );
};
