import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { timeToTimestampTransformHelper } from "../helpers/timeToTimestampTransform.helper";
import { val } from "cheerio/lib/api/attributes";

@ValidatorConstraint({ name: "IsValidTime", async: false })
@Injectable()
export class IsValidTimeConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!regex.test(value)) return false;

    args.object[args.property] = timeToTimestampTransformHelper(value);
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid ${args.property} format.`;
  }
}

export function IsValidTime(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTimeConstraint,
    });
  };
}
