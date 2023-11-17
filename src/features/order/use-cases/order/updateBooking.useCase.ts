import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { NotFoundException } from "@nestjs/common";
import { WithId } from "../../../../common/shared/types/withId.type";
import { UpdateBookingDataDto } from "../../dto/dtos/order/updateBookingData.dto";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";

export class UpdateBookingCommand {
  constructor(public dto: WithId<UpdateBookingDataDto>) {}
}

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingUseCase
  implements ICommandHandler<UpdateBookingCommand, boolean>
{
  constructor(
    public orderRepository: OrderRepository,
    public orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ dto }: UpdateBookingCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.orderExists(dto.id);
    if (!isExists) {
      throw new NotFoundException();
    }

    return await this.orderRepository.updateBooking(dto);
  }
}
