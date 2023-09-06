import { ApiProperty } from "@nestjs/swagger";
import { format } from "date-fns";

export class ReferralForRepairsViewModel {
  @ApiProperty()
  RAZN_N_R_KEY: number = null;
  @ApiProperty()
  NOM: number = null;
  @ApiProperty()
  FIO_ID: number = null;
  @ApiProperty()
  DATES: Date = null;
  @ApiProperty()
  RAZN_OD_ID: number = null;
  @ApiProperty()
  VID_RAB: string = null;
  @ApiProperty({ format: "time" })
  VR_N: string = null;
  @ApiProperty({ format: "time" })
  VR_K: string = null;

  static toView(data) {
    const result = { ...data };
    result.VR_N = format(data.VR_N, "HH:mm");
    result.VR_K = format(data.VR_K, "HH:mm");
    return result;
  }
}
