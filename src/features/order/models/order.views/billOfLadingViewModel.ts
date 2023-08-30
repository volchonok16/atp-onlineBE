import { ApiProperty } from '@nestjs/swagger';

export class BillOfLadingViewModel {
  @ApiProperty()
  TTN_ID: number;

  @ApiProperty()
  OTPRAVIT_ID: number | null;

  @ApiProperty()
  POLUCHAT_ID: number | null;

  @ApiProperty()
  PLAT_ID: number | null;

  @ApiProperty()
  RAZN_ZAK_ID: number;

  @ApiProperty()
  N_TTN: string;

  @ApiProperty()
  DATE_SOST: string | null;

  @ApiProperty()
  DATE_DOST: string | null;

  @ApiProperty()
  P_POGR: string | null;

  @ApiProperty()
  P_RAZGR: string | null;

  @ApiProperty()
  OPASN_GRUZ: Blob | null;

  @ApiProperty()
  DOP_INFO: string | null;

  @ApiProperty()
  OTPRAVIT_DATA_FIO_ID: number | null = 1;

  @ApiProperty()
  POLUCHAT_DATA_FIO_ID: number | null = 1;

  @ApiProperty()
  CODE: string | null;

  @ApiProperty()
  NOM_PRICE: string | null;

  @ApiProperty()
  ARTICUL: string | null;

  @ApiProperty()
  KOL: number | null;

  @ApiProperty()
  CENA: number | null;

  @ApiProperty()
  NAIM: string | null;

  @ApiProperty()
  ED_IZM: string | null;

  @ApiProperty()
  UPAKOVKA: string | null;

  @ApiProperty()
  MEST: string | null;

  @ApiProperty()
  MASSA: number | null;

  @ApiProperty()
  NAIM_TTN_TRANSP: string | null;

  @ApiProperty()
  DOCS: string | null;

  @ApiProperty()
  VID_UPAK: number | null;

  @ApiProperty()
  MEST_TTN_TRANSP: string | null;

  @ApiProperty()
  SPOSOB: string | null;

  @ApiProperty()
  CODE_TTN_TRANS: string | null;

  @ApiProperty()
  N_KONT: string | null;

  @ApiProperty()
  KLASS: string | null;

  @ApiProperty()
  MASSA_TTN_TRANS: number | null;

  @ApiProperty()
  DOCS_LIST: string | null;

  @ApiProperty()
  P5_UKAZ: string | null;

  @ApiProperty()
  P6_FAKT_SOST_GRUZA_PRIEM: string | null;

  @ApiProperty()
  P6_FAKT_SOST_GRUZA_SDACHA: string | null;

  @ApiProperty()
  P8_USL_PEREV: string | null;

  @ApiProperty()
  P8_0: string | null;

  @ApiProperty()
  P8_1: string | null;

  @ApiProperty()
  P8_2: string | null;

  @ApiProperty()
  P8_3: string | null;

  @ApiProperty()
  P_13: string | null;

  @ApiProperty()
  P_16: string | null;

  constructor(dto) {
    this.TTN_ID = dto.TTN_KEY;
    this.OTPRAVIT_ID = dto.OTPRAVIT_ID;
    this.POLUCHAT_ID = dto.POLUCHAT_ID;
    this.PLAT_ID = dto.PLAT_ID;
    this.RAZN_ZAK_ID = dto.RAZN_ZAK_ID;
    this.N_TTN = dto.N_TTN;
    this.DATE_SOST = dto.DATE_SOST;
    this.DATE_DOST = dto.DATE_DOST;
    this.P_POGR = dto.P_POGR;
    this.P_RAZGR = dto.P_RAZGR;
    this.OPASN_GRUZ = dto.OPASN_GRUZ;
    this.DOP_INFO = dto.DOP_INFO;
    this.OTPRAVIT_DATA_FIO_ID = dto.OTPRAVIT_DATA_FIO_ID;
    this.POLUCHAT_DATA_FIO_ID = dto.POLUCHAT_DATA_FIO_ID;
    this.CODE = dto.CODE;
    this.NOM_PRICE = dto.NOM_PRICE;
    this.ARTICUL = dto.ARTICUL;
    this.KOL = dto.KOL;
    this.CENA = dto.CENA;
    this.NAIM = dto.NAIM;
    this.ED_IZM = dto.ED_IZM;
    this.UPAKOVKA = dto.UPAKOVKA;
    this.MEST = dto.MEST;
    this.MASSA = dto.MASSA;
    this.NAIM_TTN_TRANSP = dto.NAIM_TTN_TRANSP;
    this.DOCS = dto.DOCS;
    this.VID_UPAK = dto.VID_UPAK;
    this.MEST_TTN_TRANSP = dto.MEST_TTN_TRANSP;
    this.SPOSOB = dto.SPOSOB;
    this.CODE_TTN_TRANS = dto.CODE_TTN_TRANS;
    this.N_KONT = dto.N_KONT;
    this.KLASS = dto.KLASS;
    this.MASSA_TTN_TRANS = dto.MASSA_TTN_TRANS;
    this.DOCS_LIST = dto.DOCS_LIST;
    this.P5_UKAZ = dto.P5_UKAZ;
    this.P6_FAKT_SOST_GRUZA_PRIEM = dto.P6_FAKT_SOST_GRUZA_PRIEM;
    this.P6_FAKT_SOST_GRUZA_SDACHA = dto.P6_FAKT_SOST_GRUZA_SDACHA;
    this.P8_USL_PEREV = dto.P8_USL_PEREV;
    this.P8_0 = dto.P8_0;
    this.P8_1 = dto.P8_1;
    this.P8_2 = dto.P8_2;
    this.P8_3 = dto.P8_3;
    this.P_13 = dto.P_13;
    this.P_16 = dto.P_16;
  }
}
