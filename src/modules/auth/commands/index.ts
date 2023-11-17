import { ICommandHandler } from "@nestjs/cqrs";
import { Type } from "@nestjs/common";
import { RegistrationCommandHandler } from "./registration.command-handler";

export * from "./registration.command-handler";

export const AUTH_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  RegistrationCommandHandler,
];
