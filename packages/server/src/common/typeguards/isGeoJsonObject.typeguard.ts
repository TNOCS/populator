import { GeoJsonObject } from 'geojson';
import { GeoJsonTypes } from './GeoJsonTypes';
import { isBBox } from './isBBox.typeguard';

export const isGeoJsonObject = (
  geoJsonObject: any,
): geoJsonObject is GeoJsonObject => {
  return (
    GeoJsonTypes.includes(geoJsonObject.type) &&
    (geoJsonObject.bbox == null ? true : isBBox(geoJsonObject.bbox))
  );
};
