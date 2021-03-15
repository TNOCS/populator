import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import Ajv from 'ajv';
import { isFeatureCollection } from 'geojson-validation';

@Injectable()
export class GeoJsonValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (isFeatureCollection(value) === false) {
      const errors = [];
      isFeatureCollection(value, true).forEach((element) => {
        errors.push(element.replace(/"/g, "'"));
      });

      throw new UnprocessableEntityException(
        `The provided FeatureCollection format is invalid. Please refer to https://tools.ietf.org/html/rfc7946 for more details on how to properly format a FeatureCollection geojson`,
        errors[0],
      );
    }
    return value;
  }
}
