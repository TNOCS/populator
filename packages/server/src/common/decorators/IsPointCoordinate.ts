import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isPosition } from '../typeguards/isPosition.typeguard';

export function IsPointCoordinate(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isPosition',
      validator: {
        validate: (value, args): boolean => isPosition(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid position',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
