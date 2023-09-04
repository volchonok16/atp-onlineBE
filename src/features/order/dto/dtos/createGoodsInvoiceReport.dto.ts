import { PrintDocumentEnum } from "../../types/printdocument.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGoodsInvoiceReportDto {
  @ApiProperty()
  billOfLandingId = 221;
  @ApiProperty()
  documentType: PrintDocumentEnum;
}
