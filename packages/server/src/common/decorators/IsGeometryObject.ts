import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { isGeometryObject } from '../typeguards/isGeometryObject.typeguard';

export function IsGeometryObject(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'isGeometryObject',
      validator: {
        validate: (value, args): boolean => isGeometryObject(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid geometry object',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
