import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";

export class UpdateRequestDto {
  @ApiProperty()
  RES: number = null;
  @ApiPropertyOptional()
  PRIM_DISP: string = null;

  static dto(data: any): UpdateRequestDto {
    const updateRequestDto = new UpdateRequestDto();
    return objectFieldFilter<UpdateRequestDto>(data, updateRequestDto);
  }
}
