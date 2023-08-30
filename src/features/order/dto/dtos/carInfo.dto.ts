import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Archive } from '../../types/archive.enum';
import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';
import { Transform } from 'class-transformer';

export class CarInfoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  M_AM: string = null;

  @ApiProperty()
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  NAVTO: string = null;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  LM_AM: string = null;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => eval(value))
  ARHIV = false;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(10)
  @IsOptional()
  RAZN_OD_ID: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_PODJOM: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_CH_OSN_DVIG_L: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_CH_OSN_DVIG_Z: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  RCH: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  RCH_Z: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  RPROG_Z: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  RPROG_L: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_L: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_Z: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_GRUZ_L: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_GRUZ_Z: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_L_MG: number = null;

  @ApiPropertyOptional()
  @IsNumber()
  @MaxLength(12)
  @IsOptional()
  NRT_Z_MG: number = null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  TOPL: string = null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  FROM_1C_ID: string = null;

  static dto(data: any): CarInfoDto {
    const organizationDto = new CarInfoDto();
    return objectFieldFilter<CarInfoDto>(data, organizationDto);
  }
}
