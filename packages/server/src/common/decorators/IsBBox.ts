import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isBBox } from '../typeguards/isBBox.typeguard';

export function IsBBox(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isBBox',
      validator: {
        validate: (value, args): boolean => isBBox(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid bounding box',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
