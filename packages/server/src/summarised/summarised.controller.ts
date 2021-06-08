import { Body, Controller, Post } from '@nestjs/common';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { Buurten } from '../common/entities/buurten.entity';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { SummarisedService } from './summarised.service';

@Controller('summarised')
export class SummarisedController {
  constructor(private readonly summarisedService: SummarisedService) {}

  @Post()
  async getSummarisedData(
    @Body(new SupportedGeometryPipe())
    feature: FeatureDto,
  ): Promise<Buurten[]> {
    return this.summarisedService.getSummarisedDataInGeometry(feature);
  }
}
