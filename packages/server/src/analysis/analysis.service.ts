import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureCollection } from 'geojson';
import { Repository } from 'typeorm';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Verblijfsobject)
    private verblijfsobjectactueelRepository: Repository<Verblijfsobject>,
  ) {}

  findInPolygon(
    featureCollection: FeatureCollection,
  ): Promise<Verblijfsobject[]> {
    const polygonCoordinateStrings: string[] = [];

    if (featureCollection.features[0].geometry.type === 'Polygon') {
      featureCollection.features[0].geometry.coordinates[0].forEach(
        (coordinate) => {
          const coordinateString = `${coordinate[0]} ${coordinate[1]}`;
          console.log(coordinateString);
          console.log(coordinate);
          polygonCoordinateStrings.push(coordinateString);
        },
      );
    }

    console.log(polygonCoordinateStrings.toString());
    const polygon = `POLYGON((${polygonCoordinateStrings.toString()}))`;
    console.log(polygon);

    return this.verblijfsobjectactueelRepository
      .createQueryBuilder('verblijfsobjectactueel')
      .where(
        'ST_Within(verblijfsobjectactueel.geopunt, ST_Transform(ST_GeomFromText(:polygon, 4326), 28992))',
        { polygon: polygon },
      )
      .getMany();
  }
}
