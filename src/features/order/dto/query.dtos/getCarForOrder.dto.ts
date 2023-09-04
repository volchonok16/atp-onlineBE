import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { MotorcadeNameEnum } from "../../types/motorcadeName.enum";
import { sortingMotorcadeName } from "./orderData.query.dto";

export class GetCarForOrderDto {
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
}
