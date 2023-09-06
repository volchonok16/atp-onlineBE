import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { currentDateTransform } from "../../../../common/helpers/currentDateTransform.helper";

export class OrderDataInputDto {
  @ApiProperty({
    example: `${currentDateTransform()}`,
    description: "Date in the yyyy-MM-dd",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ description: "Radio-button value", example: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  motorcadeName: number;
}
