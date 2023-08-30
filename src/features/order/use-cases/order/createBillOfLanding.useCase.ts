import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BillOfLadingCreateDto } from '../../dto/dtos/billOfLadingCreate.dto';
import { OrderRepository } from '../../repositories/order.repository';
import { BillOfLadingViewModel } from '../../models/order.views/billOfLadingViewModel';

export class CreateBillOfLadingCommand {
  constructor(public billOfLandingCreateDto: BillOfLadingCreateDto) {}
}

@CommandHandler(CreateBillOfLadingCommand)
export class CreateBillOfLandingUseCase
  implements ICommandHandler<CreateBillOfLadingCommand>
{
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    command: CreateBillOfLadingCommand,
  ): Promise<BillOfLadingViewModel> {
    return await this.orderRepository.createBillOfLanding(
      command.billOfLandingCreateDto,
    );
  }
}
