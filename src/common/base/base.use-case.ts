import { Logger } from "@nestjs/common";

export abstract class BaseUseCase<TCommand, TResult> {
  private readonly logger = new Logger(BaseUseCase.name);

  async execute(command: TCommand): Promise<TResult> {
    try {
      return await this.executeUseCase(command);
    } catch (e) {
      this.logger.log("BaseUseCase:", JSON.stringify(command));
      this.logger.error(JSON.stringify(e));
    }
  }

  abstract executeUseCase(command: TCommand): Promise<TResult>;
}
