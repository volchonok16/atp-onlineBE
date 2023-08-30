import { ApiProperty } from '@nestjs/swagger';

export class DirectoriesAddressesViewModel {
  @ApiProperty()
  RAZN_ADRESS_KEY: number;

  @ApiProperty()
  ADRESS: string;

  @ApiProperty()
  SETUP_ID: number;
}
