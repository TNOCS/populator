import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isPolygonCoordinate } from '../typeguards/isPolygonCoordinate.typeguard';

export function IsPolygonCoordinate(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isPolygonCoordinate',
      validator: {
        validate: (value, args): boolean => isPolygonCoordinate(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid polygon coordinate',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
