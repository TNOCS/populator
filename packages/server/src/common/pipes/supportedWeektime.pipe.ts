import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SupportedWeektimePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const supportedWeekTime = ['weekday', 'weekend'];

    if (supportedWeekTime.includes(value) || value === undefined) {
      return value;
    }

    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Not supported week time',
      errors: `${value} should be either of the following values: 'weekday' or 'weekend'`,
    });
  }
}
