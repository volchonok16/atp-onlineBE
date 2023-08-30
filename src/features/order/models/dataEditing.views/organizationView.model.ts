import { ApiProperty } from '@nestjs/swagger';
import { shortStringToBoolean } from '../../../../common/helpers/shortStringToBooleanTransform.helper';

export class OrganizationViewModel {
  @ApiProperty()
  DATA_KEY: string = null;
  @ApiProperty()
  ZAK_: string = null;
  @ApiProperty()
  KAT: number = null;
  @ApiProperty()
  METOD: number = null;
  @ApiProperty()
  N_KAT: number = null;
  @ApiProperty()
  DOGOVOR: string = null;
  @ApiProperty()
  D_DATE: string = null;
  @ApiProperty()
  DOLGN: string = null;
  @ApiProperty()
  D_FIO: string = null;
  @ApiProperty()
  MVZ: number = null;
  @ApiProperty()
  LNAME: string = null;
  @ApiProperty()
  ARHIV = false;
  @ApiProperty()
  VID_RAB = false;
  @ApiProperty()
  DEL = false;
  @ApiProperty()
  INN: string = null;
  @ApiProperty()
  FROM_1C_ID: string = null;
  @ApiProperty()
  FROM_1C_SUBCONTO: string = null;
  @ApiProperty()
  ADRESS: string = null;
  @ApiProperty()
  POCHT_ADRESS: string = null;
  @ApiProperty()
  GLOBAL_ZAK: number = null;
  @ApiProperty()
  ARHIV_RAZN = false;
  @ApiProperty()
  GEOZONES_LIST: string = null;
  @ApiProperty()
  KPP: string;

  static toView(data) {
    const result = { ...data };
    result.ARHIV_RAZN = shortStringToBoolean(data.ARHIV_RAZN);
    result.ARHIV = shortStringToBoolean(data.ARHIV);
    result.VID_RAB = shortStringToBoolean(data.VID_RAB);
    result.DEL = shortStringToBoolean(data.DEL);

    return result;
  }
}
