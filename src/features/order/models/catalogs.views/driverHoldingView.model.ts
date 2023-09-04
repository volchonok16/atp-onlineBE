import { ApiProperty } from "@nestjs/swagger";

export class DriverHoldingViewModel {
  @ApiProperty()
  RAZN_OD_ZAKR_KEY: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  FIO_ID: number;
  @ApiProperty()
  DATES: Date;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  PRIM: string;
  @ApiProperty()
  UCHASTOK: string;
  @ApiProperty()
  ZAK: string;
  @ApiProperty()
  DATES_DO: Date;
  @ApiProperty()
  ORG_ID: number;
  @ApiProperty()
  FIO_ID_KONTR: number;
}
