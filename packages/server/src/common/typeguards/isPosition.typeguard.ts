import { Position } from 'geojson';

export const isPosition = (position: any): position is Position => {
  return (
    Array.isArray(position) &&
    position.every((e) => typeof e === 'number') &&
    position.length >= 2
  );
};
