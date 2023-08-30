import { CreateBookingUseCase } from './createBooking.useCase';
import { DeleteBookingUseCase } from './deleteBookingData.useCase';
import { DeleteOrderUseCase } from './deleteOrder.useCase';
import { UpdateBookingUseCase } from './updateBooking.useCase';
import { UpdateOrderUseCase } from './updateOrder.useCase';

export const orderUseCases = [
  CreateBookingUseCase,
  DeleteBookingUseCase,
  DeleteOrderUseCase,
  UpdateBookingUseCase,
  UpdateOrderUseCase,
];
