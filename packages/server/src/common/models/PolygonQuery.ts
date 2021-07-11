import { FeatureDto } from '../dtos/Feature.dto';
import { PolygonDto } from '../dtos/Polygon.dto';
import { isPolygon } from '../typeguards/isPolygon.typeguard';
import { IGeometryQuery } from './IGeometryQuery.interface';

export class PolygonQuery implements IGeometryQuery {
  getQuery(forFeature: FeatureDto): string {
    if (isPolygon(forFeature.geometry)) {
      const polygon: PolygonDto = forFeature.geometry;

      const polygonCoordinateStrings: string[] = [];

      polygon.coordinates[0].forEach((coordinate) => {
        const coordinateString = `${coordinate[0]} ${coordinate[1]}`;
        polygonCoordinateStrings.push(coordinateString);
      });

      const polygon_text = `POLYGON((${polygonCoordinateStrings.toString()}))`;

      return `ST_Transform(ST_GeomFromText('${polygon_text}', 4326), 28992)`;
    }
    return null;
  }
}
