import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { DetailedModule } from './detailed.module';
import { DetailedService } from './detailed.service';

describe('Detailed service', () => {
  let service: DetailedService;
  let repo: Repository<Pandactueelbestaand>;
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DetailedModule,
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

    repo = module.get(getRepositoryToken(Pandactueelbestaand));
    service = new DetailedService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for getDetailedDataInGeometry when a circle is posted', async () => {
    const circleInput = {
      type: 'Feature',
      properties: {
        shape: 'Circle',
        radius: 5,
      },
      geometry: {
        type: 'Point',
        coordinates: [4.683419913053513, 51.7867934354102],
      },
    } as FeatureDto;

    const circleOutput = plainToClass(FeatureCollectionDto, {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.68346964, 51.786832013, 43.969608817],
                [4.683456108, 51.786750836, 43.969740305],
                [4.683546291, 51.786745022, 43.969753294],
                [4.683560055, 51.786826192, 43.969621826],
                [4.68346964, 51.786832013, 43.969608817],
              ],
            ],
          },
          properties: {
            id: '0505100000052003',
            sts: 'Pand in gebruik',
            yr: '1969',
            ttl_ppl: 4,
            vbos: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [4.683514841, 51.78681553, 43.969637396],
                  },
                  properties: {
                    addr: '0505200000022985',
                    sts: 'Verblijfsobject in gebruik',
                    pop: [
                      {
                        parents_age_group: '25-44',
                        parent_count: 2,
                        ag_00_14: 1,
                        ag_15_24: 1,
                        ag_25_44: 0,
                        ag_45_64: 0,
                        ag_65_plus: 0,
                        hh_size: 4,
                        household_type: 'couples with children',
                        func: 'woonfunctie',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.68346964, 51.786832013, 43.969608817],
                [4.683379747, 51.786837811, 43.969595866],
                [4.683366172, 51.786756625, 43.969727368],
                [4.683456108, 51.786750836, 43.969740305],
                [4.68346964, 51.786832013, 43.969608817],
              ],
            ],
          },
          properties: {
            id: '0505100000050881',
            sts: 'Pand in gebruik',
            yr: '1969',
            ttl_ppl: 4,
            vbos: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [4.683423425, 51.786821444, 43.969624197],
                  },
                  properties: {
                    addr: '0505200000022986',
                    sts: 'Verblijfsobject in gebruik',
                    pop: [
                      {
                        parents_age_group: '25-44',
                        parent_count: 2,
                        ag_00_14: 1,
                        ag_15_24: 1,
                        ag_25_44: 0,
                        ag_45_64: 0,
                        ag_65_plus: 0,
                        hh_size: 4,
                        household_type: 'couples with children',
                        func: 'woonfunctie',
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    });

    await service.getDetailedDataInGeometry(circleInput).then((result) => {
      expect(result).toMatchObject(circleOutput);
      expect(result).toBeInstanceOf(FeatureCollectionDto);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
