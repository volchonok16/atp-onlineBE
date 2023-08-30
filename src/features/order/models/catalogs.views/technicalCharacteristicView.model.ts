import { ApiProperty } from '@nestjs/swagger';

export class TechnicalCharacteristicViewModel {
  @ApiProperty()
  RAZN_OD_EXT_KEY: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  GAR_NO: string;
  @ApiProperty()
  INV_NO: string;
  @ApiProperty()
  GOD_VIP: number;
  @ApiProperty()
  COLOR: string;
  @ApiProperty()
  MAX_MASSA: number;
  @ApiProperty()
  GRUZOP: string;
  @ApiProperty()
  VIN: string;
  @ApiProperty()
  KAT: string;
  @ApiProperty()
  KAT_SPEC: string;
  @ApiProperty()
  MESTO_RAZM: string;
  @ApiProperty()
  KATEG_TS: string;
  @ApiProperty()
  TIP_TS: string;
  @ApiProperty()
  MODEL: string;
  @ApiProperty()
  PRIMENENIE: string;
  @ApiProperty()
  TIP_TEHN_ASU_ODS: string;
  @ApiProperty()
  MOD_DV: string;
  @ApiProperty()
  N_DV: string;
  @ApiProperty()
  MOSHN: string;
  @ApiProperty()
  OB_DV: number;
  @ApiProperty()
  N_KUZ: string;
  @ApiProperty()
  N_SHAS: string;
  @ApiProperty()
  PROIZV: string;
  @ApiProperty()
  KOL_POSAD_MEST: number;
  @ApiProperty()
  VMEST_CHEL: number;
  @ApiProperty()
  KAT_VMEST: string;
  @ApiProperty()
  V_BAK: number;
  @ApiProperty()
  PROBEG_DO_AP: number;
  @ApiProperty()
  N_KOR_PERED: string;
  @ApiProperty()
  OSN_VED_MOST: string;
  @ApiProperty()
  KLASSIFIKATOR: string;
  @ApiProperty()
  EKO_STANDART: string;
  @ApiProperty()
  SEZON: string;
  @ApiProperty()
  S_ZIMA: string;
  @ApiProperty()
  S_LETO: string;
}
