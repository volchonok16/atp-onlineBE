import { ApiProperty } from '@nestjs/swagger';

export class DocumentationByIdViewModel {
  @ApiProperty()
  RAZN_OD_EXT_KEY: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  N_AKT: string;
  @ApiProperty()
  N_AKT_DATE: Date;
  @ApiProperty()
  PRIKAZ_N: string;
  @ApiProperty()
  PRIKAZ_N_DATE: Date;
  @ApiProperty()
  DISL: string;
  @ApiProperty()
  OTV_ITR: string;
  @ApiProperty()
  PRIKAZ_BAL: number;
  @ApiProperty()
  PRIKAZ_BAL_DATE: Date;
  @ApiProperty()
  BAL_STOIM: number;
  @ApiProperty()
  NORMA_PROB: number;
  @ApiProperty()
  AMORTIZ: number;
  @ApiProperty()
  DATE_VIBIT: Date;
  @ApiProperty()
  SVID_REG: string;
  @ApiProperty()
  DATA_REG: Date;
  @ApiProperty()
  PASP: string;
  @ApiProperty()
  DATA_VID: Date;
  @ApiProperty()
  KEM_VID: string;
  @ApiProperty()
  GTO: string;
  @ApiProperty()
  GTO_DO: Date;
  @ApiProperty()
  STRAH_SVID: string;
  @ApiProperty()
  STRAH_SVID_DATE_OT: Date;
  @ApiProperty()
  STRAH_SVID_DATE: Date;
  @ApiProperty()
  REG_N_GPM: string;
  @ApiProperty()
  DATE_P_TAHOGRAFA: Date;
}
