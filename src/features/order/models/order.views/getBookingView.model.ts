import { ApiProperty } from "@nestjs/swagger";
import { format } from "date-fns";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";
import { CreateBookingViewModel } from "./createBookingView.model";
import { BookingViewModel } from "./bookingViewModel";
import { numberToBoolean } from "../../../../common/helpers/numberToBooleanTransform.helper";

export class GetBookingViewModel extends BookingViewModel {
  @ApiProperty({
    description: "ID.",
  })
  RAZNAR2_KEY: number = null;

  @ApiProperty({ description: "Customer" })
  ZAK1: string = null;

  @ApiProperty({ description: "Vehicle owner" })
  ORG_NAME: string = null;

  @ApiProperty({ description: "Car type" })
  T_T: string = null;

  @ApiProperty({ description: "Car" })
  MAM: string = null;

  @ApiProperty({ description: "Fist driver" })
  FULL_FIO: string = null;

  @ApiProperty({ description: "Second driver" })
  FULL_FIO2: string = null;

  @ApiProperty({ description: "Flight route" })
  FLIGHT: string = null;

  static toView(data, secondDriverFIO?: string) {
    const result = objectFieldFilter({ ...data }, new GetBookingViewModel());
    result.VR_V = format(new Date(data.VR_V), "HH:mm");
    result.VR_Z = format(new Date(data.VR_Z), "HH:mm");
    result.RAZOV = numberToBoolean(data.RAZOV);
    result.PRIVL_TRANSPORT = numberToBoolean(data.PRIVL_TRANSPORT);
    result.FULL_FIO2 = secondDriverFIO ?? null;

    return result;
  }
}
