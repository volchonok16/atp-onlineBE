import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { BadRequestException } from "@nestjs/common";
import { ErrorsMessages } from "../../../../common/errors/errorsMessages.enum";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { OrderDataInputDto } from "../../dto/dtos/orderDataInput.dto";
import { OrderDataViewModel } from "../../models/order.views/orderDataView.model";
import { CarForOrderViewModel } from "../../models/order.views/carForOrderView.model";
import { CreateOrderView } from "../../models/order.views/createOrderView.model";

export class CreateOrderDataCommand {
  constructor(public dto: OrderDataInputDto) {}
}

@CommandHandler(CreateOrderDataCommand)
export class CreateOrderDataUseCase
  implements ICommandHandler<CreateOrderDataCommand, CreateOrderView>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ dto }: CreateOrderDataCommand): Promise<CreateOrderView> {
    //check does order data exist for this date
    const orderDataExists = await this.orderRepository.checkDoesOrderDataExist(
      dto.date
    );

    if (orderDataExists)
      throw new BadRequestException(ErrorsMessages.orderDataExists);

    //create order data
    return await this.orderRepository.createOrderData(dto);
  }
}
