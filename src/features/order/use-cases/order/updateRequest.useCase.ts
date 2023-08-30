import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';
import { UpdateRequestDto } from '../../dto/dtos/updateRequest.dto';
import { WithId } from '../../../../common/types/withId.type';

export class UpdateRequestCommand {
  constructor(public dto: WithId<UpdateRequestDto>) {}
}

@CommandHandler(UpdateRequestCommand)
export class UpdateRequestUseCase
  implements ICommandHandler<UpdateRequestCommand, boolean>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({ dto }: UpdateRequestCommand): Promise<boolean> {
    return await this.orderRepository.updateRequest(dto);
  }
}
