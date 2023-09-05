import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class CreateOrderDto {
  @ApiProperty({ example: 1547 })
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  RAZN_ID = null;
  @ApiProperty({ example: 8 })
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  ZAK_ID = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  PRIM: string = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  DATA_PODR_ID: number = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  ADR_POGR: string = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  ADR_RAZGR: string = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  TIP_GRUZ: string = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  N_PL: number = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  TIP_ZAYAVKI: number = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  VES: number = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  RAST_KM: number = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  HODOK: number = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(19)
  @IsOptional()
  VR_OT = "2023-08-08 14:30:00";
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(19)
  @IsOptional()
  VR_DO = "2023-08-08 14:30:00";
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  ROUTE_ID: number = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  FLIGHT: string = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  METOD_RASCH: number = null;

  static dto(data: any): CreateOrderDto {
    const createOrderDto = new CreateOrderDto();
    return objectFieldFilter<CreateOrderDto>(data, createOrderDto);
  }
}
