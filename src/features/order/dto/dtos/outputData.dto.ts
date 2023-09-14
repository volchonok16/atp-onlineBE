import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";
import { constants } from "../../../../common/constants/dataBaseField.constants";

export class OutputDataDto {
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  RAZN_KEY: number = null;

  @ApiProperty({ description: "TTN number" })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  N_TTN: number = null;

  @ApiProperty({ description: "Fuel filling rate" })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  NORM_ZAPR: number = null;

  @ApiPropertyOptional({ description: "Your waybill number" })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  NPL: string = null;

  @ApiProperty({ description: "FIO ID" })
  @IsNumber()
  @MaxLength(constants.idLength)
  @IsOptional()
  FIO_ID: number = null;
}
