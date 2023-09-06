import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { MotorcadeNameEnum } from "../../types/motorcadeName.enum";
import { Transform, Type } from "class-transformer";
import { OrderDataSortByEnum } from "../../types/orderDataSortBy.enum";
import { currentDateTransform } from "../../../../common/helpers/currentDateTransform.helper";

export class OrderDataQueryDto {
  @ApiProperty({
    example: `${String(currentDateTransform())}`,
    description: "Date in the yyyy-MM-dd format",
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

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  filter: string;

  @ApiPropertyOptional()
  @IsEnum(OrderDataSortByEnum)
  @IsOptional()
  sortBy: OrderDataSortByEnum;
}
