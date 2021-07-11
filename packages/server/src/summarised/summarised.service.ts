import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import { Buurten } from '../common/entities/buurten.entity';
import { GeometryQueryFactory } from '../common/models/GeometryQueryFactory';

@Injectable()
export class SummarisedService {
  constructor(
    @InjectRepository(Buurten)
    private summarisedRepository: Repository<Buurten>,
    private configService: ConfigService,
  ) {}

  getSummarisedDataInGeometry(
    feature: FeatureDto,
    daypart?: string,
    weektime?: string,
  ): Promise<FeatureCollectionDto> {
    const GQFactory = new GeometryQueryFactory();
    const geomQuery = GQFactory.getQuery(feature);

    const buurtData = this.summarisedRepository
      .query(
        `select json_build_object(
          'type', 'FeatureCollection',
          'features', json_agg(
          json_build_object(
          'type', 'Feature', 
          'id', feature_rows.gid,
          'geometry',   ST_AsGeoJSON(st_transform(feature_rows.geovlak, 4326))::json, 
          'properties', row_to_json(feature_rows)::jsonb - 'geovlak'))) as featurecollection 
          from (select gid, bu_naam, b.bu_code, wk_naam, gm_naam, postcode, aant_inw as t_res, aant_werkenden as t_non_res, t_00_14_jr, t_15_24_jr, t_25_44_jr, t_45_64_jr, t_65_eo_jr, aantal_hh, t_eenp_hh, t_hh_z_k, t_hh_m_k, gem_hh_gr, p_west_al, p_n_w_al, p_marokko, p_ant_aru, p_surinam, p_turkije, p_over_nw, geovlak 
                from cbs.buurtdata b, 
                    (select sum(hh_size) as aant_werkenden, po.bu_code  
                    from bag.population po
                    left join cbs.buurtdata bu
                    on po.bu_code = bu.bu_code
                    where st_contains(${geomQuery}, bu.geovlak) and gebruiksdoelverblijfsobject != 'woonfunctie'
                    group by po.bu_code) werkenden 
          where st_contains(${geomQuery}, b.geovlak)
          and b.bu_code = werkenden.bu_code
          UNION ALL
          select gid, bu_naam, bu_code, wk_naam, gm_naam, postcode, aant_inw as t_res, aant_werkenden as t_non_res, t_00_14_jr, t_15_24_jr, t_25_44_jr, t_45_64_jr, t_65_eo_jr, aantal_hh, t_eenp_hh, t_hh_z_k, t_hh_m_k, gem_hh_gr, p_west_al, p_n_w_al, p_marokko, p_ant_aru, p_surinam, p_turkije, p_over_nw, geovlak 
          from GetPartialBuurtData(${geomQuery})) feature_rows`,
      )
      .then((results: any) => {
        const featureCollection = plainToClass(
          FeatureCollectionDto,
          results[0].featurecollection,
        );

        let popPercHome = 0;

        // mapping for determination of population amount at home and at work
        switch (daypart) {
          case 'morning': {
            if (weektime == 'weekend') {
              popPercHome = this.configService.get('WEEKEND_MORNING');
            } else {
              popPercHome = this.configService.get('WEEKDAY_MORNING');
            }
            break;
          }
          case 'afternoon': {
            if (weektime == 'weekend') {
              popPercHome = this.configService.get('WEEKEND_AFTERNOON');
            } else {
              popPercHome = this.configService.get('WEEKDAY_AFTERNOON');
            }
            break;
          }
          case 'evening': {
            if (weektime == 'weekend') {
              popPercHome = this.configService.get('WEEKEND_EVENING');
            } else {
              popPercHome = this.configService.get('WEEKDAY_EVENING');
            }
            break;
          }
          case 'night': {
            if (weektime == 'weekend') {
              popPercHome = this.configService.get('WEEKEND_NIGHT');
            } else {
              popPercHome = this.configService.get('WEEKDAY_NIGHT');
            }
            break;
          }
          default: {
            popPercHome = 1;
          }
        }

        // mapping for determination of population amount at home and at work
        featureCollection.features.map(function (x) {
          x.properties.t_non_res = Math.round(
            x.properties.t_non_res * (1 - popPercHome),
          );
          x.properties.t_res = Math.round(x.properties.t_res * popPercHome);
        });

        return featureCollection;
      });

    return buurtData;
  }
}
