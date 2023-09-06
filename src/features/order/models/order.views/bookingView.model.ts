import { ApiProperty } from "@nestjs/swagger";
import { format } from "date-fns";

export class BookingViewModel {
  @ApiProperty({
    description: "ID.",
  })
  RAZNAR2_KEY: number = null;

  // @ApiProperty({
  //   example: "2023-07-10",
  //   description: "Date of work.",
  // })
  // DATE_RAB: Date;

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
    description: "Single application",
  })
  RAZOV: number;

  @ApiProperty({
    description: "Attracted transport ID",
  })
  PRIVL_TRANSPORT: number = null;

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

  @ApiProperty({
    description: "Vehicle submission time",
  })
  VR_V: string = null;

  @ApiProperty({
    description: "Until which the vehicle will be rented",
  })
  VR_Z: string = null;

  @ApiProperty({
    description: "Number of serving hours",
  })
  VR_I: string = null;

  @ApiProperty({
    description: "The amount of hours",
  })
  SUMM_VREM: string = null;

  @ApiProperty({
    description: "Tariff for the customer",
  })
  CENA: string = null;

  @ApiProperty({
    description: "Total amount",
  })
  SUMM: string = null;

  @ApiProperty({
    description: "Contractor's tarif",
  })
  CENA_PODR: string = null;

  @ApiProperty({
    description: "Number of hours for the contractor",
  })
  VREM_I_PODR: string = null;

  @ApiProperty({
    description: "Amount for the customer",
  })
  SUMM_PODR: string = null;

  @ApiProperty({
    description: "Estimated profit",
  })
  PROFIT_PODR: string = null;

  @ApiProperty()
  COMMENTAR: string = null;

  static toView(data) {
    const result = { ...data };
    result.VR_V = format(data.VR_V, "HH:mm");
    result.VR_Z = format(data.VR_Z, "HH:mm");

    return result;
  }
}
