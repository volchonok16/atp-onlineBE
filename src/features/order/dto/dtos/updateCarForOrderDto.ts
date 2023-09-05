import {
  IsDate,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsValidDate } from "../../../../common/decorators/isValidDate.decorator";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";
import { format, parseISO } from "date-fns";
import { Type } from "class-transformer";
import { IsValidTime } from "../../../../common/decorators/isValidTime.decorator";
import { currentDateTransform } from "../../../../common/helpers/currentDateTransform.helper";

export class UpdateCarForOrderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsValidTime()
  @IsOptional()
  VR_V: string = null;

  @ApiPropertyOptional()
  @IsValidTime()
  @MaxLength(8)
  @IsOptional()
  VR_Z: string = null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  COMMENTAR: string = null;

  @ApiProperty({
    example: `${currentDateTransform()}`,
    description: "Date in the yyyy-MM-dd format",
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  END_DATE: Date = null;

  static dto(data: any): UpdateCarForOrderDto {
    const updateCarForOrderDto = new UpdateCarForOrderDto();
    const result = objectFieldFilter<UpdateCarForOrderDto>(
      data,
      updateCarForOrderDto
    );

    return result;
  }
}
