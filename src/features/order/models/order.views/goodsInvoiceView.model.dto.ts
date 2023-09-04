import { ApiProperty } from "@nestjs/swagger";

export class GoodsInvoiceViewModel {
  @ApiProperty()
  DATS: Date;
  @ApiProperty()
  N_ZAK: string;
  @ApiProperty()
  OTPRAVIT: string;
  @ApiProperty()
  POLUCHAT: string;
  @ApiProperty()
  OTPRAVIT_ADR: string;
  @ApiProperty()
  POLUCHAT_ADR: string;
  @ApiProperty()
  NAIM: string;
  @ApiProperty()
  MEST: string;
  @ApiProperty()
  MASSA: string;
  @ApiProperty()
  OPASN_GRUZ: string;
  @ApiProperty()
  DOCS: string;
  @ApiProperty()
  P5_UKAZ: string;
  @ApiProperty()
  P_POGR: string;
  @ApiProperty()
  P_RAZGR: string;
  @ApiProperty()
  DATA_POGR: string;
  @ApiProperty()
  VREM_POGR_DO: string;
  @ApiProperty()
  DATA_VIGR: string;
  @ApiProperty()
  VREM_VIGR_DO: string;
  @ApiProperty()
  P6_FAKT_SOST_GRUZA_PRIEM: string;
  @ApiProperty()
  P6_FAKT_SOST_GRUZA_SDACHA: string;
  @ApiProperty()
  MEST_TTN_EXT: string;
  @ApiProperty()
  FIO: string;
  @ApiProperty()
  P8_USL_PEREV: string;
  @ApiProperty()
  MASSA_TTN_EXT: number | null;
  @ApiProperty()
  P8_2: string;
  @ApiProperty()
  USER_FIO: string;
  @ApiProperty()
  P8_3: string;
  @ApiProperty()
  D_ZAK: string;
  @ApiProperty()
  ORG_NAME: string;
  @ApiProperty()
  MAM: string;
  @ApiProperty()
  NOMER: string;
  @ApiProperty()
  P_13: string | null;
  @ApiProperty()
  CENA: number | null;
  @ApiProperty()
  P_16: string | null;
  constructor(TTN, TTN_TRANSP, TTN_EXT) {
    this.DATS = TTN.DATS;
    this.N_ZAK = TTN.N_ZAK;
    this.OTPRAVIT = TTN.OTPRAVIT;
    this.POLUCHAT = TTN.POLUCHAT;
    this.OTPRAVIT_ADR = TTN.OTPRAVIT_ADR;
    this.POLUCHAT_ADR = TTN.POLUCHAT_ADR;
    this.NAIM = TTN_TRANSP.NAIM;
    this.MEST = TTN_TRANSP.MEST;
    this.MASSA = TTN_TRANSP.MASSA;
    this.OPASN_GRUZ = TTN.OPASN_GRUZ;
    this.DOCS = TTN_TRANSP.DOCS;
    this.P5_UKAZ = TTN_TRANSP.P5_UKAZ;
    this.P_POGR = TTN.P_POGR;
    this.P_RAZGR = TTN.P_RAZGR;
    this.DATA_POGR = TTN.DATA_POGR;
    this.VREM_POGR_DO = TTN.VREM_POGR_DO;
    this.DATA_VIGR = TTN.DATA_VIGR;
    this.VREM_VIGR_DO = TTN.VREM_VIGR_DO;
    this.P6_FAKT_SOST_GRUZA_PRIEM = TTN_TRANSP.P6_FAKT_SOST_GRUZA_PRIEM;
    this.P6_FAKT_SOST_GRUZA_SDACHA = TTN_TRANSP.P6_FAKT_SOST_GRUZA_SDACHA;
    this.MEST_TTN_EXT = TTN_EXT.MEST;
    this.FIO = TTN.FIO;
    this.P8_USL_PEREV = TTN_TRANSP.P8_USL_PEREV;
    this.MASSA_TTN_EXT = TTN_EXT.MASSA * 1000;
    this.P8_2 = TTN_TRANSP.P8_2;
    this.P8_3 = TTN_TRANSP.P8_3;
    this.D_ZAK = TTN.D_ZAK;
    this.USER_FIO = TTN.USER_FIO;
    this.ORG_NAME = TTN.ORG_NAME;
    this.MAM = TTN.MAM;
    this.NOMER = TTN.NOMER;
    this.P_13 = TTN_TRANSP.P_13;
    this.CENA = TTN_EXT.CENA * TTN_EXT.KOL;
    this.P_16 = TTN_TRANSP.P_16;
  }
}
