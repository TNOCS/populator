import { FeatureCollection } from 'geojson';
import { isFeatureObject } from './isFeatureObject.typeguard';

export const isFeatureCollection = (
  featureCollection: any,
): featureCollection is FeatureCollection => {
  return (
    featureCollection.type === 'FeatureCollection' &&
    Array.isArray(featureCollection.features) &&
    (featureCollection.features === [] ||
      featureCollection.features.every((feature) => isFeatureObject(feature)))
  );
};
