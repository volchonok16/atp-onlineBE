import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsValidDate', async: false })
@Injectable()
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments) {
    const date = new Date(value);
    const isDate = !isNaN(date.valueOf());
    if (!isDate) return false;

    const isValidDate = date.getTime() >= Date.now() * 1000;
    if (!isValidDate) return false;

    args.object[args.property] = date.toLocaleDateString();
    return true;
  }

  defaultMessage() {
    return `Invalid format or date must be greater than or equal to today's date.`;
  }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
}
