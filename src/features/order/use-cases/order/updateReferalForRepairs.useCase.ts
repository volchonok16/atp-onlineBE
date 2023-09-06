import { ReferralForRepairsDto } from "../../dto/dtos/order/referralForRepairs.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { WithId } from "../../../../common/types/withId.type";
import { NotFoundException } from "@nestjs/common";

export class UpdateReferralForRepairsCommand {
  constructor(public dto: WithId<ReferralForRepairsDto>) {}
}

@CommandHandler(UpdateReferralForRepairsCommand)
export class UpdateReferralForRepairsUseCase
  implements ICommandHandler<UpdateReferralForRepairsCommand, boolean>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ dto }: UpdateReferralForRepairsCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.referalIsExists(dto.id);
    if (!isExists) throw new NotFoundException();

    return this.orderRepository.updateReferalForRepairs(dto);
  }
}
