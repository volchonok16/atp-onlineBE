import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OutputDataDto } from '../../dto/dtos/outputData.dto';
import { OrderRepository } from '../../repositories/order.repository';

export class AddWayBillNumberCommand {
  constructor(public outputDataDto: OutputDataDto) {}
}

@CommandHandler(AddWayBillNumberCommand)
export class AddWayBillNumberUseCase
  implements ICommandHandler<AddWayBillNumberCommand>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute(command: AddWayBillNumberCommand): Promise<boolean> {
    return await this.orderRepository.addWayBillNumber(
      command.outputDataDto.usersWayBillNumber,
      command.outputDataDto.RAZN_ID,
    );
  }
}
