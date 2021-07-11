import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isLineStringCoordinate } from '../typeguards/isLineStringCoordinate.typeguard';

export function IsLineStringCoordinate(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isLineStringCoordinate',
      validator: {
        validate: (value, args): boolean => isLineStringCoordinate(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid linestring coordinate',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
