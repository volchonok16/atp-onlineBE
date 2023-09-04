import { ApiProperty } from "@nestjs/swagger";

export class DirectoriesNotesViewModel {
  @ApiProperty()
  RAZN_STAND_PRIM_KEY: number;

  @ApiProperty()
  STAND_PRIM: string;

  @ApiProperty()
  SETUP_ID: number;
}
