import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";

export class deleteOrderCommand {
  constructor(public RAZN_KEY: number) {}
}

@CommandHandler(deleteOrderCommand)
export class DeleteOrderUseCase
  implements ICommandHandler<deleteOrderCommand, boolean>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({ RAZN_KEY }: deleteOrderCommand): Promise<boolean> {
    return await this.orderRepository.deleteOrder(RAZN_KEY);
  }
}
