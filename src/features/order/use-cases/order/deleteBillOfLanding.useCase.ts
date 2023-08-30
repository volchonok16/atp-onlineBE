import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';

export class DeleteBillOfLandingCommand {
  constructor(public TTN_ID: number) {}
}

@CommandHandler(DeleteBillOfLandingCommand)
export class DeleteBillOfLandingUseCase
  implements ICommandHandler<DeleteBillOfLandingCommand>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute(command: DeleteBillOfLandingCommand): Promise<any> {
    return await this.orderRepository.deleteBillOfLanding(command.TTN_ID);
  }
}
