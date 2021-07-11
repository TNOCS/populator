import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import { Buurten } from '../common/entities/buurten.entity';
import { SummarisedModule } from './summarised.module';
import { SummarisedService } from './summarised.service';

describe('Summarised service', () => {
  let app: INestApplication;
  let repo: Repository<Buurten>;
  let summarisedService: SummarisedService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SummarisedModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DB'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
          }),
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    repo = module.get(getRepositoryToken(Buurten));
    summarisedService = new SummarisedService(repo);
  });

  it('should be defined', () => {
    expect(summarisedService).toBeDefined();
  });

  it('should retrieve buurtdata based on a posted circle feature and return geojson', async () => {
    const circle = {
      type: 'Feature',
      properties: {
        shape: 'Circle',
        radius: 100,
      },
      geometry: {
        type: 'Point',
        coordinates: [4.677568674087524, 51.7874156260117],
      },
    } as FeatureDto;

    const output = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 6230,
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.679017915, 51.787424388],
                [4.678992821, 51.787248876],
                [4.678912998, 51.787079772],
                [4.678781515, 51.786923575],
                [4.678603424, 51.786786288],
                [4.67838557, 51.786673186],
                [4.678136325, 51.786588615],
                [4.677865267, 51.786535826],
                [4.677582811, 51.786516846],
                [4.677470837, 51.786523002],
                [4.67749943, 51.78767488],
                [4.677132775, 51.78818348],
                [4.677044068, 51.788251028],
                [4.677272072, 51.788295433],
                [4.677554538, 51.788314414],
                [4.677837548, 51.788298854],
                [4.678110225, 51.788249352],
                [4.678362089, 51.788167809],
                [4.678583461, 51.788057361],
                [4.678765834, 51.787922251],
                [4.678902199, 51.787767672],
                [4.678987316, 51.787599564],
                [4.679017915, 51.787424388],
              ],
            ],
          },
          properties: {
            gid: 6230,
            t_res: 194,
            bu_code: 'BU05050901',
            bu_naam: 'Sterrenburg 1-Oost',
            gm_naam: 'Dordrecht',
            wk_naam: 'Wijk 09 Sterrenburg',
            postcode: '3318',
            t_hh_m_k: 22,
            t_hh_z_k: 1,
            aantal_hh: 149,
            gem_hh_gr: 1.3,
            t_eenp_hh: 126,
            t_non_res: 33,
            t_00_14_jr: 22,
            t_15_24_jr: 0,
            t_25_44_jr: 84,
            t_45_64_jr: 41,
            t_65_eo_jr: 47,
          },
        },
      ],
    };

    await summarisedService
      .getSummarisedDataInGeometry(circle)
      .then((result) => {
        expect(result).toMatchObject(output);
        expect(result).toBeInstanceOf(FeatureCollectionDto);
      });
  });

  it('should retrieve buurtdata based on a posted polygon', async () => {
    const polygon = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4.675304889678955, 51.78609491253583],
            [4.6791136264801025, 51.78609491253583],
            [4.6791136264801025, 51.788301610616614],
            [4.675304889678955, 51.788301610616614],
            [4.675304889678955, 51.78609491253583],
          ],
        ],
      },
    } as FeatureDto;

    const output = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 6229,
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.677460212, 51.786094932],
                [4.675304891, 51.786094916],
                [4.675304891, 51.788301614],
                [4.676977618, 51.78830163],
                [4.677132775, 51.78818348],
                [4.67749943, 51.78767488],
                [4.677460212, 51.786094932],
              ],
            ],
          },
          properties: {
            gid: 6229,
            t_res: 120,
            bu_code: 'BU05050900',
            bu_naam: 'Sterrenburg 1-West',
            gm_naam: 'Dordrecht',
            wk_naam: 'Wijk 09 Sterrenburg',
            postcode: '3318',
            t_hh_m_k: 26,
            t_hh_z_k: 0,
            aantal_hh: 92,
            gem_hh_gr: 1.3,
            t_eenp_hh: 66,
            t_non_res: 968,
            t_00_14_jr: 1,
            t_15_24_jr: 25,
            t_25_44_jr: 11,
            t_45_64_jr: 40,
            t_65_eo_jr: 43,
          },
        },
        {
          type: 'Feature',
          id: 6230,
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.676977618, 51.78830163],
                [4.679113628, 51.788301614],
                [4.679113628, 51.786094916],
                [4.677460212, 51.786094932],
                [4.67749943, 51.78767488],
                [4.677132775, 51.78818348],
                [4.676977618, 51.78830163],
              ],
            ],
          },
          properties: {
            gid: 6230,
            t_res: 328,
            bu_code: 'BU05050901',
            bu_naam: 'Sterrenburg 1-Oost',
            gm_naam: 'Dordrecht',
            wk_naam: 'Wijk 09 Sterrenburg',
            postcode: '3318',
            t_hh_m_k: 50,
            t_hh_z_k: 7,
            aantal_hh: 220,
            gem_hh_gr: 1.5,
            t_eenp_hh: 163,
            t_non_res: 69,
            t_00_14_jr: 50,
            t_15_24_jr: 12,
            t_25_44_jr: 100,
            t_45_64_jr: 87,
            t_65_eo_jr: 79,
          },
        },
      ],
    };

    await summarisedService
      .getSummarisedDataInGeometry(polygon)
      .then((result) => {
        expect(result).toMatchObject(output);
        expect(result).toBeInstanceOf(FeatureCollectionDto);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
