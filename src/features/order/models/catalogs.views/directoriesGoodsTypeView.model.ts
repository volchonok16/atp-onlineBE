import { ApiProperty } from "@nestjs/swagger";

export class DirectoriesGoodsTypeViewModel {
  @ApiProperty()
  RAZN_TIP_GRUZ_KEY: number;
  @ApiProperty()
  TIP_GRUZ: string;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  ENABLE_TTN: number;
  @ApiProperty()
  KLASS: number;
  @ApiProperty()
  SR_KOEF: number;
  @ApiProperty()
  TIP_RASCH: number;
}
