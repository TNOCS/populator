import { Matches, IsString, IsOptional } from 'class-validator';
import { IsBBox } from '../decorators/IsBBox';

export class GeoJsonObjectDto {
  @Matches(
    /^Feature|FeatureCollection|Point|MultiPoint|LineString|MultiLineString|Polygon|MultiPolygon|GeometryCollection$/,
    { message: 'type must be one of geojson types' },
  )
  @IsString()
  type:
    | 'Feature'
    | 'FeatureCollection'
    | 'Point'
    | 'MultiPoint'
    | 'LineString'
    | 'MultiLineString'
    | 'Polygon'
    | 'MultiPolygon'
    | 'GeometryCollection';

  @IsOptional()
  @IsBBox()
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number];
}
