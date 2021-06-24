import { isPoint } from './isPoint.typeguard';

describe('Is Point typeguard', () => {
  const validPoint = {
    type: 'Point',
    coordinates: [51.81155, 4.66636],
  };

  const invalidPointType = {
    type: 'SomeType',
    coordinates: [51.81155, 4.66636],
  };

  const invalidPointCoordinatesSingle = {
    type: 'Point',
    coordinates: [51.81155],
  };

  const invalidPointCoordinatesString = {
    type: 'Point',
    coordinates: [51.81155, '4.66636'],
  };

  it('should return true for a valid point', async () => {
    expect(isPoint(validPoint)).toBe(true);
  });

  it('should return false for a point with a type that is not "Point"', async () => {
    expect(isPoint(invalidPointType)).toBe(false);
  });

  it('should return false for a point with a single coordinate with one number', async () => {
    expect(isPoint(invalidPointCoordinatesSingle)).toBe(false);
  });

  it('should return false for a point with coordinates containing a string', async () => {
    expect(isPoint(invalidPointCoordinatesString)).toBe(false);
  });
});
