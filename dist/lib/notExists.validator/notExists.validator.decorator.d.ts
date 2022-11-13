import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function NotExists(table: string, column: string, required?: boolean, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class NotExistsConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args?: ValidationArguments): string;
}
