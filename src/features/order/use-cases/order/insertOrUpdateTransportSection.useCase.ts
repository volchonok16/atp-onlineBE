import { TransportSectionDto } from "../../dto/dtos/order/transportSection.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TransportSectionView2 } from "../../models/order.views/transportSectionView2.model";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class InsertOrUpdateTransportSectionCommand {
  constructor(public dto: TransportSectionDto) {}
}

@CommandHandler(InsertOrUpdateTransportSectionCommand)
export class InsertOrUpdateTransportSectionUseCase
  implements
    ICommandHandler<
      InsertOrUpdateTransportSectionCommand,
      TransportSectionView2
    >
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({
    dto,
  }: InsertOrUpdateTransportSectionCommand): Promise<TransportSectionView2> {
    const isExist = await this.orderQueryRepository.billOfLandingExist(
      dto.TTN_ID
    );
    if (!isExist) throw new NotFoundException();

    return this.orderRepository.insertOrUpdateTransportSection(dto);
  }
}
