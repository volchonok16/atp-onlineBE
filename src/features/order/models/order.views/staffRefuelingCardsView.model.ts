import { ApiProperty } from '@nestjs/swagger';

export class StaffRefuelingCardsViewModel {
  @ApiProperty()
  FIO_ZAPR_CARDS_KEY: number;
  @ApiProperty()
  FIO_ID: number;
  @ApiProperty()
  N_ZAPR_CARD: string;
  @ApiProperty()
  ORG_NAME: string;
  @ApiProperty()
  LIMIT_: number;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  TOPL: string;
}
