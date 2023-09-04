import { ApiProperty } from "@nestjs/swagger";
import { shortStringToBoolean } from "../../../../common/helpers/shortStringToBooleanTransform.helper";

export class OrganizationSubunitViewModel {
  @ApiProperty()
  DATA_PODR_KEY: number;

  @ApiProperty()
  DATA_ID: number;

  @ApiProperty()
  PODR: string;

  @ApiProperty()
  NORMA: number;

  @ApiProperty()
  NORMA_VIH: number;

  @ApiProperty()
  ARHIV: boolean;

  @ApiProperty()
  KEY_ID: number;

  @ApiProperty()
  SETUP_ID: number;

  @ApiProperty()
  CODE: string;

  static toView(data) {
    const result = { ...data };
    result.ARHIV = shortStringToBoolean(data.ARHIV);

    return result;
  }
}
