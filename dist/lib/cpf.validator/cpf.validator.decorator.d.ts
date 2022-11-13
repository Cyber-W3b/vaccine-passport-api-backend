import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function CpfValid(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class CpfValidConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(args?: ValidationArguments): string;
}
