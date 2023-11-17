import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateFlightsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  FIO_id: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  TIP: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  GRAFIK: number;
  @ApiProperty()
  @IsString()
  @MaxLength(15)
  @IsOptional()
  MK: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  NAK: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  TIP_PL: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  NORM_ZAPR: number;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  MAM: string;
  @ApiProperty()
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  NOMER: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  REQ_NAME: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  RAZN_OD_ID_PRICEP: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  RARE_USE: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ENABLE_FIND_FINE: number;
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  VID_PEREV: string;
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  VID_SOOB: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  FROM_1C_ID: string;
  @IsOptional()
  @IsBoolean()
  DEL: boolean;
  @IsOptional()
  @IsString()
  FINES_PROBLEM: string;

  static dto(data: any): UpdateFlightsDto {
    const updateFlightsDto = new UpdateFlightsDto();
    return objectFieldFilter<UpdateFlightsDto>(data, updateFlightsDto);
  }
}
