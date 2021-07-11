import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Matches, ValidateNested, IsOptional } from 'class-validator';
import { IsBBox } from '../decorators/IsBBox';
import { FeatureDto } from './Feature.dto';

export class FeatureCollectionDto {
  @ApiProperty({
    type: 'string',
    pattern: 'FeatureCollection',
    example: 'FeatureCollection',
  })
  @Matches(/^FeatureCollection$/, { message: 'type must be FeatureCollection' })
  type = 'FeatureCollection';

  @ApiProperty({
    type: 'array',
    items: { type: 'FeatureDto' },
    example: [
      {
        type: 'Feature',
        id: 6230,
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [4.679081441, 51.786267474],
              [4.680647851, 51.7873559],
              [4.683265687, 51.787170073],
              [4.68397379, 51.785763073],
              [4.682332278, 51.784601601],
              [4.680111409, 51.784754253],
              [4.679081441, 51.786267474],
            ],
          ],
        },
        properties: {
          gid: 6230,
          t_res: 580,
          bu_code: 'BU05050901',
          bu_naam: 'Sterrenburg 1-Oost',
          gm_naam: 'Dordrecht',
          wk_naam: 'Wijk 09 Sterrenburg',
          p_n_w_al: 31,
          postcode: '3318',
          t_hh_m_k: 71,
          t_hh_z_k: 150,
          aantal_hh: 269,
          gem_hh_gr: 2.2,
          p_ant_aru: 3,
          p_marokko: 5,
          p_over_nw: 15,
          p_surinam: 3,
          p_turkije: 4,
          p_west_al: 10,
          t_eenp_hh: 48,
          t_non_res: 0,
          t_00_14_jr: 71,
          t_15_24_jr: 23,
          t_25_44_jr: 112,
          t_45_64_jr: 204,
          t_65_eo_jr: 170,
        },
      },
    ],
  })
  @Type(() => FeatureDto)
  @ValidateNested()
  features: FeatureDto[];

  @IsOptional()
  @IsBBox()
  bbox?:
    | [number, number, number, number]
    | [number, number, number, number, number, number];
}
