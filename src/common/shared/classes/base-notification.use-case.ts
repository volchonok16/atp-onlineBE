import { Logger } from '@nestjs/common';
import { ResultNotificationFactory } from './result-notification.factory';
import { NotificationErrors } from './notification.errors';

export abstract class BaseNotificationUseCase<TCommand, TResult> {
  private readonly logger = new Logger(BaseNotificationUseCase.name);

  async execute(
    command: TCommand,
  ): Promise<ResultNotificationFactory<TResult>> {
    const notification = new ResultNotificationFactory<TResult>();
    try {
      const result = await this.executeUseCase(command);
      if (result) notification.addData(result);
    } catch (e) {
      notification.addErrorFromNotificationException(e);

      this.logger.log('BaseNotificationUseCase:', +JSON.stringify(command));
      this.logger.error(JSON.stringify(e));
    }

    if (notification.hasError()) throw new NotificationErrors(notification);

    return notification;
  }

  abstract executeUseCase(command: TCommand): Promise<TResult>;
}
