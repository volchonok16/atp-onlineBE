import { ApiProperty } from "@nestjs/swagger";

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
    return {
      RAZN_N_R_KEY: data.RAZN_N_R_KEY,
      NOM: data.NOM,
      FIO_ID: data.FIO_ID,
      DATES: data.DATES,
      RAZN_OD_ID: data.RAZN_OD_ID,
      VID_RAB: data.VID_RAB,
      VR_N: data.VR_N,
      VR_K: data.VR_K,
    };
  }
}
