import { Body, Controller, Post } from '@nestjs/common';
import { FeatureDto } from '../common/dtos/Feature.dto';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { DetailedService } from './detailed.service';

@Controller('detailed')
export class DetailedController {
  constructor(private readonly detailedService: DetailedService) {}

  @Post()
  async getDetailedData(
    @Body(new SupportedGeometryPipe())
    feature: FeatureDto,
  ): Promise<Pandactueelbestaand[]> {
    return this.detailedService.getDetailedDataInGeometry(feature);
  }
}
