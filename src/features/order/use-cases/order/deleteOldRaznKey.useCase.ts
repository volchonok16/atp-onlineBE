import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteOldRaznKeyCommand {
  constructor(public OLD_RAZN_KEY: number) {}
}

@CommandHandler(DeleteOldRaznKeyCommand)
export class DeleteOldRaznKeyUseCase
  implements ICommandHandler<DeleteOldRaznKeyCommand>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    public readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute(command: DeleteOldRaznKeyCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.checkRaznarId(
      command.OLD_RAZN_KEY
    );
    if (!isExists) throw new NotFoundException();
    return this.orderRepository.deleteOldRaznKey(command.OLD_RAZN_KEY);
  }
}
