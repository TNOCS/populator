import { Body, Controller, Post } from '@nestjs/common';
import { FeatureCollection } from 'geojson';
import { features } from 'process';
import Verblijfsobject from '../database/entities/verblijfsobject.entity';
import { GeoJsonValidationPipe } from '../pipes/geojson-validation.pipe';
import { AnalyseService } from './analyse.service';

@Controller('analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Post()
  async analyseArea(
    @Body(GeoJsonValidationPipe) featureCollectionDto: FeatureCollection,
  ): Promise<Verblijfsobject[]> {
    return this.analyseService.findInPolygon(featureCollectionDto);
  }
}
