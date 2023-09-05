import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { UpdateCarForOrderDto } from "../../dto/dtos/updateCarForOrderDto";
import { WithId } from "../../../../common/types/withId.type";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { BadRequestException } from "@nestjs/common";

export class UpdateOrderCommand {
  constructor(public dto: WithId<UpdateCarForOrderDto>) {}
}

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderUseCase
  implements ICommandHandler<UpdateOrderCommand, boolean>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ dto }: UpdateOrderCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.orderExists(dto.id);
    if (!isExists) throw new BadRequestException();

    return await this.orderRepository.updateOrder(dto);
  }
}
