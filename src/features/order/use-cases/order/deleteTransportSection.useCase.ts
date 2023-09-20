import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteTransportSectionCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteTransportSectionCommand)
export class DeleteTransportSectionUseCase
  implements ICommandHandler<DeleteTransportSectionCommand, boolean>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ id }: DeleteTransportSectionCommand): Promise<boolean> {
    const isExist = await this.orderQueryRepository.transportSectionExists(id);
    if (!isExist) throw new NotFoundException();

    return this.orderRepository.deleteTransportSection(id);
  }
}
