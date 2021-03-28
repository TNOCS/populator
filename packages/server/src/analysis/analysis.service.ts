import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { ReturnData } from '../common/dtos/Data.dto';
import { PointDto } from '../common/dtos/Point.dto';
import { PolygonDto } from '../common/dtos/Polygon.dto';
import { Buurten } from '../common/entities/buurten.entity';
import Pand from '../common/entities/pand.entity';
import Verblijfsobjectactueel from '../common/entities/verblijfsobject.entity';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Verblijfsobjectactueel)
    private verblijfsobjectRepository: Repository<Verblijfsobjectactueel>,
    @InjectRepository(Buurten)
    private buurtRepository: Repository<Buurten>,
  ) {}

  findInPolygon(polygon: PolygonDto): Promise<unknown> {
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
    console.log(polygon_text);

    const buurten = this.buurtRepository
      .createQueryBuilder('buurten')
      .where(
        'ST_Intersects(buurten.geovlak, ST_Transform(ST_GeomFromText(:polygon, 4326), 28992))',
        {
          polygon: polygon_text,
        },
      )
      .getMany();

    const verblijfsobjecten = this.verblijfsobjectRepository
      .createQueryBuilder('VOA')
      .leftJoin('VOA.identificatie', 'VOPA')
      .leftJoin('VOPA.gerelateerdpand', 'PAND')
      .select(['VOA', 'VOPA.identificatie', 'VOPA.gerelateerdpand', 'PAND'])
      .where(
        'ST_Within(VOA.geopunt, ST_Transform(ST_GeomFromText(:polygon, 4326), 28992))',
        { polygon: polygon_text },
      )
      .getMany();

    return Promise.all([buurten, verblijfsobjecten]).then((values) => {
      return { cbs_data: values[0], bag_data: values[1] };
    });
  }

  findInCircle(circle: PointDto, radius: number): Promise<unknown> {
    const lat = circle.coordinates[0];
    const long = circle.coordinates[1];

    const point = `POINT(${lat} ${long})`;

    const buurten = this.buurtRepository
      .createQueryBuilder('buurten')
      .where(
        'ST_Intersects(buurten.geovlak, st_buffer(ST_Transform(ST_GeomFromText(:point, 4326), 28992), :radius))',
        {
          point: point,
          radius: radius,
        },
      )
      .getMany();

    const verblijfsobjecten = this.verblijfsobjectRepository
      .createQueryBuilder('VOA')
      .leftJoin('VOA.identificatie', 'VOPA')
      .leftJoin('VOPA.gerelateerdpand', 'PAND')
      .select(['VOA', 'VOPA.identificatie', 'VOPA.gerelateerdpand', 'PAND'])
      .where(
        'ST_DWithin(VOA.geopunt, ST_Transform(ST_GeomFromText(:point, 4326), 28992), :radius)',
        { point: point, radius: radius },
      )
      .getMany();

    return Promise.all([buurten, verblijfsobjecten]).then((values) => {
      return { cbs_data: values[0], bag_data: values[1] };
    });
  }
}
