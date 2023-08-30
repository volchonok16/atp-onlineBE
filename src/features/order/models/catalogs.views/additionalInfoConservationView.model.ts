import { ApiProperty } from '@nestjs/swagger';

export class AdditionalInfoConservationViewModel {
  @ApiProperty()
  RAZN_OD_KONSERV_KEY: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  DATE_OT: Date;
  @ApiProperty()
  DATE_DO: Date;
}
