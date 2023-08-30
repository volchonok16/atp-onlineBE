import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtAdapter } from '../../../common/adapters/jwt/jwtAdapter';

export class CreateTokenCommand {
  constructor(public userId: number) {}
}

@CommandHandler(CreateTokenCommand)
export class CreateTokenUseCase
  implements ICommandHandler<CreateTokenCommand, string>
{
  constructor(private readonly jwtAdapter: JwtAdapter) {}

  async execute(command: CreateTokenCommand): Promise<string> {
    //create token
    const token = await this.jwtAdapter.createToken(command.userId);
    return token;
  }
}
