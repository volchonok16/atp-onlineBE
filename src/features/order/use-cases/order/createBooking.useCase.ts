import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookingDataDto } from '../../dto/dtos/order/createBookingDataDto';
import { BookingViewModel } from '../../models/order.views/bookingView.model';
import { OrderRepository } from '../../repositories/order.repository';

export class CreateBookingCommand {
  constructor(public dto: CreateBookingDataDto) {}
}

@CommandHandler(CreateBookingCommand)
export class CreateBookingUseCase
  implements ICommandHandler<CreateBookingCommand, BookingViewModel>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ dto }: CreateBookingCommand): Promise<BookingViewModel> {
    return await this.orderRepository.createBooking(dto);
  }
}
