import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import Verblijfsobject from '../common/entities/verblijfsobject.entity';
import { AnalysisService } from './analysis.service';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { PointDto } from '../common/dtos/Point.dto';
import { PolygonDto } from '../common/dtos/Polygon.dto';
import { CircleFeatureDto } from '../common/dtos/CircleFeature.dto';
import { Buurten } from '../common/entities/buurten.entity';
import { ReturnData } from '../common/dtos/Data.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analyseService: AnalysisService) {}

  @Post('polygon')
  async analysePolygon(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    polygonFeature: FeatureDto,
  ): Promise<unknown> {
    console.log(polygonFeature);
    return this.analyseService.findInPolygon(
      polygonFeature.geometry as PolygonDto,
    );
  }

  @Post('circle')
  async analyseCircle(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    circleFeature: CircleFeatureDto,
  ): Promise<unknown> {
    const a = this.analyseService.findInCircle(
      circleFeature.geometry as PointDto,
      circleFeature.properties.radius,
    );

    return a;
  }
}
