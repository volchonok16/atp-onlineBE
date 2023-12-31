import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteProductSectionCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteProductSectionCommand)
export class DeleteProductSectionUseCase
  implements ICommandHandler<DeleteProductSectionCommand, boolean>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ id }: DeleteProductSectionCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.productSectionExists(id);
    if (!isExists) throw new NotFoundException();

    return this.orderRepository.deleteProductSection(id);
  }
}
