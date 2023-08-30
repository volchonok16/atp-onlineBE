import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';
import { UpdateCarForOrderDto } from '../../dto/dtos/updateCarForOrderDto';
import { WithId } from '../../../../common/types/withId.type';

export class UpdateOrderCommand {
  constructor(public dto: WithId<UpdateCarForOrderDto>) {}
}

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderUseCase
  implements ICommandHandler<UpdateOrderCommand, boolean>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({ dto }: UpdateOrderCommand): Promise<boolean> {
    return await this.orderRepository.updateOrder(dto);
  }
}
