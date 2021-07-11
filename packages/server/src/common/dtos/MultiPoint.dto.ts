import { Matches, IsString } from 'class-validator';
import { IsMultiPointCoordinate } from '../decorators/IsMultiPointCoordinate';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';

export class MultiPointDto extends GeoJsonObjectDto {
  @Matches(/^MultiPoint$/, { message: 'type must be MultiPoint' })
  @IsString()
  type: 'MultiPoint';

  @IsMultiPointCoordinate()
  coordinates: number[][];
}
