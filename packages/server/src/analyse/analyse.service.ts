import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureCollection, Polygon } from 'geojson';
import { Repository } from 'typeorm';
import Verblijfsobject from '../database/entities/verblijfsobject.entity';

@Injectable()
export class AnalyseService {
  constructor(
    @InjectRepository(Verblijfsobject)
    private verblijfsobjectRepository: Repository<Verblijfsobject>,
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

    return this.verblijfsobjectRepository
      .createQueryBuilder('verblijfsobject')
      .where(
        'ST_Within(verblijfsobject.geopunt, ST_Transform(ST_GeomFromText(:polygon, 4326), 28992))',
        { polygon: polygon },
      )
      .getMany();
  }
}
