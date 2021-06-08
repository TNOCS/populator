import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { Buurten } from '../common/entities/buurten.entity';
import { GeometryQueryFactory } from '../common/models/GeometryQueryFactory';

@Injectable()
export class SummarisedService {
  constructor(
    @InjectRepository(Buurten)
    private summarisedRepository: Repository<Buurten>,
  ) {}

  getSummarisedDataInGeometry(feature: FeatureDto): Promise<Buurten[]> {
    const GQFactory = new GeometryQueryFactory();
    const geomQuery = GQFactory.getQuery(feature);

    const buurtData = this.summarisedRepository
      .query(
        'select * from cbs.buurtdata b where st_contains(' +
          geomQuery +
          ', b.geovlak) ' +
          'UNION ' +
          'select * from GetPartialBuurtData(' +
          geomQuery +
          ')',
      )
      .then((results: any[]) => {
        return results.map((el) => plainToClass(Buurten, el));
      });

    return buurtData;
  }
}
