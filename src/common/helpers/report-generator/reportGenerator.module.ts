import { Module } from "@nestjs/common";
import { ReportGeneratorService } from "./reportGenerator.service";
import { ExcelService } from "./exel.service";
import { PdfService } from "./pdf.service";

@Module({
  providers: [PdfService, ExcelService, ReportGeneratorService],
  exports: [ReportGeneratorService],
})
export class ReportGeneratorModule {}
