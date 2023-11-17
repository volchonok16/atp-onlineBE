import { RegistrationInput } from "../input";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseNotificationUseCase } from "../../../common/shared/classes/base-notification.use-case";
import { Inject } from "@nestjs/common";
import { AUTH_MICROSERVICE } from "../../../common/constants/microservise-name.constant";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { authCommand } from "../../../common/constants/command-name.constant";

export class RegistrationCommand {
  constructor(public readonly input: RegistrationInput) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  extends BaseNotificationUseCase<RegistrationCommand, void>
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    @Inject(AUTH_MICROSERVICE)
    private readonly authProxyClient: ClientProxy
  ) {
    super();
  }

  async executeUseCase({ input }: RegistrationCommand): Promise<void> {
    const pattern = { cmd: authCommand.registration };
    return await lastValueFrom(
      this.authProxyClient.send(pattern, input).pipe(map((result) => result))
    );
  }
}
