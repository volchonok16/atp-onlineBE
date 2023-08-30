import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';
import { NotFoundException } from '@nestjs/common';
import { WithId } from '../../../../common/types/withId.type';
import { UpdateBookingDataDto } from '../../dto/dtos/order/updateBookingData.dto';

export class UpdateBookingCommand {
  constructor(public dto: WithId<UpdateBookingDataDto>) {}
}

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingUseCase
  implements ICommandHandler<UpdateBookingCommand, boolean>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({ dto }: UpdateBookingCommand): Promise<boolean> {
    const result = await this.orderRepository.updateBooking(dto);

    if (result === 0) throw new NotFoundException();
    return result === 1;
  }
}
