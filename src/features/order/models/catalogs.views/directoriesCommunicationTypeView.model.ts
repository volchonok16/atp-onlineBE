import { ApiProperty } from '@nestjs/swagger';

export class DirectoriesCommunicationTypeViewModel {
  @ApiProperty()
  RAZN_VID_SOOBSH_KEY: number;

  @ApiProperty()
  VID_SOOBSH: string;

  @ApiProperty()
  KEY_ID: number;

  @ApiProperty()
  SETUP_ID: number;
}
