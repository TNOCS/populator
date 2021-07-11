import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FeatureDto } from '../common/dtos/Feature.dto';
import { FeatureCollectionDto } from '../common/dtos/FeatureCollection.dto';
import { SupportedDaypartPipe } from '../common/pipes/supportedDaypart.pipe';
import { SupportedGeometryPipe } from '../common/pipes/supportedGeometry.pipe';
import { SupportedWeektimePipe } from '../common/pipes/supportedWeektime.pipe';
import { SummarisedService } from './summarised.service';

@ApiTags('Neighbourhood data')
@Controller('summarised')
export class SummarisedController {
  constructor(private readonly summarisedService: SummarisedService) {}

  @Post()
  @ApiOperation({
    summary: 'Retrieve neighbourhood data from a polygon or circle',
  })
  @ApiResponse({
    status: 200,
    description: 'neighbourhood data is returned from area',
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
