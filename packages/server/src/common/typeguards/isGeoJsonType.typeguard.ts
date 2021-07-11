import { GeoJsonTypes } from './GeoJsonTypes';

export const isGeoJsonType = (geoJsonType: any) => {
  return geoJsonType.typeof(String) && GeoJsonTypes.includes(geoJsonType);
};
