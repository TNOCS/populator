import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isMultiPolygonCoordinate } from '../typeguards/isMultiPolygonCoordinate.typeguard';

export function IsMultiPolygonCoordinate(
  validationOptions?: ValidationOptions,
) {
  return ValidateBy(
    {
      name: 'isMultiPolygonCoordinate',
      validator: {
        validate: (value, args): boolean => isMultiPolygonCoordinate(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid multipolygon coordinate',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
