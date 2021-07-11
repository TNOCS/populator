import { FeatureDto } from '../dtos/Feature.dto';
import { isCircle } from '../typeguards/isCircle.typeguard';
import { isPolygon } from '../typeguards/isPolygon.typeguard';
import { CircleQuery } from './CircleQuery';
import { PolygonQuery } from './PolygonQuery';

export class GeometryQueryFactory {
  getQuery(feature: FeatureDto): string {
    if (isPolygon(feature.geometry)) {
      return new PolygonQuery().getQuery(feature);
    } else if (isCircle(feature)) {
      return new CircleQuery().getQuery(feature);
    }

    return null;
  }
}
