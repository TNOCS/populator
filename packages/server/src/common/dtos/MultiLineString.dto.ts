import { Matches, IsString } from 'class-validator';
import { IsMultiLineStringCoordinate } from '../decorators/IsMultiLineStringCoordinate';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';

export class MultiLineStringDto extends GeoJsonObjectDto {
  @Matches(/^MultiLineString$/, { message: 'type must be MultiLineString' })
  @IsString()
  type: 'MultiLineString';

  @IsMultiLineStringCoordinate()
  coordinates: number[][][];
}
