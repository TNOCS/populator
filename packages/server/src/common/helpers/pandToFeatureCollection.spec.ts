import { plainToClass } from 'class-transformer';
import { FeatureDto } from '../dtos/Feature.dto';
import Pandactueelbestaand from '../entities/pand.entity';
import { isFeatureObject } from '../typeguards/isFeatureObject.typeguard';
import { pandToFeature } from './pandToFeature.helper';

describe('pand to feature conversion for building return object', () => {
  const pandObject = {
    id: '0505100000052003',
    sts: 'Pand in gebruik',
    yr: '1969',
    geovlak: {
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
    verblijfsobjecten: [
      {
        addr: '0505200000022985',
        sts: 'Verblijfsobject in gebruik',
        geopunt: {
          type: 'Point',
          coordinates: [4.683514841, 51.78681553, 43.969637396],
        },
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
    ],
    ttl_ppl: 4,
  };

  const validGeoJsonFeatureResult = {
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
  } as FeatureDto;

  it('should convert a pand to a valid feature', async () => {
    const feature = pandToFeature(
      plainToClass(Pandactueelbestaand, pandObject),
    );
    expect(feature).toMatchObject(validGeoJsonFeatureResult);
    expect(isFeatureObject(feature)).toBe(true);
  });
});
