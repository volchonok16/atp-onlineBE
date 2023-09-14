import { ApiProperty } from "@nestjs/swagger";
import { da } from "date-fns/locale";

export class OtherEquipmentViewModel {
  @ApiProperty()
  SKLAD_OBJ_SPIS_KEY: number = null;

  @ApiProperty()
  MAM: string = null;

  @ApiProperty()
  NOMER: string = null;

  @ApiProperty()
  DEL: boolean = null;

  @ApiProperty()
  SETUP_ID: number = null;

  @ApiProperty()
  DESCR: string = null;

  @ApiProperty()
  PREDUPR: number = null;

  @ApiProperty()
  FULL_NAME: string = null;

  @ApiProperty()
  DATE_VVODA: Date = null;
}
