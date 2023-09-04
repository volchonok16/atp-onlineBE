import { ApiProperty } from "@nestjs/swagger";

export class AcquisitionActViewModel {
  @ApiProperty()
  FIO_LIST: string;
  @ApiProperty()
  MAM: string;
  @ApiProperty()
  NOMER: string;
  @ApiProperty()
  NAIM: string;
  @ApiProperty()
  NOMER_TMC: string;
  @ApiProperty()
  KOL: number;
  @ApiProperty()
  DATE_DO: Date;
}
