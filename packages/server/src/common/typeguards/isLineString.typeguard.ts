import { LineString } from 'geojson';
import { isLineStringCoordinate } from './isLineStringCoordinate.typeguard';

export const isLineString = (lineString: any): lineString is LineString => {
  return (
    lineString.type === 'LineString' &&
    isLineStringCoordinate(lineString.coordinates)
  );
};
