import { ApiProperty } from "@nestjs/swagger";

export class TransportSectionViewModel {
  @ApiProperty()
  NAIM_TRANP: string | null;
  @ApiProperty()
  VID_UPAK: string | null;
  @ApiProperty()
  DOCS: string | null;
  @ApiProperty()
  MEST_TRANSP: number | null;
  @ApiProperty()
  SPOSOB: number | null;
  @ApiProperty()
  CODE_TRANSP: string | null;
  @ApiProperty()
  N_KONT: string | null;
  @ApiProperty()
  KLASS: string | null;
  @ApiProperty()
  MASSA_TRANSP: number | null;

  constructor(TTN_TRANSP) {
    this.NAIM_TRANP = TTN_TRANSP.NAIM;
    this.VID_UPAK = TTN_TRANSP.VID_UPAK;
    this.DOCS = TTN_TRANSP.DOCS;
    this.MEST_TRANSP = TTN_TRANSP.MEST;
    this.SPOSOB = TTN_TRANSP.SPOSOB;
    this.CODE_TRANSP = TTN_TRANSP.CODE;
    this.N_KONT = TTN_TRANSP.N_KONT;
    this.KLASS = TTN_TRANSP.KLASS;
    this.MASSA_TRANSP = TTN_TRANSP.MASSA;
  }
}
