import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { constants } from "../../../../common/constants/dataBaseField.constants";

export class UpdateRaznarWeekPlanDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  REMONT = false;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  B_VOD = false;

  @ApiProperty({ example: "2023-07-10" })
  @IsString()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  @MaxLength(constants.dateLength)
  DATS: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  KARTA: string = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @MaxLength(10)
  KARTAI: number = null;

  @ApiPropertyOptional({ example: "11:00" })
  @IsOptional()
  @IsString()
  @MaxLength(13)
  @Matches("^\\d{2}:\\d{2}$")
  VR_V: Date = null;

  @ApiPropertyOptional({ example: "11:00" })
  @IsOptional()
  @IsString()
  @MaxLength(13)
  @Matches("^\\d{2}:\\d{2}$")
  VR_Z: Date = null;

  @IsNumber()
  RAZN_OD_ID: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  ZAPR: string = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  FIO_ID: number = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  FIO2_ID: number = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  FIO_ID_KOND: number = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  NPL: string = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  COMMENTAR: string = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  RAZN_DL_ID: number = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @MaxLength(5)
  DOP_DATE: number = null;

  @ApiPropertyOptional({ example: "2023-07-10" })
  @IsOptional()
  @IsString()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  @MaxLength(10)
  END_DATE: Date = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ORG_ID: number = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  RAZN_OD_ID_PRICEP: number = null;
}
