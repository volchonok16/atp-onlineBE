import { ApiProperty } from '@nestjs/swagger';
import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class UpdateStaffCardDto {
  @ApiProperty()
  KLASS: string = null;
  @ApiProperty()
  UDOST: string = null;
  @ApiProperty()
  KAT_A: number = null;
  @ApiProperty()
  KAT_A1: number = null;
  @ApiProperty()
  KAT_B: number = null;
  @ApiProperty()
  KAT_BE: number = null;
  @ApiProperty()
  KAT_B1: number = null;
  @ApiProperty()
  KAT_C: number = null;
  @ApiProperty()
  KAT_C1: number = null;
  @ApiProperty()
  KAT_C1E: number = null;
  @ApiProperty()
  KAT_CE: number = null;
  @ApiProperty()
  KAT_D: number = null;
  @ApiProperty()
  KAT_D1E: number = null;
  @ApiProperty()
  KAT_DE: number = null;
  @ApiProperty()
  KAT_TB: number = null;
  @ApiProperty()
  KAT_TM: number = null;
  @ApiProperty()
  UDOST_SPEC: string = null;
  @ApiProperty()
  DATE_UDOST_SPEC = '2023-08-14';
  @ApiProperty()
  KAT_S_AI: number;
  @ApiProperty()
  KAT_S_AII: number;
  @ApiProperty()
  KAT_S_AIII: number;
  @ApiProperty()
  KAT_S_AIV: number;
  @ApiProperty()
  KAT_S_B: number;
  @ApiProperty()
  KAT_S_C: number;
  @ApiProperty()
  KAT_S_D: number;
  @ApiProperty()
  KAT_S_E: number;
  @ApiProperty()
  KAT_S_F: number;
  @ApiProperty()
  KARTA_TAHO: string = null;
  @ApiProperty()
  DATE_KARTA_TAHO = '2023-08-14';
  @ApiProperty()
  DATE_SPRAV = '2023-08-14';
  @ApiProperty()
  TEL: string = null;
  @ApiProperty()
  TAB_NO: string = null;
  @ApiProperty()
  TIP_VODIT: string = null;
  @ApiProperty()
  TIP_DISPET: string = null;
  @ApiProperty()
  TIP_VRACH: string = null;
  @ApiProperty()
  TIP_REMONT: string = null;
  @ApiProperty()
  TIP_CONTROL: string = null;
  @ApiProperty()
  TIP_KONDUKTOR: string = null;
  @ApiProperty()
  TIP_NACH_A_K: string = null;
  @ApiProperty()
  ZP_FROM_1C_GROUP_ID: string = null;

  static dto(data: any): UpdateStaffCardDto {
    const staffCardDto = new UpdateStaffCardDto();
    return objectFieldFilter<UpdateStaffCardDto>(data, staffCardDto);
  }
}
