import { CreateBookingUseCase } from "./createBooking.useCase";
import { DeleteBookingUseCase } from "./deleteBookingData.useCase";
import { DeleteOrderUseCase } from "./deleteOrder.useCase";
import { UpdateBookingUseCase } from "./updateBooking.useCase";
import { UpdateOrderUseCase } from "./updateOrder.useCase";
import { CreateReferralForRepairsUseCase } from "./referralForRepairs.useCase";
import { UpdateReferralForRepairsUseCase } from "./updateReferalForRepairs.useCase";
import { DeleteReferralForRepairsUseCase } from "./deleteReferralForRepairs.useCase";
import { GetBookingQueryHandler } from "./query-bus/getBooking.query-handler";
import { CreatePrepareOutputDataUseCase } from "./createPrepareOutputData.useCase";
import { UpdatePrepareOutputDataUseCase } from "./updatePrepareOutputData.useCase";
import { GetProductSectionDataQueryHandler } from "./query-bus/getProductSectionData.query-handler";
import { InsertOrUpdateProductSectionUseCase } from "./insertOrUpdateProductSection.useCase";
import { DeleteProductSectionUseCase } from "./DeleteProductSection.useCase";
import { GetTransportSectionQueryHandler } from "./query-bus/getTransportSectionData.query-handler";
import {
  InsertOrUpdateTransportSectionCommand,
  InsertOrUpdateTransportSectionUseCase,
} from "./insertOrUpdateTransportSection.useCase";

const queryHandlers = [
  GetBookingQueryHandler,
  GetProductSectionDataQueryHandler,
  GetTransportSectionQueryHandler,
];

const commandHandlers = [
  CreateBookingUseCase,
  DeleteBookingUseCase,
  DeleteOrderUseCase,
  UpdateBookingUseCase,
  UpdateOrderUseCase,
  CreateReferralForRepairsUseCase,
  UpdateReferralForRepairsUseCase,
  DeleteReferralForRepairsUseCase,
  CreatePrepareOutputDataUseCase,
  UpdatePrepareOutputDataUseCase,
  InsertOrUpdateProductSectionUseCase,
  DeleteProductSectionUseCase,
  InsertOrUpdateTransportSectionUseCase,
];

export const orderUseCases = [...commandHandlers, ...queryHandlers];
