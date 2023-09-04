import { ApiProperty } from "@nestjs/swagger";

export class DirectoriesTransportationTypeViewModel {
  @ApiProperty()
  RAZN_VID_PEREV_KEY: number;

  @ApiProperty()
  VID_PEREV: string;

  @ApiProperty()
  KEY_ID: number;

  @ApiProperty()
  SETUP_ID: number;
}
