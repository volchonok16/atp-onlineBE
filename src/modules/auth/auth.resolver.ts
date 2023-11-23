import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { RegistrationInput } from "./input";
import { CommandBus } from "@nestjs/cqrs";
import { LoginCommand, RegistrationCommand } from "./commands";
import { LoginInput } from "./input/login.input";
import { TCreateToken } from "../../common/shared/types/create-token.type";
import { LoginResponse } from "./responses/login.response";
import { ResultNotificationFactory } from "../../common/shared/classes/result-notification.factory";

@Resolver()
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Boolean)
  async registration(
    @Args("registrationInput") registrationInput: RegistrationInput
  ): Promise<void> {
    return await this.commandBus.execute<RegistrationCommand, void>(
      new RegistrationCommand(registrationInput)
    );
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args("loginInput") loginInput: LoginInput
  ): Promise<TCreateToken> {
    const notification = await this.commandBus.execute<
      LoginCommand,
      ResultNotificationFactory<TCreateToken>
    >(new LoginCommand(loginInput));
    return notification.getData();
  }

  // Без этого не работает :)
  @Query(() => LoginResponse)
  async me() {}
}
