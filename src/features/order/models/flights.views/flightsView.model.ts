import { ApiProperty } from "@nestjs/swagger";

export class FlightsViewModel {
  @ApiProperty()
  RAZN_OD_KEY: number;
  @ApiProperty()
  MAM: string;
  @ApiProperty()
  NOMER: string;
  @ApiProperty()
  FIO_ID: number;
  @ApiProperty()
  TIP: number;
  @ApiProperty()
  GRAFIK: number;
  @ApiProperty()
  MK: string;
  @ApiProperty()
  NAK: number;
  @ApiProperty()
  TIP_PL: string;
  @ApiProperty()
  NORM_ZAPR: string;
  @ApiProperty()
  DEL: string;
  @ApiProperty()
  PREDUPR: number;
  @ApiProperty()
  TEK_SPID_POS: number;
  @ApiProperty()
  TEK_TIMER_DVIG_POS: number;
  @ApiProperty()
  LAST_DATE: Date;
  @ApiProperty()
  PPROBEG: number;
  @ApiProperty()
  PERIOD_TO: number;
  @ApiProperty()
  PERIOD_TO2: number;
  @ApiProperty()
  VIN: string;
  @ApiProperty()
  GPS_ID: string;
  @ApiProperty()
  PPROBEG_TO1: number;
  @ApiProperty()
  PPROBEG_TO2: number;
  @ApiProperty()
  PPROBEG_TO1_AGR: number;
  @ApiProperty()
  PPROBEG_TO2_AGR: number;
  @ApiProperty()
  PPROBEG_AGR: number;
  @ApiProperty()
  REQ_NAME: string;
  @ApiProperty()
  SPID_TO1: number;
  @ApiProperty()
  SPID_TO2: number;
  @ApiProperty()
  HH_TO2: number;
  @ApiProperty()
  HH_TO1: number;
  @ApiProperty()
  KEY_TIP: number;
  @ApiProperty()
  RAZN_OD_ID_PRICEP: number;
  @ApiProperty()
  RARE_USE: number;
  @ApiProperty()
  PERIOD_TO_H: number;
  @ApiProperty()
  PERIOD_TO2_H: number;
  @ApiProperty()
  PPROBEG_TO1_H_DV: number;
  @ApiProperty()
  PPROBEG_TO2_H_DV: number;
  @ApiProperty()
  ENABLE_FIND_FINE: number;
  @ApiProperty()
  FROM_1C_ID: string;
  @ApiProperty()
  KONSERV_OT: Date;
  @ApiProperty()
  KONSERV_DO: Date;
  @ApiProperty()
  WAIT_4_CANCELLATION: number;
  @ApiProperty()
  WAIT_4_CANCELLATION_DATE: Date;
  @ApiProperty()
  NAME_AK: string;
  @ApiProperty()
  SERIJA: string;
  @ApiProperty()
  FINES_PROBLEM: Blob;
  @ApiProperty()
  VID_PEREV: string;
  @ApiProperty()
  VID_SOOB: string;
  @ApiProperty()
  TEK_TIMER_POS: number;
  @ApiProperty()
  INV_NO: string;
  @ApiProperty()
  GPS_PROBEG: number;
  @ApiProperty()
  DATE_P_TAHOGRAFA: Date;
}
