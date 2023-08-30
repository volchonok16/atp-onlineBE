import { ApiProperty } from '@nestjs/swagger';
import { PrintDocumentEnum } from '../../types/printdocument.enum';

export class CreateBillOfLandingReportDto {
  @ApiProperty()
  billOfLandingId = 221;
  @ApiProperty()
  documentType: PrintDocumentEnum;
}
