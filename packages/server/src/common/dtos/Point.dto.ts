import { Matches, IsString } from 'class-validator';
import { IsPointCoordinate } from '../decorators/IsPointCoordinate';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';

export class PointDto extends GeoJsonObjectDto {
  @Matches(/^Point$/, { message: 'type must be Point' })
  @IsString()
  type: 'Point';

  @IsPointCoordinate()
  coordinates: number[];
}
