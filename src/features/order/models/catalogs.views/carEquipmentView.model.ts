import { ApiProperty } from '@nestjs/swagger';

export class CarEquipmentViewModel {
  @ApiProperty()
  RAZN_OD_KOMPL_KEY: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  NAIM: string;
  @ApiProperty()
  NOMER: string;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  KOL: number;
}
