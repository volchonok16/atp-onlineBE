import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthRepository } from "../repositories/authRepository";

export class ChangePasswordCommand {
  constructor(public userId: number, public newPassword: string) {}
}

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordUseCase
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: ChangePasswordCommand) {
    await this.authRepository.changePasswordByUserId(
      command.userId,
      command.newPassword
    );
    return;
  }
}
