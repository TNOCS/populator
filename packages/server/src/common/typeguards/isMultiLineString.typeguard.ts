import { MultiLineString } from 'geojson';
import { isLineStringCoordinate } from './isLineStringCoordinate.typeguard';

export const isMultiLineString = (
  multiLineString: any,
): multiLineString is MultiLineString => {
  return (
    multiLineString.type === 'MultiLineString' &&
    Array.isArray(multiLineString.coordinates) &&
    multiLineString.coordinates.every((lineStringCoordinate) =>
      isLineStringCoordinate(lineStringCoordinate),
    )
  );
};
