import { PrepareOutputDataDto } from "../../dto/dtos/order/prepareOutputData.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PreparedOutputDataView extends PrepareOutputDataDto {
  @ApiProperty()
  RAZN_KEY: number = null;
}
