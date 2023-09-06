import { ApiProperty } from "@nestjs/swagger";

export class CarNameForPrepareOutputDataView {
  @ApiProperty({ description: "Car ID" })
  RAZN_OD_KEY: number;
  @ApiProperty({ description: "The name of the machines" })
  MAM: string;
  @ApiProperty({ description: "State number" })
  NOMER: string;

  static toView(data: any): CarNameForPrepareOutputDataView {
    return {
      RAZN_OD_KEY: data.RAZN_OD_KEY,
      MAM: data.MAM,
      NOMER: data.NOMER,
    };
  }
}
