import { ApiProperty } from "@nestjs/swagger";

export class ExtendedInformationViewModel {
  @ApiProperty()
  RAZN_OD_KEY: number;

  @ApiProperty()
  MAM: string;

  @ApiProperty()
  NOMER: string;
}
