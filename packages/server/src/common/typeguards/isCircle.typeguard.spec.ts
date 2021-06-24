import { isCircle } from './isCircle.typeguard';

describe('Is Circle feature typeguard', () => {
  const validCircle = {
    type: 'Feature',
    properties: {
      shape: 'Circle',
      radius: 1000,
    },
    geometry: {
      type: 'Point',
      coordinates: [4.683419913053513, 51.7867934354102],
    },
  };

  const wrongTypeCircle = {
    type: 'Feature',
    properties: {
      shape: 'Circle',
      radius: 1000,
    },
    geometry: {
      type: 'Polygon',
      coordinates: [4.683419913053513, 51.7867934354102],
    },
  };

  const wrongCoordinatesCircle = {
    type: 'Feature',
    properties: {
      shape: 'Circle',
      radius: 1000,
    },
    geometry: {
      type: 'Point',
      coordinates: [4.683419913053513],
    },
  };

  const invalidCircleStringCoordinate = {
    type: 'Feature',
    properties: {
      shape: 'Circle',
      radius: 1000,
    },
    geometry: {
      type: 'Point',
      coordinates: [4.683419913053513, '51.7867934354102'],
    },
  };

  it('should return true for a valid circle', async () => {
    expect(isCircle(validCircle)).toBe(true);
  });

  it('should return false for a circle where geometry type is not point', async () => {
    expect(isCircle(wrongTypeCircle)).toBe(false);
  });

  it('should return false for a circle where geometry coordinates do not exist of 2 or more number elements', async () => {
    expect(isCircle(wrongCoordinatesCircle)).toBe(false);
  });

  it('should return false for a circle where geometry coordinates contains a string', async () => {
    expect(isCircle(invalidCircleStringCoordinate)).toBe(false);
  });
});
