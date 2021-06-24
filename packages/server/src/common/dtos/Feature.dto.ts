import { Type } from 'class-transformer';
import {
  Matches,
  IsString,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { IsBBox } from '../decorators/IsBBox';
import { IsId } from '../decorators/IsId';
import { IsGeometryObject } from '../decorators/IsGeometryObject';
import { GeoJsonObjectDto } from './GeoJsonObject.dto';
import { GeometryCollectionDto } from './GeometryCollection.dto';
import { LineStringDto } from './LineString.dto';
import { MultiLineStringDto } from './MultiLineString.dto';
import { MultiPointDto } from './MultiPoint.dto';
import { MultiPolygonDto } from './MultiPolygon.dto';
import { PointDto } from './Point.dto';
import { PolygonDto } from './Polygon.dto';

export class FeatureDto {
  @Matches(/^Feature$/, { message: 'type must be Feature' })
  @IsString()
  public type = 'Feature';

  @IsGeometryObject()
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
  public geometry: GeoJsonObjectDto;

  @IsOptional()
  @IsId()
  public id?: string | number;

  @IsNotEmpty()
  public properties: any;

  @IsOptional()
  @IsBBox()
  public bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number];
}
