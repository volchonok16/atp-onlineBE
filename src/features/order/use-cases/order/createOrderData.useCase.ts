import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';
import { BadRequestException } from '@nestjs/common';
import { ErrorsMessages } from '../../../../common/errors/errorsMessages.enum';

export class CreateOrderDataCommand {
  constructor(public date: Date, public motorcadeName: number) {}
}

@CommandHandler(CreateOrderDataCommand)
export class CreateOrderDataUseCase
  implements ICommandHandler<CreateOrderDataCommand>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: CreateOrderDataCommand): Promise<void> {
    const { date, motorcadeName } = command;
    //check does order data exist for this date
    const orderDataExists = await this.orderRepository.checkDoesOrderDataExist(
      date,
    );

    if (orderDataExists)
      throw new BadRequestException(ErrorsMessages.orderDataExists);

    //create order data
    await this.orderRepository.createOrderData(date, motorcadeName);
    return;
  }
}
