import { ApiProperty } from "@nestjs/swagger";
import { format } from "date-fns";

export class CarForOrderViewModel {
  @ApiProperty()
  RAZN_KEY: string;
  @ApiProperty({ description: "Сar model" })
  MAM: string;
  @ApiProperty({ description: "Government number" })
  NOMER: string;
  @ApiProperty({ description: "Departure time" })
  VR_V: Date;
  @ApiProperty({ description: "Check-in time" })
  VR_Z: Date;
  @ApiProperty({ description: "Driver FIO" })
  FIO: string;
  @ApiProperty({ description: "Tech map" })
  KARTA: string;
  @ApiProperty()
  COMMENTAR: string;
  @ApiProperty({ description: "Customer" })
  ZAKS: string;
  @ApiProperty({ description: "Note" })
  PRIM: string;
  @ApiProperty({ description: "Ticket expiration date" })
  END_DATE: Date;

  static toView(data) {
    const vr_v = data.VR_V ? format(new Date(data.VR_V), "HH:mm") : null;
    const vr_z = data.VR_Z ? format(new Date(data.VR_Z), "HH:mm") : null;
    return {
      RAZN_KEY: data.RAZN_KEY,
      MAM: data.MAM,
      NOMER: data.NOMER,
      VR_V: vr_v,
      VR_Z: vr_z,
      FIO: data.FIO,
      KARTA: data.KARTA,
      COMMENTAR: data.COMMENTAR,
      ZAKS: data.ZAKS,
      PRIM: data.PRIM,
      END_DATE: format(data.END_DATE, "yyyy-MM-dd"),
    };
  }
}
