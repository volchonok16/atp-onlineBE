import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../repositories/authRepository';

export class CheckCredentialsCommand {
  constructor(public username: string, public password: string) {}
}

@CommandHandler(CheckCredentialsCommand)
export class CheckCredentialsUseCase
  implements ICommandHandler<CheckCredentialsCommand>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: CheckCredentialsCommand) {
    // find user by username and pass
    const user = await this.authRepository.findUserByUsernameAndPass(
      command.username,
      command.password,
    );
    if (!user) return null;

    //user is correct
    return { id: user.id };
  }
}
