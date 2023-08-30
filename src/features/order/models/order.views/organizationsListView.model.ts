import { ApiProperty } from '@nestjs/swagger';

export class OrganizationsListViewModel {
  @ApiProperty()
  DATA_KEY: number;

  @ApiProperty()
  LNAME: string;
}
