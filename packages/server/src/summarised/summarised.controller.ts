import { Body, Controller, Post } from '@nestjs/common';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { SummarisedService } from './summarised.service';

@Controller('summarised')
export class SummarisedController {
  constructor(private readonly summarisedService: SummarisedService) {}

  @Post()
  async getSummarisedData(
    @Body(new SupportedGeometryPipe())
    feature: FeatureDto,
  ): Promise<FeatureCollectionDto> {
    return this.summarisedService.getSummarisedDataInGeometry(feature);
  }
}
