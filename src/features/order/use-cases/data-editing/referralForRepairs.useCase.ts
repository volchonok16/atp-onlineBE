import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ReferralForRepairsCreateDto } from "../../dto/dtos/referralForRepairsCreate.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { ReferralForRepairsViewModel } from "../../models/order.views/referralforrepairsView.Model";

export class CreateReferralForRepairsCommand {
  constructor(public dto: ReferralForRepairsCreateDto) {}
}

@CommandHandler(CreateReferralForRepairsCommand)
export class CreateReferralForRepairsUseCase
  implements ICommandHandler<CreateReferralForRepairsCommand>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({
    dto,
  }: CreateReferralForRepairsCommand): Promise<ReferralForRepairsViewModel> {
    return await this.orderRepository.createReferralForRepairs(dto);
  }
}
