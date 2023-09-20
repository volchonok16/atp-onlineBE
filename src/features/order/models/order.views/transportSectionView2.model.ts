import { ApiProperty } from "@nestjs/swagger";

export class TransportSectionView2 {
  @ApiProperty()
  TTN_TRANSP_KEY: number = null;
  @ApiProperty()
  TTN_ID: number = null;
  @ApiProperty({ description: "Short name of the cargo" })
  NAIM: string = null;
  @ApiProperty({ description: "Type of packaging" })
  VID_UPAK: string = null;
  @ApiProperty({ description: "Documents accompany the cargo" })
  DOCS: string = null;
  @ApiProperty({ description: "Number of seats" })
  MEST: number = null;
  @ApiProperty({ description: "Method for determining mass" })
  SPOSOB: string = null;
  @ApiProperty({ description: "Cargo code" })
  CODE: string = null;
  @ApiProperty({ description: "Container number" })
  N_KONT: string = null;
  @ApiProperty({ description: "Cargo class" })
  KLASS: string = null;
  @ApiProperty({ description: "Gross weight, t" })
  MASSA: number = null;
}
