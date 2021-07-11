import { Geometry } from 'geojson';
import { GeoJsonGeometryTypes } from './GeoJsonGeometryTypes.typeguard';

export const isGeometryObject = (
  geometryObject: any,
): geometryObject is Geometry => {
  if (geometryObject.type === 'GeometryCollection') {
    return isGeometryObject(geometryObject);
  }

  return (
    GeoJsonGeometryTypes.includes(geometryObject.type) &&
    (Array.isArray(geometryObject.coordinates) ||
      geometryObject.coordinates === {})
  );
};
