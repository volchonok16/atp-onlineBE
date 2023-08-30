import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';
import { NotFoundException } from '@nestjs/common';

export class DeleteBookingDataCommand {
  constructor(public RAZNAR2_KEY: number) {}
}

@CommandHandler(DeleteBookingDataCommand)
export class DeleteBookingUseCase
  implements ICommandHandler<DeleteBookingDataCommand, boolean>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({ RAZNAR2_KEY }: DeleteBookingDataCommand): Promise<boolean> {
    const result = await this.orderRepository.deleteBookingData(RAZNAR2_KEY);

    if (result === 0) throw new NotFoundException();
    return result === 1;
  }
}
