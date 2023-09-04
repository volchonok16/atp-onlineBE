import { ApiProperty } from "@nestjs/swagger";

export class CommoditySectionViewModel {
  @ApiProperty()
  CODE_EXT: string | null;
  @ApiProperty()
  NOM_PRICE: string | null;
  @ApiProperty()
  ARTICUL: string | null;
  @ApiProperty()
  KOL: string | null;
  @ApiProperty()
  CENA: number | null;
  @ApiProperty()
  NAIM_EXT: string | null;
  @ApiProperty()
  ED_IZM: string | null;
  @ApiProperty()
  UPAKOVKA: string | null;
  @ApiProperty()
  MEST_EXT: number | null;
  @ApiProperty()
  MASSA_EXT: number | null;

  constructor(TTN_EXT) {
    this.CODE_EXT = TTN_EXT.CODE;
    this.NOM_PRICE = TTN_EXT.NOM_PRICE;
    this.ARTICUL = TTN_EXT.ARTICUL;
    this.KOL = TTN_EXT.KOL;
    this.CENA = TTN_EXT.CENA;
    this.NAIM_EXT = TTN_EXT.NAIM;
    this.ED_IZM = TTN_EXT.ED_IZM;
    this.UPAKOVKA = TTN_EXT.UPAKOVKA;
    this.MEST_EXT = TTN_EXT.MEST;
    this.MASSA_EXT = TTN_EXT.MASSA;
  }
}
