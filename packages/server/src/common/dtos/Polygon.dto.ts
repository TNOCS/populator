import { Matches, IsString } from 'class-validator';
import { IsPolygonCoordinate } from '../decorators/IsPolygonCoordinate';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';

export class PolygonDto extends GeoJsonObjectDto {
  @Matches(/^Polygon$/, { message: 'type must be Polygon' })
  @IsString()
  type: 'Polygon';

  @IsPolygonCoordinate()
  coordinates: number[][][];
}
