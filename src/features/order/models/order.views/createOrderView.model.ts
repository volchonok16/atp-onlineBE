import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderView {
  @ApiProperty()
  RAZN_KEY: number;
}
