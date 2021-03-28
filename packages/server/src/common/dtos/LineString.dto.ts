import { Matches, IsString } from 'class-validator';
import { IsLineStringCoordinate } from '../decorators/IsLineStringCoordinate';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';

export class LineStringDto extends GeoJsonObjectDto {
  @Matches(/^LineString$/, { message: 'type must be LineString' })
  @IsString()
  type: 'LineString';

  @IsLineStringCoordinate()
  coordinates: number[][];
}
