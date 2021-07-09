import { Body, Controller, Post, Query } from '@nestjs/common';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { SupportedDaypartPipe } from '../common/pipes/supportedDaypart.pipe';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { SupportedWeektimePipe } from '../common/pipes/supportedWeektime.pipe';
import { DetailedService } from './detailed.service';

@Controller('detailed')
export class DetailedController {
  constructor(private readonly detailedService: DetailedService) {}

  @Post()
  async getDetailedData(
    @Body(new SupportedGeometryPipe())
    feature: FeatureDto,
    @Query('daypart', new SupportedDaypartPipe())
    daypart?: string,
    @Query('weektime', new SupportedWeektimePipe())
    weektime?: string,
  ): Promise<FeatureCollectionDto> {
    return this.detailedService.getDetailedDataInGeometry(
      feature,
      daypart,
      weektime,
    );
  }
}
