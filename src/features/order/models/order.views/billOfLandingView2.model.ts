import { ApiProperty } from "@nestjs/swagger";
import { CommoditySectionViewModel } from "./commoditySectionView.model";
import { TransportSectionViewModel } from "./transportSectionView.model";

export class CreateBillOfLandingReportViewModel {
  @ApiProperty()
  N_TTN: string;
  @ApiProperty()
  DATE_SOST: string;
  @ApiProperty()
  OTPRAVIT: number | null;
  @ApiProperty()
  OTPRAVIT_ADR: number | null;
  @ApiProperty()
  OTP_CONTACT: string | null;
  @ApiProperty()
  POLUCHAT: number | null;
  @ApiProperty()
  POLUCHAT_ADR: number | null;
  @ApiProperty()
  POL_CONTACT: number | null;
  @ApiProperty()
  PLAT: number | null;
  @ApiProperty()
  PLAT_ADR: number | null;
  @ApiProperty()
  PLAT_REKVIZIT: number | null;
  @ApiProperty()
  SUM: number | null;
  @ApiProperty()
  ITOG: number | null;
  @ApiProperty()
  VSEGO: number | null;
  @ApiProperty()
  SUMMA: number | null;
  @ApiProperty()
  PAGE: number | null;
  @ApiProperty()
  KOLPAGE: number | null;
  @ApiProperty()
  KOLMEST: number | null;
  @ApiProperty()
  MASSAGRUZANET: number | null;
  @ApiProperty()
  MASSAGRUZABRUT: number | null;
  @ApiProperty()
  KOLMANAIM: number | null;
  @ApiProperty()
  SUMMANAIM: number | null;
  @ApiProperty()
  PAGENOM: number | null;
  @ApiProperty()
  ORG_NAME: string | null;
  @ApiProperty()
  ADRESS: string | null;
  @ApiProperty()
  MAM: string | null;
  @ApiProperty()
  NOMER: number | null;
  @ApiProperty()
  NPL: string | null;
  @ApiProperty()
  FULL_FIO: string | null;
  @ApiProperty()
  UDOST: number | null;
  @ApiProperty()
  P_POGR: string | null;
  @ApiProperty()
  P_RAZGR: string | null;
  @ApiProperty()
  PRICEP_MAM: string | null;
  @ApiProperty()
  PRICEP_NOMER: string | null;

  @ApiProperty()
  K_PEREVOZ: number | null;
  @ApiProperty()
  ITOGMASSBRUT: number | null;
  @ApiProperty()
  commoditySection: CommoditySectionViewModel[] | null;
  @ApiProperty()
  transportSection: TransportSectionViewModel[] | null;

  constructor(TTN_SEL, TTN_TRANSP, TTN_EXT, FULL_FIO, PRICEP_MAM) {
    this.N_TTN = TTN_SEL.N_TTN;
    this.DATE_SOST = TTN_SEL.DATE_SOST;
    this.OTPRAVIT = TTN_SEL.OTPRAVIT;
    this.OTPRAVIT_ADR = TTN_SEL.OTPRAVIT_ADR;
    this.OTP_CONTACT = TTN_SEL.OTP_CONTACT;
    this.POLUCHAT = TTN_SEL.POLUCHAT;
    this.POLUCHAT_ADR = TTN_SEL.POLUCHAT_ADR;
    this.POL_CONTACT = TTN_SEL.POL_CONTACT;
    this.PLAT = TTN_SEL.PLAT;
    this.PLAT_ADR = TTN_SEL.PLAT_ADR;
    this.PLAT_REKVIZIT = TTN_SEL.PLAT_REKVIZIT;
    this.SUM = TTN_EXT.KOL * TTN_EXT.CENA;
    this.ITOG = 0;
    this.VSEGO = 0;
    this.SUMMA = 0;
    this.PAGE = 0;
    this.KOLPAGE = 0;
    this.KOLMEST = 0;
    this.MASSAGRUZANET = 0;
    this.MASSAGRUZABRUT = 0;
    this.KOLMANAIM = 0;
    this.SUMMANAIM = 0;
    this.PAGENOM = 0;
    this.ORG_NAME = TTN_SEL.ORG_NAME;
    this.ADRESS = TTN_SEL.ADRESS;
    this.MAM = TTN_SEL.MAM;
    this.NOMER = TTN_SEL.NOMER;
    this.NPL = TTN_SEL.NPL;
    this.FULL_FIO = FULL_FIO;
    this.UDOST = TTN_SEL.UDOST;
    this.P_POGR = TTN_SEL.P_POGR;
    this.P_RAZGR = TTN_SEL.P_RAZGR;
    this.PRICEP_MAM = PRICEP_MAM;
    this.PRICEP_NOMER = TTN_SEL.PRICEP_NOMER;
    this.K_PEREVOZ = 0;
    this.ITOGMASSBRUT = 0;
    this.commoditySection = TTN_EXT;
    this.transportSection = TTN_TRANSP;
  }
}
