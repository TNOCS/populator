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
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';

export class FeatureDto {
  @Matches(/^Feature$/, { message: 'type must be Feature' })
  @IsString()
  @ApiProperty({ type: 'string', pattern: 'Feature', example: 'Feature' })
  public type = 'Feature';

  @IsGeometryObject()
  @ApiProperty({
    oneOf: [{ type: 'PolygonDto' }, { type: 'PointDto' }],
    example: {
      type: 'Polygon',
      coordinates: [
        [
          [4.679081439971924, 51.7862674702614],
          [4.680111408233643, 51.78475424925916],
          [4.682332277297974, 51.78460159695351],
          [4.683973789215088, 51.785763068900664],
          [4.683265686035156, 51.787170069146114],
          [4.680647850036621, 51.78735589608635],
          [4.679081439971924, 51.7862674702614],
        ],
      ],
    },
  })
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
