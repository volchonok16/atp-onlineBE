import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { UpdateRequestDto } from "../../dto/dtos/updateRequest.dto";
import { WithId } from "../../../../common/shared/types/withId.type";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class UpdateRequestCommand {
  constructor(public dto: WithId<UpdateRequestDto>) {}
}

@CommandHandler(UpdateRequestCommand)
export class UpdateRequestUseCase
  implements ICommandHandler<UpdateRequestCommand, boolean>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ dto }: UpdateRequestCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.getRequest(dto.id);
    if (!isExists) throw new NotFoundException();

    return await this.orderRepository.updateRequest(dto);
  }
}
