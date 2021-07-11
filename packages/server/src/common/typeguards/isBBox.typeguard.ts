import { BBox } from 'geojson';

export const isBBox = (bbox: any): bbox is BBox => {
  return (
    Array.isArray(bbox) &&
    bbox.every((value) => typeof value === 'number') &&
    (bbox.length === 4 || bbox.length === 6)
  );
};
