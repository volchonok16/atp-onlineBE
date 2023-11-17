import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateOrderDataEntryDto } from "../../dto/dtos/createOrderDataEntry.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { CreateOrderView } from "../../models/order.views/createOrderView.model";

export class CreateOrderDataForWeekPlanCommand {
  constructor(public dto: CreateOrderDataEntryDto) {}
}

@CommandHandler(CreateOrderDataForWeekPlanCommand)
export class CreateOrderDataForWeekPlanUseCase
  implements ICommandHandler<CreateOrderDataForWeekPlanCommand>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    command: CreateOrderDataForWeekPlanCommand
  ): Promise<CreateOrderView> {
    return this.orderRepository.insertIntoRaznar({
      ...command.dto,
      B_VOD: false,
      REMONT: false,
    });
  }
}
