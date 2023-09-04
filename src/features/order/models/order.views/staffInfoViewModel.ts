import { ApiProperty } from "@nestjs/swagger";
import { shortStringToBoolean } from "../../../../common/helpers/shortStringToBooleanTransform.helper";
import { numberToBoolean } from "../../../../common/helpers/numberToBooleanTransform.helper";

export class StaffInfoViewModel {
  @ApiProperty()
  FIO_KEY: number;
  @ApiProperty()
  FIO: string;
  @ApiProperty()
  AUTO_ID: number;
  @ApiProperty()
  ORG_ID: number;
  @ApiProperty()
  MAM: string;
  @ApiProperty()
  ARHIV: boolean;
  @ApiProperty()
  USE_OF_RAZN: boolean;
  @ApiProperty()
  FULL_FIO: string;
  @ApiProperty()
  EKIPAG: number;
  @ApiProperty()
  N_IN_EGIPAG: number;
  @ApiProperty()
  SETUP_ID: number;
  @ApiProperty()
  KEY_ID: number;
  @ApiProperty()
  FROM_1C_ID: string;
  @ApiProperty()
  FIO_EXT_KEY: number;
  @ApiProperty()
  FIO_ID: number;
  @ApiProperty()
  UDOST: string;
  @ApiProperty()
  DATE_UDOST: Date;
  @ApiProperty()
  KLASS: string;
  @ApiProperty()
  KAT_A: boolean;
  @ApiProperty()
  KAT_A1: boolean;
  @ApiProperty()
  KAT_B: boolean;
  @ApiProperty()
  KAT_BE: boolean;
  @ApiProperty()
  KAT_B1: boolean;
  @ApiProperty()
  KAT_C: boolean;
  @ApiProperty()
  KAT_C1: boolean;
  @ApiProperty()
  KAT_C1E: boolean;
  @ApiProperty()
  KAT_CE: boolean;
  @ApiProperty()
  KAT_D: boolean;
  @ApiProperty()
  KAT_D1: boolean;
  @ApiProperty()
  KAT_D1E: boolean;
  @ApiProperty()
  KAT_DE: boolean;
  @ApiProperty()
  KAT_E: boolean;
  @ApiProperty()
  KAT_TM: boolean;
  @ApiProperty()
  KAT_TB: boolean;
  @ApiProperty()
  TAB_NO: string;
  @ApiProperty()
  TEL: string;
  @ApiProperty()
  DATE_SPRAV: Date;
  @ApiProperty()
  KAT_S_AI: boolean;
  @ApiProperty()
  KAT_S_AII: boolean;
  @ApiProperty()
  KAT_S_AIII: boolean;
  @ApiProperty()
  KAT_S_AIV: boolean;
  @ApiProperty()
  KAT_S_B: boolean;
  @ApiProperty()
  KAT_S_C: boolean;
  @ApiProperty()
  KAT_S_D: boolean;
  @ApiProperty()
  KAT_S_E: boolean;
  @ApiProperty()
  KAT_S_F: boolean;
  @ApiProperty()
  DATE_UDOST_SPEC: Date;
  @ApiProperty()
  UDOST_SPEC: string;
  @ApiProperty()
  KEY_ID_1: number;
  @ApiProperty()
  SETUP_ID_1: number;
  @ApiProperty()
  SCAN_CODE: string;
  @ApiProperty()
  PRIM: string;
  @ApiProperty()
  KARTA_TAHO: string;
  @ApiProperty()
  DATE_KARTA_TAHO: Date;
  @ApiProperty()
  TIP_VODIT: number;
  @ApiProperty()
  TIP_DISPET: number;
  @ApiProperty()
  TIP_VRACH: number;
  @ApiProperty()
  TIP_REMONT: number;
  @ApiProperty()
  TIP_CONTROL: number;
  @ApiProperty()
  TIP_KONDUKTOR: number;
  @ApiProperty()
  TIP_NACH_A_K: number;
  @ApiProperty()
  N_CARD_TAHOGRAF: string;
  @ApiProperty()
  DATE_CARD_TAHOGRAF: Date;
  @ApiProperty()
  ZP_FROM_1C_GROUP_ID: number;
  @ApiProperty()
  M_AM: string;
  @ApiProperty()
  NAVTO: string;
  @ApiProperty()
  ORG: string;
  @ApiProperty()
  PREDUPR: number;
  @ApiProperty()
  DOPOK_DATE: Date;
  @ApiProperty()
  K_VOD_DATE: Date;
  @ApiProperty()
  INFO: string;
  @ApiProperty()
  STAGIROVKA_PERIOD: string;

  static toView(data) {
    const result = { ...data };
    result.ARHIV = shortStringToBoolean(data.ARHIV);
    result.USE_OF_RAZN = shortStringToBoolean(data.USE_OF_RAZN);
    result.KAT_S_AI = numberToBoolean(data.KAT_S_AI);
    result.KAT_S_AII = numberToBoolean(data.KAT_S_AII);
    result.KAT_S_AIII = numberToBoolean(data.KAT_S_AIII);
    result.KAT_S_AIV = numberToBoolean(data.KAT_S_AIV);
    result.KAT_S_B = numberToBoolean(data.KAT_S_B);
    result.KAT_S_C = numberToBoolean(data.KAT_S_C);
    result.KAT_S_D = numberToBoolean(data.KAT_S_D);
    result.KAT_S_E = numberToBoolean(data.KAT_S_E);
    result.KAT_S_F = numberToBoolean(data.KAT_S_F);
    result.KAT_A = numberToBoolean(data.KAT_A);
    result.KAT_A1 = numberToBoolean(data.KAT_A1);
    result.KAT_B = numberToBoolean(data.KAT_B);
    result.KAT_BE = numberToBoolean(data.KAT_BE);
    result.KAT_B1 = numberToBoolean(data.KAT_B1);
    result.KAT_C = numberToBoolean(data.KAT_C);
    result.KAT_C1 = numberToBoolean(data.KAT_C1);
    result.KAT_CE = numberToBoolean(data.KAT_CE);
    result.KAT_D = numberToBoolean(data.KAT_D);
    result.KAT_D1 = numberToBoolean(data.KAT_D1);
    result.KAT_D1E = numberToBoolean(data.KAT_D1E);
    result.KAT_DE = numberToBoolean(data.KAT_DE);
    result.KAT_E = numberToBoolean(data.KAT_E);
    result.KAT_TM = numberToBoolean(data.KAT_TM);
    result.KAT_TB = numberToBoolean(data.KAT_TB);

    return result;
  }
}
