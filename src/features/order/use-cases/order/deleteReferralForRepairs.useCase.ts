import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";
import { UpdateReferralForRepairsCommand } from "./updateReferalForRepairs.useCase";

export class DeleteReferralForRepairsCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteReferralForRepairsCommand)
export class DeleteReferralForRepairsUseCase
  implements ICommandHandler<DeleteReferralForRepairsCommand, boolean>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ id }: DeleteReferralForRepairsCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.referalIsExists(id);
    if (!isExists) throw new NotFoundException();

    return this.orderRepository.deleteReferralForRepairs(id);
  }
}
