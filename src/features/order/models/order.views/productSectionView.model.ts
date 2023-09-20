import { ApiProperty } from "@nestjs/swagger";

export class ProductSectionView {
  @ApiProperty()
  TTN_ID: number = null;
  @ApiProperty()
  TTN_EXT_KEY: number = null;
  @ApiProperty({ description: "Price list number" })
  NOM_PRICE: string = null;
  @ApiProperty({ description: "Vendor code" })
  ARTICUL: string = null;
  @ApiProperty({ description: "Count" })
  KOL: number = null;
  @ApiProperty({ description: "Price" })
  CENA: number = null;
  @ApiProperty({ description: "Name" })
  NAIM: string = null;
  @ApiProperty({ description: "Unit" })
  ED_IZM: string = null;
  @ApiProperty({ description: "Type of packaging" })
  UPAKOVKA: string = null;
  @ApiProperty({ description: "Number of seats" })
  MEST: string = null;
  @ApiProperty({ description: "Weight" })
  MASSA: number = null;
}
