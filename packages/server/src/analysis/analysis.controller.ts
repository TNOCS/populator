import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';
import Pand from '../common/entities/pand.entity';
import { AnalysisService } from './analysis.service';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { PointDto } from '../common/dtos/Point.dto';
import { PolygonDto } from '../common/dtos/Polygon.dto';
import { CircleFeatureDto } from '../common/dtos/CircleFeature.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analyseService: AnalysisService) {}

  @Post('polygon')
  async analysePolygon(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    polygonFeature: FeatureDto,
  ): Promise<Verblijfsobject[]> {
    console.log(polygonFeature);
    return this.analyseService.findInPolygon(
      polygonFeature.geometry as PolygonDto,
    );
  }

  @Post('circle')
  async analyseCircle(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    circleFeature: CircleFeatureDto,
  ): Promise<Verblijfsobject[]> {
    return this.analyseService.findInCircle(
      circleFeature.geometry as PointDto,
      circleFeature.properties.radius,
    );
  }
}
