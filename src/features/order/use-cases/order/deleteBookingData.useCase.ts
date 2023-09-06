import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { NotFoundException } from "@nestjs/common";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";

export class DeleteBookingDataCommand {
  constructor(public RAZNAR2_KEY: number) {}
}

@CommandHandler(DeleteBookingDataCommand)
export class DeleteBookingUseCase
  implements ICommandHandler<DeleteBookingDataCommand, boolean>
{
  constructor(
    public readonly orderRepository: OrderRepository,
    public readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ RAZNAR2_KEY }: DeleteBookingDataCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.bookingExists(RAZNAR2_KEY);
    if (!isExists) throw new NotFoundException();

    return await this.orderRepository.deleteBookingData(RAZNAR2_KEY);
  }
}
