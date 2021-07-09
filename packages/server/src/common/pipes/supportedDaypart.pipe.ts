import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SupportedDaypartPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const supportedDayParts = ['morning', 'afternoon', 'evening', 'night'];

    if (supportedDayParts.includes(value) || value === undefined) {
      return value;
    }

    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Not supported part of day',
      errors: `${value} should be either of the following values: 'morning', 'afternoon', 'evening' or 'night'`,
    });
  }
}
