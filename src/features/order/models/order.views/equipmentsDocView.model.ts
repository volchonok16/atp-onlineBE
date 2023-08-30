import { ApiProperty } from '@nestjs/swagger';

export class EquipmentsDocViewModel {
  @ApiProperty()
  RAZN_OD_DOCA_KEY: number;

  @ApiProperty()
  RAZN_OD_ID: number;

  @ApiProperty()
  NAIM: string;

  @ApiProperty()
  NOMER: string;

  @ApiProperty()
  KEM_VID: string;

  @ApiProperty()
  DATE_OT: Date;

  @ApiProperty()
  DATE_DO: Date;

  @ApiProperty()
  D_PREDUPR: number;

  @ApiProperty()
  KEY_ID: number;

  @ApiProperty()
  SETUP_ID: number;

  @ApiProperty()
  IN_AKT: number;
}
