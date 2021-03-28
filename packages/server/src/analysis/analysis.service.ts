import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { PointDto } from '../common/dtos/Point.dto';
import { PolygonDto } from '../common/dtos/Polygon.dto';
import Pand from '../common/entities/pand.entity';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Verblijfsobject)
    private verblijfsobjectRepository: Repository<Verblijfsobject>,
  ) {}

  findInPolygon(polygon: PolygonDto): Promise<Verblijfsobject[]> {
    console.log('polygpn = ', polygon);
    console.log();

    const polygonCoordinateStrings: string[] = [];

    polygon.coordinates[0].forEach((coordinate) => {
      const coordinateString = `${coordinate[0]} ${coordinate[1]}`;
      console.log(coordinateString);
      console.log(coordinate);
      polygonCoordinateStrings.push(coordinateString);
    });

    console.log(polygonCoordinateStrings.toString());
    const polygon_text = `POLYGON((${polygonCoordinateStrings.toString()}))`;
    console.log(polygon);

    return this.verblijfsobjectRepository
      .createQueryBuilder('verblijfsobjectactueel')
      .where(
        'ST_Within(verblijfsobjectactueel.geopunt, ST_Transform(ST_GeomFromText(:polygon, 4326), 28992))',
        { polygon: polygon_text },
      )
      .getMany();
  }

  findInCircle(circle: PointDto, radius: number): Promise<Verblijfsobject[]> {
    const lat = circle.coordinates[0];
    const long = circle.coordinates[1];

    return this.verblijfsobjectRepository
      .createQueryBuilder('voa')
      .where(
        'ST_DWithin(voa.geopunt, ST_Transform(ST_SetSrid(ST_MakePoint(:lat, :long), 4326), 28992), :radius)',
        { lat: lat, long: long, radius: radius },
      )
      .getMany();
  }
}
