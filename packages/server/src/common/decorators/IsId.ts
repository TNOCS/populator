import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';

export function IsId(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isId',
      validator: {
        validate: (value, args): boolean =>
          ['string', 'number'].includes(typeof value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid id',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
