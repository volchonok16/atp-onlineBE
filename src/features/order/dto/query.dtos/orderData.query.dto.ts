import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { MotorcadeNameEnum } from "../../types/motorcadeName.enum";
import { Transform, Type } from "class-transformer";
import { OrderDataSortByEnum } from "../../types/orderDataSortBy.enum";

export class OrderDataQueryDto {
  @ApiProperty({
    example: "2023-07-10",
    description: "Date in the yyyy-MM-dd format or yyyy.MM.dd format",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ enum: MotorcadeNameEnum })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => sortingMotorcadeName(value))
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

export function sortingMotorcadeName(value) {
  if (value === MotorcadeNameEnum.all) return 0;
  if (value === MotorcadeNameEnum.first) return 1;
  if (value === MotorcadeNameEnum.upp) return 2;
  return value;
}
