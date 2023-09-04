import { ApiProperty } from "@nestjs/swagger";

export class OtherEquipmentViewModel {
  @ApiProperty()
  SKLAD_OBJ_SPIS_KEY: number;

  @ApiProperty()
  MAM: string;

  @ApiProperty()
  NOMER: string;

  @ApiProperty()
  DEL: number;

  @ApiProperty()
  SETUP_ID: number;

  @ApiProperty()
  DESCR: string;

  @ApiProperty()
  PREDUPR: number;

  @ApiProperty()
  FULL_NAME: string;

  @ApiProperty()
  DATE_VVODA: Date;
}
