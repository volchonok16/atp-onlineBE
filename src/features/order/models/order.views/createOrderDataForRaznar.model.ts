import { CreateOrderDataEntryDto } from "../../dto/dtos/createOrderDataEntry.dto";

export class CreateOrderDataForRaznarModel extends CreateOrderDataEntryDto {
  REMONT: boolean;
  B_VOD: boolean;
}
