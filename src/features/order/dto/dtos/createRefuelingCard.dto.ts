import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class CreateRefuelingCardDto {
  N_ZAPR_CARD: string = null;
  ORG_NAME: string = null;
  LIMIT_: number = null;
  TOPL: string = null;

  static dto(data: any): CreateRefuelingCardDto {
    const refuelingCardDto = new CreateRefuelingCardDto();
    return objectFieldFilter<CreateRefuelingCardDto>(data, refuelingCardDto);
  }
}
