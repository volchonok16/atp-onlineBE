import { ApiProperty } from "@nestjs/swagger";
import { format } from "date-fns";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";
import { numberToBoolean } from "../../../../common/helpers/numberToBooleanTransform.helper";

export class BookingViewModel {
  @ApiProperty({
    description: "ID.",
  })
  RAZNAR2_KEY: number = null;

  @ApiProperty({
    description: "Single application",
  })
  RAZOV: boolean;

  @ApiProperty({
    description: "Attracted transport",
  })
  PRIVL_TRANSPORT = false;

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
}
