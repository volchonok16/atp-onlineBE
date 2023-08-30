import { PdfService } from './pdf.service';
import { ExcelService } from './exel.service';
import { Injectable } from '@nestjs/common';
import { GoodsInvoiceViewModel } from '../../../features/order/models/order.views/goodsInvoiceView.model.dto';
import { PrintDocumentEnum } from '../../../features/order/types/printdocument.enum';
import { PrintDocumentType } from '../../../features/order/types/printDocumentType';
import { BillOfLadingViewModel } from '../../../features/order/models/order.views/billOfLadingViewModel';
import { CreateReportDataType } from '../../../features/order/types/createReportDataType';

@Injectable()
export class ReportGeneratorService {
  constructor(
    private pdfService: PdfService,
    private excelService: ExcelService,
  ) {}

  async createReport(
    docForPrint: CreateReportDataType,
    documentType: PrintDocumentEnum,
  ) {
    switch (documentType) {
      case PrintDocumentEnum.pdf:
        return await this.pdfService.createPDF(docForPrint);
      case PrintDocumentEnum.excel:
        return await this.excelService.createExcel(docForPrint);
      default:
        throw new Error('Invalid document types.');
    }
  }
}
