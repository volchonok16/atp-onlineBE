import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteBillOfLandingCommand {
  constructor(public TTN_ID: number) {}
}

@CommandHandler(DeleteBillOfLandingCommand)
export class DeleteBillOfLandingUseCase
  implements ICommandHandler<DeleteBillOfLandingCommand>
{
  constructor(
    public orderRepository: OrderRepository,
    public orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ TTN_ID }: DeleteBillOfLandingCommand): Promise<any> {
    const isExists = await this.orderQueryRepository.billOfLandingExist(TTN_ID);
    if (!isExists) throw new NotFoundException();

    return await this.orderRepository.deleteBillOfLanding(TTN_ID);
  }
}
