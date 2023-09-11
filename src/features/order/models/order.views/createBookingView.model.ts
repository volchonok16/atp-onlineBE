import { ApiProperty } from "@nestjs/swagger";
import { format } from "date-fns";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";
import { BookingViewModel } from "./bookingViewModel";
import { numberToBoolean } from "../../../../common/helpers/numberToBooleanTransform.helper";

export class CreateBookingViewModel extends BookingViewModel {
  @ApiProperty({
    description: "Customer ID",
  })
  DATA_ID: number = null;

  @ApiProperty({
    description: "Vehicle owner organization ID",
  })
  ORG_ID: number = null;

  @ApiProperty({
    description: "Driver FIO ID",
  })
  FIO_ID: number = null;

  @ApiProperty({
    description: "Second driver FIO ID",
  })
  FIO2_ID: number = null;

  @ApiProperty({
    description: "Route/flight ID",
  })
  ROUTE_ID: number = null;

  @ApiProperty({
    description: "Сar types ID",
  })
  RAZN_T_T_ID: number = null;

  @ApiProperty({
    description: "Сar ID",
  })
  RAZN_OD_ID: number = null;

  static toView(data) {
    const result = objectFieldFilter({ ...data }, new CreateBookingViewModel());
    result.VR_V = format(new Date(data.VR_V), "HH:mm");
    result.VR_Z = format(new Date(data.VR_Z), "HH:mm");
    result.RAZOV = numberToBoolean(data.RAZOV);
    result.PRIVL_TRANSPORT = numberToBoolean(data.PRIVL_TRANSPORT);

    return result;
  }
}
