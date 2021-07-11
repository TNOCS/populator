import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import Pandactueelbestaand from '../common/entities/pand.entity';
import { SupportedDaypartPipe } from '../common/pipes/supportedDaypart.pipe';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { SupportedWeektimePipe } from '../common/pipes/supportedWeektime.pipe';
import { DetailedService } from './detailed.service';

@ApiTags('Household data')
@Controller('detailed')
export class DetailedController {
  constructor(private readonly detailedService: DetailedService) {}

  @Post()
  @ApiOperation({
    summary: 'Retrieve household data from a polygon or circle',
  })
  @ApiResponse({
    status: 200,
    description: 'Household data is returned from area',
    type: FeatureCollectionDto,
  })
  @ApiParam({
    name: 'daypart',
    required: false,
    description: 'time of request: morning / afternoon / evening / night',
  })
  @ApiParam({
    name: 'weektime',
    required: false,
    description: 'day of request: weekday / weekend',
  })
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
