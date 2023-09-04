import { ApiProperty } from "@nestjs/swagger";
import { numberToBoolean } from "../../../../common/helpers/numberToBooleanTransform.helper";

export class StaffAdditionalInfoViewModel {
  @ApiProperty()
  FIO_DOCS_KEY: number;
  @ApiProperty()
  FIO_ID: number;
  @ApiProperty()
  NAIM: string;
  @ApiProperty()
  NOMER: string;
  @ApiProperty()
  KEM_VID: string;
  @ApiProperty()
  DATE_OT: Date;
  @ApiProperty()
  DATE_DO: Date;
  @ApiProperty()
  ARHIV: boolean;
  @ApiProperty()
  D_PREDUPR: number;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  SETUP_ID: number;

  static toView(data) {
    if (!data) return null;
    const result = { ...data };
    result.ARHIV = numberToBoolean(data.ARHIV);

    return result;
  }
}
