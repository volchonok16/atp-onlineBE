import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ReferralForRepairsDto } from "../../dto/dtos/order/referralForRepairs.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { ReferralForRepairsViewModel } from "../../models/order.views/referralforrepairsView.Model";

export class CreateReferralForRepairsCommand {
  constructor(public dto: ReferralForRepairsDto) {}
}

@CommandHandler(CreateReferralForRepairsCommand)
export class CreateReferralForRepairsUseCase
  implements ICommandHandler<CreateReferralForRepairsCommand>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    dto,
  }: CreateReferralForRepairsCommand): Promise<ReferralForRepairsViewModel> {
    return await this.orderRepository.createReferralForRepairs(dto);
  }
}
