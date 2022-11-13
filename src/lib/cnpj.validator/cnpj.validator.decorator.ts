import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cnpj } from 'cpf-cnpj-validator';

/**
 * Validate a CNPJ field
 * @param validationOptions
 * @constructor
 */
export function CnpjValid(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CnpjValidConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'CnpjValid' })
export class CnpjValidConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return cnpj.isValid(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    const propertyName = args.property;
    return `${propertyName} does not represent a CNPJ valid`;
  }
}
