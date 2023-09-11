import { CreateBookingUseCase } from "./createBooking.useCase";
import { DeleteBookingUseCase } from "./deleteBookingData.useCase";
import { DeleteOrderUseCase } from "./deleteOrder.useCase";
import { UpdateBookingUseCase } from "./updateBooking.useCase";
import { UpdateOrderUseCase } from "./updateOrder.useCase";
import { CreateReferralForRepairsUseCase } from "./referralForRepairs.useCase";
import { UpdateReferralForRepairsUseCase } from "./updateReferalForRepairs.useCase";
import { DeleteReferralForRepairsUseCase } from "./deleteReferralForRepairs.useCase";
import { GetBookingQueryHandler } from "./query-bus/getBooking.query-handler";

const queryHandlers = [GetBookingQueryHandler];

export const orderUseCases = [
  CreateBookingUseCase,
  DeleteBookingUseCase,
  DeleteOrderUseCase,
  UpdateBookingUseCase,
  UpdateOrderUseCase,
  CreateReferralForRepairsUseCase,
  UpdateReferralForRepairsUseCase,
  DeleteReferralForRepairsUseCase,
  ...queryHandlers,
];
