import { Type } from 'class-transformer';
import { Matches, IsString, ValidateNested } from 'class-validator';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';
import { LineStringDto } from './LineString.dto';
import { MultiLineStringDto } from './MultiLineString.dto';
import { MultiPointDto } from './MultiPoint.dto';
import { MultiPolygonDto } from './MultiPolygon.dto';
import { PointDto } from './Point.dto';
import { PolygonDto } from './Polygon.dto';

export class GeometryCollectionDto {
  @Matches(/^GeometryCollection$/, {
    message: 'type must be GeometryCollection',
  })
  @IsString()
  type: 'GeometryCollection';

  @Type(() => GeoJsonObjectDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: PointDto, name: 'Point' },
        { value: MultiPointDto, name: 'MultiPoint' },
        { value: LineStringDto, name: 'LineString' },
        { value: MultiLineStringDto, name: 'MultiLineString' },
        { value: PolygonDto, name: 'Polygon' },
        { value: MultiPolygonDto, name: 'MultiPolygon' },
        { value: GeometryCollectionDto, name: 'GeometryCollection' },
      ],
    },
  })
  @ValidateNested()
  geometries: (
    | PointDto
    | MultiPointDto
    | LineStringDto
    | MultiLineStringDto
    | PolygonDto
    | MultiPolygonDto
    | GeometryCollectionDto
  )[];
}
