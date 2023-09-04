import { ApiProperty } from "@nestjs/swagger";

export class DirectoriesMechanismTypesViewModel {
  @ApiProperty()
  RAZN_T_T_KEY: number;

  @ApiProperty()
  T_T: string;

  @ApiProperty()
  NOM: number;

  @ApiProperty()
  SETUP_ID: number;

  @ApiProperty()
  KEY_ID: number;

  @ApiProperty()
  KEY_TIP: number;
}
