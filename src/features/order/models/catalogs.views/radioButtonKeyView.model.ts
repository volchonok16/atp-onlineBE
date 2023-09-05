import { ApiProperty } from "@nestjs/swagger";

export class RadioButtonKeyViewModel {
  @ApiProperty({ description: "Key ID" })
  key: string = null;
  @ApiProperty({ description: "Key name" })
  name: string;

  static toView(data) {
    return {
      key: data.RAZN_NAK_KEY,
      name: data.NAME_AK,
    };
  }
}
