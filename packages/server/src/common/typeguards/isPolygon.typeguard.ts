import { Polygon } from 'geojson';
import { isPolygonCoordinate } from './isPolygonCoordinate.typeguard';

export const isPolygon = (polygon: any): polygon is Polygon => {
  return polygon.type === 'Polygon' && isPolygonCoordinate(polygon.coordinates);
};
