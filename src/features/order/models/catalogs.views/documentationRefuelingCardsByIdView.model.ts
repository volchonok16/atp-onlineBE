import { ApiProperty } from '@nestjs/swagger';

export class DocumentationRefuelingCardsByIdViewModel {
  @ApiProperty()
  RAZN_OD_ZAPR_CARDS_KEY: number;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  RAZN_OD_ID: number;
  @ApiProperty()
  N_ZAPR_CARD: string;
  @ApiProperty()
  ORG_NAME: string;
  @ApiProperty()
  LIMIT_: number;
  @ApiProperty()
  TOPL: string;
}
