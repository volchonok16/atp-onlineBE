import { PriceViewModel } from "../../../models/dataEditing.views/priceViewModel";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class PriceDto extends PriceViewModel {
  static dto(data: any): PriceDto {
    const priceDto = new PriceDto();
    return objectFieldFilter<PriceDto>(data, priceDto);
  }
}
