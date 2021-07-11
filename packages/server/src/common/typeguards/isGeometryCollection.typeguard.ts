import { GeometryCollection } from 'geojson';
import { isGeometryObject } from './isGeometryObject.typeguard';

export const isGeometryCollection = (
  geometryCollection: any,
): geometryCollection is GeometryCollection => {
  return (
    geometryCollection.type === 'GeometryCollection' &&
    Array.isArray(geometryCollection.geometries) &&
    (geometryCollection.geometries.length === 0 ||
      geometryCollection.geometries.every((geometry) =>
        isGeometryObject(geometry),
      ))
  );
};
