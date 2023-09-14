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
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";

export class OutputDataDto {
  @ApiProperty({ example: 1752 })
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  RAZN_KEY: number = null;

  // Раздел технологических карт не используется
  // @ApiProperty({ description: "TTN number" })
  // @IsString()
  // @MaxLength(20)
  // @IsNotEmpty()
  // N_TTN: number = null;

  @ApiProperty({ description: "Fuel filling rate", example: 15 })
  @IsNumber()
  @MaxLength(20)
  @IsNotEmpty()
  NORM_ZAPR: number = null;

  @ApiPropertyOptional({
    description: "Your waybill number",
    example: "Any string",
  })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  NPL: string = null;

  @ApiProperty({ description: "FIO ID", example: 1 })
  @IsNumber()
  @MaxLength(constants.idLength)
  @IsOptional()
  FIO_ID: number = null;

  static dto(data: any): OutputDataDto {
    const result = { ...data };
    return objectFieldFilter(result, new OutputDataDto());
  }
}
