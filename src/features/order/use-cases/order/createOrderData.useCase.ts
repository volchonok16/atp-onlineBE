import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { BadRequestException } from "@nestjs/common";
import { ErrorsMessages } from "../../../../common/errors/errorsMessages.enum";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";
import { OrderDataInputDto } from "../../dto/dtos/orderDataInput.dto";
import { OrderDataViewModel } from "../../models/order.views/orderDataView.model";

export class CreateOrderDataCommand {
  constructor(
    public inputDto: OrderDataInputDto,
    public motorcadeName: number
  ) {}
}

@CommandHandler(CreateOrderDataCommand)
export class CreateOrderDataUseCase
  implements ICommandHandler<CreateOrderDataCommand, OrderDataViewModel[]>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({
    inputDto,
    motorcadeName,
  }: CreateOrderDataCommand): Promise<OrderDataViewModel[]> {
    //check does order data exist for this date
    const orderDataExists = await this.orderRepository.checkDoesOrderDataExist(
      inputDto.date
    );

    if (orderDataExists)
      throw new BadRequestException(ErrorsMessages.orderDataExists);

    //create order data
    await this.orderRepository.createOrderData(inputDto.date, motorcadeName);

    return this.orderQueryRepository.getOrderData({ ...inputDto, tab: 1 });
  }
}
