import { Body, Controller, Post } from '@nestjs/common';
import { FeatureCollection } from 'geojson';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';
import { GeoJsonValidationPipe } from '../common/pipes/geojson-validation.pipe';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analyseService: AnalysisService) {}

  @Post()
  async findInArea(
    @Body(GeoJsonValidationPipe) featureCollection: FeatureCollection,
  ): Promise<Verblijfsobject[]> {
    return this.analyseService.findInPolygon(featureCollection);
  }
}
