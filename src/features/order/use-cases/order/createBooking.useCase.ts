import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBookingDataDto } from "../../dto/dtos/order/createBookingDataDto";
import { CreateBookingViewModel } from "../../models/order.views/createBookingView.model";
import { OrderRepository } from "../../repositories/order.repository";

export class CreateBookingCommand {
  constructor(public dto: CreateBookingDataDto) {}
}

@CommandHandler(CreateBookingCommand)
export class CreateBookingUseCase
  implements ICommandHandler<CreateBookingCommand, CreateBookingViewModel>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    dto,
  }: CreateBookingCommand): Promise<CreateBookingViewModel> {
    return await this.orderRepository.createBooking(dto);
  }
}
