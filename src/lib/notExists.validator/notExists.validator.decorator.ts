import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cnpj } from 'cpf-cnpj-validator';

import { PrismaService } from '../../prisma.service';

import { Inject } from '@nestjs/common';

/**
 * Search on database verifing if a value MUST NOT exists on database
 * @param table Table raw name
 * @param column Column raw name
 * @param required Is required field. If false, null values are passed. Default is true
 * @param validationOptions
 * @constructor
 */
export function NotExists(
  table: string,
  column: string,
  required = true,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [{ table: table, column: column, required: required }],
      validator: NotExistsConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'NotExists', async: true })
export class NotExistsConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [{ table, column, required }] = args.constraints;

    const prisma = new PrismaService();

    // detect null values
    if (!value) {
      // if required is false, pass. If required is true, not pass
      return !required;
    }

    const data = await prisma[table].findMany({
      where: {
        [column]: value,
      },
    });

    return data.length === 0;
  }

  defaultMessage(args?: ValidationArguments): string {
    const propertyName = args.property;
    const [{ table, column }] = args.constraints;
    return `${propertyName} value does exists on ${table} table`;
  }
}
