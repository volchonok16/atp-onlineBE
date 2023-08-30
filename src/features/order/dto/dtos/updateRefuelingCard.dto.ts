import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class UpdateRefuelingCardDto {
  N_ZAPR_CARD: string = null;
  ORG_NAME: string = null;
  LIMIT_: number = null;
  TOPL: string = null;

  static dto(data: any): UpdateRefuelingCardDto {
    const refuelingCardDto = new UpdateRefuelingCardDto();
    return objectFieldFilter<UpdateRefuelingCardDto>(data, refuelingCardDto);
  }
}
