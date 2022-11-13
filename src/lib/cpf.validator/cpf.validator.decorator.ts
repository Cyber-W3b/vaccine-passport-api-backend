import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator';

/**
 * Validate a CPF field
 * @param validationOptions
 * @constructor
 */
export function CpfValid(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CpfValidConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'CpfValid' })
export class CpfValidConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return cpf.isValid(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    const propertyName = args.property;
    return `${propertyName} does not represent a CPF valid`;
  }
}
