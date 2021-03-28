import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isMultiLineStringCoordinate } from '../typeguards/isMultiLineStringCoordinate.typeguard';

export function IsMultiLineStringCoordinate(
  validationOptions?: ValidationOptions,
) {
  return ValidateBy(
    {
      name: 'isMultiLineStringCoordinate',
      validator: {
        validate: (value, args): boolean => isMultiLineStringCoordinate(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid multilinestring coordinate',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
