import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureDto } from '../common/dtos/Feature.dto';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { GeometryQueryFactory } from '../common/models/GeometryQueryFactory';

@Injectable()
export class DetailedService {
  constructor(
    @InjectRepository(Pandactueelbestaand)
    private pandRepository: Repository<Pandactueelbestaand>,
  ) {}

  getDetailedDataInGeometry(
    feature: FeatureDto,
  ): Promise<Pandactueelbestaand[]> {
    const GQFactory = new GeometryQueryFactory();
    const geomQuery = GQFactory.getQuery(feature);

    const panden = this.pandRepository
      .createQueryBuilder('Pand')
      .leftJoin('Pand.verblijfsobjecten', 'VerbObj')
      .leftJoin('VerbObj.population', 'Pop')
      .select([
        'Pand.identificatie',
        'Pand.pandstatus',
        'Pand.bouwjaar',
        'Pand.geovlak',
        'VerbObj.hoofdadres',
        'VerbObj.verblijfsobjectstatus',
        'VerbObj.geopunt',
        'Pop.hh_size',
        'Pop.gebruiksdoelverblijfsobject',
      ])
      .where(`ST_DWithin(Pand.geovlak, ${geomQuery}, 0)`)
      .getMany();

    return panden;
  }
}
