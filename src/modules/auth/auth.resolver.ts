import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RegistrationInput } from "./input";
import { CommandBus } from "@nestjs/cqrs";
import { LoginCommand, RegistrationCommand } from "./commands";
import { LoginInput } from "./input/login.input";
import { TCreateToken } from "../../common/shared/types/create-token.type";
import { LoginResponse } from "./responses/login.response";

@Resolver()
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation()
  async registration(@Args() input: RegistrationInput): Promise<void> {
    return await this.commandBus.execute<RegistrationCommand, void>(
      new RegistrationCommand(input)
    );
  }

  @Mutation(() => LoginResponse)
  async login(@Args() input: LoginInput): Promise<TCreateToken> {
    console.log(input);
    return await this.commandBus.execute<LoginCommand, TCreateToken>(
      new LoginCommand(input)
    );
  }
}
