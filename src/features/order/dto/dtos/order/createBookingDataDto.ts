import { BookingDataDto } from "./bookingData.dto";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class CreateBookingDataDto extends BookingDataDto {
  static dto(data: any): CreateBookingDataDto {
    const createBookingDataDto = new CreateBookingDataDto();
    return objectFieldFilter(data, createBookingDataDto);
  }
}
