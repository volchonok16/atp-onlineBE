import { ApiProperty } from "@nestjs/swagger";

export class OrganizationExecuteViewModel {
  @ApiProperty()
  DATA_FIO_KEY: number;

  @ApiProperty()
  DATA_ID: number;

  @ApiProperty()
  DATA_PODR_ID: number;

  @ApiProperty()
  FIO: string;

  @ApiProperty()
  DOLGN: string;
}
