import { isPolygon } from './isPolygon.typeguard';

describe('Is Polygon typeguard', () => {
  const validPolygon = {
    type: 'Polygon',
    coordinates: [
      [
        [4.684038162231445, 51.78741894433857],
        [4.684322476387024, 51.78728952940987],
        [4.6845316886901855, 51.78742226266519],
        [4.68441367149353, 51.7875948153132],
        [4.68416154384613, 51.7875948153132],
        [4.684038162231445, 51.78741894433857],
      ],
    ],
  };

  const wrongTypePolygon = {
    type: 'PolygonType',
    coordinates: [
      [
        [4.684038162231445, 51.78741894433857],
        [4.684322476387024, 51.78728952940987],
        [4.6845316886901855, 51.78742226266519],
        [4.68441367149353, 51.7875948153132],
        [4.68416154384613, 51.7875948153132],
        [4.684038162231445, 51.78741894433857],
      ],
    ],
  };

  const noTypePolygon = {
    coordinates: [
      [
        [4.684038162231445, 51.78741894433857],
        [4.684322476387024, 51.78728952940987],
        [4.6845316886901855, 51.78742226266519],
        [4.68441367149353, 51.7875948153132],
        [4.68416154384613, 51.7875948153132],
        [4.684038162231445, 51.78741894433857],
      ],
    ],
  };

  const noCoordPolygon = {
    type: 'Polygon',
  };

  it('should return true for a valid polygon', async () => {
    expect(isPolygon(validPolygon)).toBe(true);
  });

  it('should return false for a polygon where type is not "Polygon"', async () => {
    expect(isPolygon(wrongTypePolygon)).toBe(false);
  });

  it('should return false for a polygon where there is no type property', async () => {
    expect(isPolygon(noTypePolygon)).toBe(false);
  });

  it('should return false for a polygon where there is no coordinates property', async () => {
    expect(isPolygon(noCoordPolygon)).toBe(false);
  });
});
