import { ApiProperty } from "@nestjs/swagger";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";

export class CarInfoForPrepareOutputDataView {
  @ApiProperty()
  RAZN_KEY: number = null;
  @ApiProperty({ description: "The name of the machines" })
  MAM: string = null;
  @ApiProperty({ description: "State number" })
  NOMER: string = null;
  @ApiProperty({ description: "Driver ID" })
  FIO_ID: number = null;
  @ApiProperty({ description: "Full fio" })
  FULL_FIO: string = null;

  static toView(data: any): CarInfoForPrepareOutputDataView {
    const result = { ...data };
    return objectFieldFilter<CarInfoForPrepareOutputDataView>(
      result,
      new CarInfoForPrepareOutputDataView()
    );
  }
}
