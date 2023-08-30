import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { GoodsInvoiceViewModel } from '../../../features/order/models/order.views/goodsInvoiceView.model.dto';
import { CreateReportDataType } from '../../../features/order/types/createReportDataType';
import { CreateBillOfLandingReportViewModel } from '../../../features/order/models/order.views/billOfLandingView2.model';
import { commoditySectionCell } from './html-samples/commoditySectionCell';
import { transportSectionCell } from './html-samples/tranportSectionCell';

@Injectable()
export class PdfService {
  async createPDF(dto: CreateReportDataType): Promise<Buffer | void> {
    let filename: string;

    switch (true) {
      case dto instanceof GoodsInvoiceViewModel:
        filename = 'sampleTN';
        break;
      case dto instanceof CreateBillOfLandingReportViewModel:
        filename = 'sampleTTN';
        break;
      default:
        throw new Error('Invalid DTO types.');
    }

    const htmlPath = `src/common/helpers/report-generator/html-samples/${filename}.html`;
    const htmlTemplate = fs.readFileSync(htmlPath, 'utf8');

    const $ = cheerio.load(htmlTemplate);

    if (dto instanceof CreateBillOfLandingReportViewModel) {
      dto.commoditySection.forEach((item) => {
        $('#18').after(commoditySectionCell);

        this.fillWithValues(item, $);
      });

      dto.transportSection.forEach((item) => {
        $('#19').after(transportSectionCell);

        this.fillWithValues(item, $);
      });
    }

    for (const prop in dto) {
      if (dto.hasOwnProperty(prop)) {
        const value = dto[prop] !== null ? dto[prop].toString() : '';

        if (!value) {
          $('body').html($('body').html().replace(prop, ''));
        } else {
          $(`p:contains(${prop})`).replaceWith(value);
        }
      }
    }
    const modifiedHTML = $.html();

    async function generatePDFContent(htmlContent) {
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();
      return pdfBuffer;
    }

    try {
      const pdfBuffer = await generatePDFContent(modifiedHTML);

      /* const outputPath = `C:\\Users\\Me\\${filename}.pdf`;
      fs.writeFileSync(outputPath, pdfBuffer);
      console.log('PDF document saved to disk.');*/

      console.log('PDF report generated successfully.');
      return pdfBuffer;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  private fillWithValues(item, $) {
    for (const prop in item) {
      if (item.hasOwnProperty(prop)) {
        const value = item[prop] !== null ? item[prop].toString() : '';
        $(`p:contains(${prop})`).replaceWith(value);
      }
    }
  }
}
