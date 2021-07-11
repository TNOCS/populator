import { FeatureDto } from '../dtos/Feature.dto';
import { SupportedGeometryPipe } from './supportedGeometry.pipe';

describe('Supported geometry', () => {
  const pipe = new SupportedGeometryPipe();

  const validCircle = {
    type: 'Feature',
    properties: {
      shape: 'Circle',
      radius: 5,
    },
    geometry: {
      type: 'Point',
      coordinates: [4.683419913053513, 51.7867934354102],
    },
  };

  const validPolygon = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [4.675304889678955, 51.78609491253583],
          [4.6791136264801025, 51.78609491253583],
          [4.6791136264801025, 51.788301610616614],
          [4.675304889678955, 51.788301610616614],
          [4.675304889678955, 51.78609491253583],
        ],
      ],
    },
  };

  const inValidPolygon = {
    type: 'Features',
    properties: {},
    geometry: {
      type: 'Polygonial',
      coordinates: [
        [
          [4.675304889678955, 51.78609491253583],
          [4.6791136264801025, 51.78609491253583],
          [4.6791136264801025, 51.788301610616614],
          [4.675304889678955, 51.788301610616614],
          [4.675304889678955, 51.78609491253583],
        ],
      ],
    },
  };

  it('should validate a circle and the output should match the input object', async () => {
    pipe.transform(validCircle, { type: 'body' }).then((result) => {
      expect(result).toMatchObject(validCircle);
    });
  });

  it('should validate a polygon and the output should match the input object', async () => {
    pipe.transform(validPolygon, { type: 'body' }).then((result) => {
      expect(result).toMatchObject(validPolygon);
    });
  });

  it('should throw a BadRequestException when an invalid object is posted', async () => {
    pipe.transform(inValidPolygon, { type: 'body' }).catch((error) => {
      expect(error.response.statusCode).toBe(400);
      expect(error.response.message).toBe(
        'Validation failed: only polygons and circles are supported, refer to the API docs for the correct formatting of post request',
      );
    });
  });
});
