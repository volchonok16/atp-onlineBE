import * as xlsx from "xlsx";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExcelService {
  async createExcel(data) {
    const worksheetData = [
      { name: "Diary", code: "diary_code", author: "Pagorn" },
      { name: "Note", code: "note_code", author: "Pagorn" },
      { name: "Medium", code: "medium_code", author: "Pagorn" },
    ];
    const worksheet = xlsx.utils.json_to_sheet(worksheetData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    xlsx.writeFile(workbook, "C:\\Users\\Me\\sample.xlsx");

    const excelInBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return excelInBuffer;
  }
}
