import { Matches, IsString } from 'class-validator';
import { IsMultiPolygonCoordinate } from '../decorators/IsMultiPolygonCoordinate';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';

export class MultiPolygonDto extends GeoJsonObjectDto {
  @Matches(/^MultiPolygon$/, { message: 'type must be MultiPolygon' })
  @IsString()
  type: 'MultiPolygon';

  @IsMultiPolygonCoordinate()
  coordinates: number[][][][];
}
