import { ApiProperty } from '@nestjs/swagger';

export class RelatedDataViewModel {
  @ApiProperty()
  RAZN_OD_EXT_KEY: number;

  @ApiProperty()
  RAZN_OD_ID: number;

  @ApiProperty()
  GPS_ON: number;

  @ApiProperty()
  GPS_MEHAN: number;

  @ApiProperty()
  GPS_ID: string;

  @ApiProperty()
  GPS_DATE: string;

  @ApiProperty()
  KOL_SHIN: number;

  @ApiProperty()
  KOL_AKKUM: number;

  @ApiProperty()
  SCAN_CODE: string;

  @ApiProperty()
  DELTA_PROBEG: number;

  @ApiProperty()
  PERIOD_TO: number;

  @ApiProperty()
  PERIOD_TO_H: number;

  @ApiProperty()
  AGR_TO1: number;

  @ApiProperty()
  ZAM_M_G: number;

  @ApiProperty()
  ZAM_M_T: number;

  @ApiProperty()
  PERIOD_TO2: number;

  @ApiProperty()
  PERIOD_TO2_H: number;

  @ApiProperty()
  AGR_TO2: number;
}
