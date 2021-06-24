import { Type } from 'class-transformer';
import { Matches, ValidateNested, IsOptional } from 'class-validator';
import { IsBBox } from '../decorators/IsBBox';
import { FeatureDto } from './Feature.dto';

export class FeatureCollectionDto {
  @Matches(/^FeatureCollection$/, { message: 'type must be FeatureCollection' })
  type = 'FeatureCollection';

  @Type(() => FeatureDto)
  @ValidateNested()
  features: FeatureDto[];

  @IsOptional()
  @IsBBox()
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number];
}
