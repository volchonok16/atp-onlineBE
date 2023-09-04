import { ApiProperty } from "@nestjs/swagger";

export class OrganizationsViewModel {
  @ApiProperty()
  DATA_KEY: number;

  @ApiProperty()
  ZAK_: string;

  @ApiProperty()
  LNAME: string;

  @ApiProperty()
  KAT: number;

  @ApiProperty()
  N_KAT: number;

  @ApiProperty()
  METOD: number;
}
