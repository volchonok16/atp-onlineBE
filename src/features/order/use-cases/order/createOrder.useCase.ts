import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { isNil } from "@nestjs/common/utils/shared.utils";
import { NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "../../dto/dtos/order/createOrder.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { OneOrderDataViewModel } from "../../models/order.views/oneOrderDataView.model";

export class CreateOrderCommand {
  constructor(public dto: CreateOrderDto) {}
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderUseCase implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private orderRepository: OrderRepository,
    private orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ dto }: CreateOrderCommand): Promise<any> {
    const car: OneOrderDataViewModel =
      await this.orderQueryRepository.getOneOrderData(dto.RAZN_ID);
    if (isNil(car)) {
      throw new NotFoundException("Car Not found");
    }

    return await this.orderRepository.createOrder(dto);
  }
}
