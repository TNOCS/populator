import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { pandToFeature } from '../common/helpers/pandToFeature.helper';
import { GeometryQueryFactory } from '../common/models/GeometryQueryFactory';

@Injectable()
export class DetailedService {
  constructor(
    @InjectRepository(Pandactueelbestaand)
    private pandRepository: Repository<Pandactueelbestaand>,
    private configService: ConfigService,
  ) {}

  getDetailedDataInGeometry(
    feature: FeatureDto,
    daypart?: string,
    weektime?: string,
  ): Promise<FeatureCollectionDto> {
    const GQFactory = new GeometryQueryFactory();
    const geomQuery = GQFactory.getQuery(feature);

    const panden = this.pandRepository
      .createQueryBuilder('Pand')
      .leftJoin('Pand.verblijfsobjecten', 'VerbObj')
      .leftJoin('VerbObj.pop', 'Pop')
      .select([
        'Pand.id',
        'Pand.sts',
        'Pand.yr',
        'Pand.geovlak',
        'VerbObj.addr',
        'VerbObj.sts',
        'VerbObj.geopunt',
        'Pop.hh_size',
        'Pop.func',
        'Pop.parents_age_group',
        'Pop.parent_count',
        'Pop.ag_00_14',
        'Pop.ag_15_24',
        'Pop.ag_25_44',
        'Pop.ag_45_64',
        'Pop.ag_65_plus',
        'Pop.household_type',
        'Pop.hh_size',
      ])
      .addSelect(
        'st_asgeojson(st_transform(Pand.geovlak, 4326))::json',
        'Pand_geovlak',
      )
      .addSelect(
        'st_asgeojson(st_transform(VerbObj.geopunt, 4326))::json',
        'VerbObj_geopunt',
      )
      .where(`ST_DWithin(Pand.geovlak, ${geomQuery}, 0)`)
      .getMany()
      .then((results: any[]) => {
        const fc = new FeatureCollectionDto();
        fc.features = results.map((pand) => {
          return pandToFeature(pand);
        });

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

        fc.features.forEach(function (feature) {
          const vbos: FeatureCollectionDto = feature.properties.vbos;
          if (vbos !== undefined) {
            let total_vbo_ppl = 0;

            vbos.features.forEach(function (vbo) {
              vbo.properties.pop.forEach(function (pop) {
                if (pop.func == 'woonfunctie') {
                  pop.hh_size = Math.round(pop.hh_size * popPercHome);
                } else {
                  pop.hh_size = Math.round(pop.hh_size * (1 - popPercHome));
                }
                total_vbo_ppl += pop.hh_size;
              });
            });

            feature.properties.ttl_ppl = total_vbo_ppl;
          }
        });

        return fc;
      });

    return panden;
  }
}
