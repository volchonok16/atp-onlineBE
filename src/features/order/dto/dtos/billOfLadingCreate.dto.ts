import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class BillOfLadingCreateDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  OTPRAVIT_ID: number | null = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  POLUCHAT_ID: number | null = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  PLAT_ID: number | null = 1;

  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  RAZN_ZAK_ID = 1750;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  N_TTN: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  DATE_SOST: Date | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  DATE_DOST: Date | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  P_POGR: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  P_RAZGR: string | null;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  OPASN_GRUZ: Blob | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  DOP_INFO: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  OTPRAVIT_DATA_FIO_ID: number | null = null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999)
  @IsOptional()
  POLUCHAT_DATA_FIO_ID: number | null = null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  CODE: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  NOM_PRICE: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  ARTICUL: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(999999)
  @IsOptional()
  KOL: number | null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(999999)
  @IsOptional()
  CENA: number | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  NAIM: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  ED_IZM: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  UPAKOVKA: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  MEST: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(999999)
  @IsOptional()
  MASSA: number | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  NAIM_TTN_TRANSP: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  DOCS: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(999999999)
  @IsOptional()
  VID_UPAK: number | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  MEST_TTN_TRANSP: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  SPOSOB: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  CODE_TTN_TRANS: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  N_KONT: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  KLASS: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(999999)
  @IsOptional()
  MASSA_TTN_TRANS: number | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  DOCS_LIST: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P5_UKAZ: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P6_FAKT_SOST_GRUZA_PRIEM: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P6_FAKT_SOST_GRUZA_SDACHA: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P8_USL_PEREV: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P8_0: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P8_1: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P8_2: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P8_3: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  P_13: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  P_16: string | null;
}
