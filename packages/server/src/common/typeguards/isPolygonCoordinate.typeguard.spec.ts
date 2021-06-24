import { isPolygonCoordinate } from './isPolygonCoordinate.typeguard';

describe('Is Polygon Coordinate typeguard', () => {
  const validPolygonCoordinate = [
    [
      [4.684038162231445, 51.78741894433857],
      [4.684322476387024, 51.78728952940987],
      [4.6845316886901855, 51.78742226266519],
      [4.68441367149353, 51.7875948153132],
      [4.68416154384613, 51.7875948153132],
      [4.684038162231445, 51.78741894433857],
    ],
  ];

  const invalidPolygonCoordinateNonMatchingCoordinates = [
    [
      [4.684038162231445, 51.78741894433857],
      [4.684322476387024, 51.78728952940987],
      [4.6845316886901855, 51.78742226266519],
      [4.68441367149353, 51.7875948153132],
      [4.68416154384613, 51.7875948153132],
      [3.684038162231445, 41.78741894433857],
    ],
  ];

  const invalidPolygonCoordinateLessThan4 = [
    [
      [4.684038162231445, 51.78741894433857],
      [4.684322476387024, 51.78728952940987],
      [4.684038162231445, 51.78741894433857],
    ],
  ];

  const validPolygonCoordinate4Elements = [
    [
      [4.684038162231445, 51.78741894433857],
      [4.684322476387024, 51.78728952940987],
      [4.6845316886901855, 51.78742226266519],
      [4.684038162231445, 51.78741894433857],
    ],
  ];

  it('should return true for a valid polygon coordinate', async () => {
    expect(isPolygonCoordinate(validPolygonCoordinate)).toBe(true);
  });

  it('should return false for an invalid polygon coordinate where the first and last coordinate do not match', async () => {
    expect(
      isPolygonCoordinate(invalidPolygonCoordinateNonMatchingCoordinates),
    ).toBe(false);
  });

  it('should return false for an invalid polygon coordinate where there are less than 4 coordinates', async () => {
    expect(isPolygonCoordinate(invalidPolygonCoordinateLessThan4)).toBe(false);
  });

  it('should return true for a valid polygon coordinate where there are exactly 4 coordinates', async () => {
    expect(isPolygonCoordinate(validPolygonCoordinate4Elements)).toBe(true);
  });
});
