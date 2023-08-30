import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  RAZN_ID = 1747;
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  ZAK_ID = 8;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  PRIM: string | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  DATA_PODR_ID: number | null = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  ADR_POGR: string | null = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  ADR_RAZGR: string | null = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  TIP_GRUZ: string | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  N_PL: number | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  TIP_ZAYAVKI: number | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  VES: number | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  RAST_KM: number | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  HODOK: number | null = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(19)
  @IsOptional()
  VR_OT: string | null = '2023-08-08 14:30:00';
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(19)
  @IsOptional()
  VR_DO: string | null = '2023-08-08 14:30:00';
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  ROUTE_ID: number | null = null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  FLIGHT: string | null = null;
  @ApiPropertyOptional()
  @IsNumber()
  @Max(32767)
  @IsOptional()
  METOD_RASCH: number | null = null;
}
