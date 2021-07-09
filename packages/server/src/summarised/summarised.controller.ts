import { Body, Controller, Post, Query } from '@nestjs/common';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import { SupportedDaypartPipe } from '../common/pipes/supportedDaypart.pipe';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { SupportedWeektimePipe } from '../common/pipes/supportedWeektime.pipe';
import { SummarisedService } from './summarised.service';

@Controller('summarised')
export class SummarisedController {
  constructor(private readonly summarisedService: SummarisedService) {}

  @Post()
  async getSummarisedData(
    @Body(new SupportedGeometryPipe())
    feature: FeatureDto,
    @Query('daypart', new SupportedDaypartPipe())
    daypart?: string,
    @Query('weektime', new SupportedWeektimePipe())
    weektime?: string,
  ): Promise<FeatureCollectionDto> {
    return this.summarisedService.getSummarisedDataInGeometry(
      feature,
      daypart,
      weektime,
    );
  }
}
