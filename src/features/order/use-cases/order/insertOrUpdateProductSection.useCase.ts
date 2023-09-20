import { ProductSectionDto } from "../../dto/dtos/order/productSection.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductSectionView } from "../../models/order.views/productSectionView.model";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class InsertOrUpdateProductSectionCommand {
  constructor(public dto: ProductSectionDto) {}
}

@CommandHandler(InsertOrUpdateProductSectionCommand)
export class InsertOrUpdateProductSectionUseCase
  implements
    ICommandHandler<InsertOrUpdateProductSectionCommand, ProductSectionView>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({
    dto,
  }: InsertOrUpdateProductSectionCommand): Promise<ProductSectionView> {
    const isExist = await this.orderQueryRepository.billOfLandingExist(
      dto.TTN_ID
    );
    if (!isExist) throw new NotFoundException();

    return this.orderRepository.inserOrUpdateProductSection(dto);
  }
}
