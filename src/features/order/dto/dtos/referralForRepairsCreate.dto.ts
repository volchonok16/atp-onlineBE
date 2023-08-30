import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class ReferralForRepairsCreateDto {
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  NOM: number;
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  FIO_ID = 1;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  DATES = '23.07.2023';
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  RAZN_OD_ID: number | null = 1;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  VID_RAB: string | null;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(13)
  @IsOptional()
  VR_N: string | null = '23:59:59.9999';
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(13)
  @IsOptional()
  VR_K: string | null = '23:59:59.9999';
}
