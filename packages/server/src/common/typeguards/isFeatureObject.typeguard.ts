import { Feature } from 'geojson';
import { isGeometryObject } from './isGeometryObject.typeguard';

export const isFeatureObject = (feature: any): feature is Feature => {
  return (
    feature.type === 'Feature' &&
    (isGeometryObject(feature.geometry) || feature.geometry === {}) &&
    feature.properties !== undefined &&
    (feature.id === undefined
      ? true
      : ['string', 'number'].includes(typeof feature.id))
  );
};
