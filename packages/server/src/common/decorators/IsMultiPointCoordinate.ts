import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isMultiPointCoordinate } from '../typeguards/isMultiPointCoordinate.typeguard';

export function IsMultiPointCoordinate(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isMultiPointCoordinate',
      validator: {
        validate: (value, args): boolean => isMultiPointCoordinate(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid multipoint coordinate',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
