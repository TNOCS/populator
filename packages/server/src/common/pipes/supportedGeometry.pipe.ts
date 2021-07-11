import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CircleFeatureDto } from '../dtos/CircleFeature.dto';
import { FeatureDto } from '../dtos/Feature.dto';
import { PolygonDto } from '../dtos/Polygon.dto';

@Injectable()
export class SupportedGeometryPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const circleErrors = await validate(plainToClass(CircleFeatureDto, value));
    const featureErrors = await validate(plainToClass(FeatureDto, value));
    const polygonErrors = await validate(
      plainToClass(PolygonDto, value.geometry),
    );

    // is a valid feature containing a polygon or a valid circle feature
    if (
      (featureErrors.length === 0 && polygonErrors.length === 0) ||
      circleErrors.length === 0
    ) {
      return value;
    }

    let validation_errors;
    if (value.geometry.type === 'Point') {
      validation_errors = circleErrors;
    }

    if (value.geometry.type === 'Polygon') {
      validation_errors = featureErrors;
    }

    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message:
        'Validation failed: only polygons and circles are supported, refer to the API docs for the correct formatting of post request',
      errors: validation_errors,
    });
  }
}
