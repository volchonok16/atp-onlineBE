import { ApiProperty } from "@nestjs/swagger";
import { shortStringToBoolean } from "../../../../common/helpers/shortStringToBooleanTransform.helper";

export class SubunitViewModel {
  @ApiProperty()
  DATA_PODR_KEY: number = null;
  @ApiProperty()
  PODR: string = null;
  @ApiProperty()
  NORMA: number = null;
  @ApiProperty()
  NORMA_VIH: number = null;
  @ApiProperty()
  ARHIV = false;
  @ApiProperty()
  KEY_ID: number = null;
  @ApiProperty()
  SETUP_ID: number = null;
  @ApiProperty()
  CODE: string = null;

  static toView(data) {
    const result = { ...data };
    result.ARHIV = shortStringToBoolean(data.ARHIV);

    return result;
  }
}
