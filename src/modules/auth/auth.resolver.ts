import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RegistrationInput } from "./input";
import { CommandBus } from "@nestjs/cqrs";
import { RegistrationCommand } from "./commands";

@Resolver()
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation()
  async registration(@Args() input: RegistrationInput): Promise<void> {
    return await this.commandBus.execute<RegistrationCommand, void>(
      new RegistrationCommand(input)
    );
  }
}
