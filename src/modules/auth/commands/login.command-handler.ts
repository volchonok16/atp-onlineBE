import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseNotificationUseCase } from "../../../common/shared/classes/base-notification.use-case";
import { Inject } from "@nestjs/common";
import { AUTH_MICROSERVICE } from "../../../common/constants/microservise-name.constant";
import { ClientProxy } from "@nestjs/microservices";
import { LoginResponse } from "../responses/login.response";
import { TCreateToken } from "../../../common/shared/types/create-token.type";
import { lastValueFrom, map } from "rxjs";
import { messagePattern } from "../../../common/constants/message-pattern.constant";
import { LoginInput } from "../input/login.input";

export class LoginCommand {
  constructor(public readonly input: LoginInput) {}
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  extends BaseNotificationUseCase<LoginCommand, TCreateToken>
  implements ICommandHandler<LoginCommand>
{
  constructor(
    @Inject(AUTH_MICROSERVICE)
    private readonly authProxyClient: ClientProxy
  ) {
    super();
  }
  async executeUseCase({ input }: LoginCommand): Promise<TCreateToken> {
    const pattern = { cmd: messagePattern.login };
    return await lastValueFrom(
      this.authProxyClient.send(pattern, input).pipe(map((result) => result))
    );
  }
}
