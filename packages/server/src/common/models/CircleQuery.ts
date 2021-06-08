import { CircleFeatureDto } from '../dtos/CircleFeature.dto';
import { FeatureDto } from '../dtos/Feature.dto';
import { isCircle } from '../typeguards/isCircle.typeguard';
import { IGeometryQuery } from './IGeometryQuery.interface';

export class CircleQuery implements IGeometryQuery {
  getQuery(forFeature: FeatureDto): string {
    if (isCircle(forFeature)) {
      const circleFeature: CircleFeatureDto = forFeature as CircleFeatureDto;

      const lat = circleFeature.geometry.coordinates[0];
      const long = circleFeature.geometry.coordinates[1];

      const point = `POINT(${lat} ${long})`;
      const radius = circleFeature.properties.radius;

      return `st_buffer(ST_Transform(ST_GeomFromText('${point}', 4326), 28992), ${radius})`;
    }
    return null;
  }
}
