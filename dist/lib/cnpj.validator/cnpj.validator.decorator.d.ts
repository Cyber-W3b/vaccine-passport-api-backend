import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function CnpjValid(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class CnpjValidConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(args?: ValidationArguments): string;
}
