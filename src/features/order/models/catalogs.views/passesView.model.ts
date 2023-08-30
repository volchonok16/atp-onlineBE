import { ApiProperty } from '@nestjs/swagger';

export class PassesViewModel {
  @ApiProperty()
  PROPUSK_KEY: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  MARSHRUT: string;
  @ApiProperty()
  N_RAZR: string;
  @ApiProperty()
  DATE_OT: Date;
  @ApiProperty()
  DATE_DO: Date;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  KEY_ID: number;
}
