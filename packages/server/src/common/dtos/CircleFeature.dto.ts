import { IsGeometryObject } from '../decorators/IsGeometryObject';
import { FeatureDto } from './Feature.dto';
import { PointDto } from './Point.dto';
import { Type } from 'class-transformer';
import { Matches, IsString, ValidateNested, IsNumber } from 'class-validator';

class CirclePropertiesDto {
  @Matches(/^Circle$/, { message: 'type must be Circle' })
  @IsString()
  shape: 'Circle';

  @IsNumber()
  radius: number;
}

export class CircleFeatureDto extends FeatureDto {
  @IsGeometryObject()
  @Type(() => PointDto)
  @ValidateNested()
  public geometry: PointDto;

  @Type(() => CirclePropertiesDto)
  @ValidateNested()
  public properties: CirclePropertiesDto;
}
