import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { dbConnect_const } from "../../../common/constants/global.constants";
import { Connection } from "odbc";
import { OutputDataViewModel } from "../models/order.views/outputdataView.model";
import { format } from "date-fns";
import { OrderDataQueryDtoType } from "../types/orderDataQueryDtoType";
import { OrderDataViewModel } from "../models/order.views/orderDataView.model";
import { OrderDataSortByEnum } from "../types/orderDataSortBy.enum";
import { GoodsInvoiceViewModel } from "../models/order.views/goodsInvoiceView.model.dto";
import { CreateBillOfLandingReportViewModel } from "../models/order.views/billOfLandingView2.model";
import { CreateReportDataType } from "../types/createReportDataType";
import { CommoditySectionViewModel } from "../models/order.views/commoditySectionView.model";
import { TransportSectionViewModel } from "../models/order.views/transportSectionView.model";
import { OneOrderDataViewModel } from "../models/order.views/oneOrderDataView.model";
import { RequestLogDto } from "../dto/query.dtos/requestLog.dto";
import { RequestViewModel } from "../models/order.views/requestView.model";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { rawDbResponseTransform } from "../../../common/helpers/rawDbResponseTransform.helper";
import { GetCarForOrderDto } from "../dto/query.dtos/getCarForOrder.dto";
import { CarForOrderViewModel } from "../models/order.views/carForOrderView.model";

@Injectable()
export class OrderQueryRepository {
  constructor(private firebird: FirebirdService) {}

  async getOutputData(RAZN_ID: number): Promise<OutputDataViewModel> {
    try {
      const result = await this.firebird.query<OutputDataViewModel>( //+
        `
    SELECT *
    FROM  RAZNAR
    WHERE RAZN_KEY = ?
    `,
        [RAZN_ID]
      );
      return result[0];
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getBookingData(dto: GetCarForOrderDto): Promise<OrderDataViewModel[]> {
    //query to get data from db
    let query = `SELECT * FROM RAZNAR2`; // TODO RAZNAR_S(?, ?, ?, null)

    //add filter if it exists
    if (dto.filter)
      query += `
     WHERE UPPER(MAM) LIKE UPPER('%${dto.filter}%') 
      OR  UPPER(NOMER) LIKE UPPER('%${dto.filter}%') 
      OR UPPER(FIO) LIKE UPPER('%${dto.filter}%') 
      OR UPPER(ZAKS) LIKE UPPER('%${dto.filter}%') `;

    const data = await this.firebird.query<OrderDataViewModel>(query);
    console.log(data);
    const result = rawDbResponseTransform(data);
    return result.map((r) => OrderDataViewModel.toView(r));
  }

  async getDataForGoodsInvoiceANDBillOfLanding(
    TTN_KEY: number
  ): Promise<CreateReportDataType[]> {
    const resultFromTTN_SEL = await this.firebird.query<any>( // +
      ` SELECT * FROM TTN_SEL(?)`,
      [TTN_KEY]
    );

    const RAZN_ZAK_KEY = resultFromTTN_SEL[0].RAZN_ZAK_ID;

    const resultFromTTN_TRANSP = await this.firebird.query<any>( // +
      ` SELECT * FROM TTN_TRANSP WHERE TTN_ID = ?`,
      [TTN_KEY]
    );

    const TTN_TRANSP = resultFromTTN_TRANSP.map(
      (e) => new TransportSectionViewModel(e)
    );

    const resultFromTTN_EXT = await this.firebird.query<any>( // +
      ` SELECT * FROM TTN_EXT WHERE TTN_ID = ?`,
      [TTN_KEY]
    );

    const TTN_EXT = resultFromTTN_EXT.map(
      (e) => new CommoditySectionViewModel(e)
    );

    const resultForFULL_FIO = await this.firebird.query<any>( // +
      `
    SELECT *
FROM TTN
INNER JOIN RAZN_ZAK ON TTN.RAZN_ZAK_ID = RAZN_ZAK.RAZN_ZAK_KEY
INNER JOIN RAZNAR ON RAZN_ZAK.RAZN_ID = RAZNAR.RAZN_KEY
INNER JOIN FIO ON RAZNAR.FIO_ID = FIO.FIO_KEY
WHERE TTN.TTN_KEY = ?;
    `,
      [TTN_KEY]
    );

    const resultForPRICEP_MAM = await this.firebird.query<any>( // +
      `
    SELECT * FROM RAZNAR_S(null, null, null, null, ?);
    `,
      [RAZN_ZAK_KEY]
    );

    let PRICEP_MAM;

    if (!resultForPRICEP_MAM[0]) {
      PRICEP_MAM = null;
    }

    const goodsInvoice = new GoodsInvoiceViewModel(
      resultFromTTN_SEL[0],
      TTN_TRANSP,
      TTN_EXT
    );

    const billOfLanding = new CreateBillOfLandingReportViewModel(
      resultFromTTN_SEL[0],
      TTN_TRANSP,
      TTN_EXT,
      resultForFULL_FIO[0].FULL_FIO,
      PRICEP_MAM
    );

    const totalResult = [goodsInvoice, billOfLanding];
    return totalResult;
  }

  async getOneOrderData(RAZN_ID: number): Promise<OneOrderDataViewModel> {
    const car = await this.firebird.query<OneOrderDataViewModel>(
      `SELECT * FROM RAZNAR WHERE RAZN_KEY = ?`,
      [RAZN_ID]
    );
    return car[0];
  }

  async getOrderData(dto: OrderDataQueryDtoType) {
    const date = format(dto.date, "yyyy-MM-dd");
    console.log(dto);
    console.log(date);
    //query to get data from db
    let query = `SELECT * FROM RAZNAR_S(?, ?, ?, ?, null)`;

    //add filter if it exists
    if (dto.filter)
      query += `
     WHERE UPPER(MAM) LIKE UPPER('%${dto.filter}%') 
      OR  UPPER(NOMER) LIKE UPPER('%${dto.filter}%') 
      OR UPPER(FIO) LIKE UPPER('%${dto.filter}%') 
      OR UPPER(ZAKS) LIKE UPPER('%${dto.filter}%') `;

    //add sort by if it exists
    if (dto.sortBy) {
      switch (dto.sortBy) {
        case OrderDataSortByEnum.cipher:
          query += ` ORDER BY NOM, MAM, NOMER`;
          query += ` ORDER BY NOM, MAM, NOMER`;
          break;
        case OrderDataSortByEnum.brand:
          query += ` ORDER BY MAM, NOMER, VR_V`;
          break;
        case OrderDataSortByEnum.client:
          query += ` ORDER BY ZAKS, MAM, NOMER`;
          break;
        case OrderDataSortByEnum.note:
          query += ` ORDER BY PRIM_4_SORT nulls last`;
          break;
        case OrderDataSortByEnum.departureTime:
          query += ` ORDER BY VR_V, MAM, NOMER`;
          break;
        case OrderDataSortByEnum.surname:
          query += ` ORDER BY FIO nulls last`;
          break;
      }
    }

    return await this.firebird.query<OrderDataViewModel>(query, [
      date,
      date,
      dto.tab,
      dto.motorcadeName,
    ]);
  }

  async getRequestLog(dto: RequestLogDto): Promise<RequestViewModel[]> {
    let query = `SELECT * FROM REQ_RAZN_4DISP(?, ?)`;
    let filter = null;

    //add filter if it exists
    if (dto.filterByCustomer || dto.filterByOrder) {
      filter = dto.filterByCustomer ? dto.filterByCustomer : +dto.filterByOrder;
      query += `
      WHERE UPPER(LNAME) LIKE UPPER('%${filter}%') OR REQ_RAZN_KEY LIKE '%${filter}%' `;
    }

    return this.firebird.query(query, [
      // +
      dto.DATE_RAB,
      dto.RAZN_ID !== null ? +dto.RAZN_ID : null,
    ]);
  }

  async getRequest(REQ_RAZN_KEY: number): Promise<RequestViewModel> {
    const result = await this.firebird.query<RequestViewModel>(
      `
    SELECT *
FROM REQ_RAZN
INNER JOIN REQ_USER ON REQ_RAZN.REQ_USER_ID = REQ_USER.REQ_USER_KEY
WHERE REQ_RAZN.REQ_RAZN_KEY = ?;
    `,
      [REQ_RAZN_KEY]
    );
    return result[0];
  }

  async orderExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT COUNT(*) FROM RAZNAR2 WHERE RAZNAR2_KEY = ?;
    `,
      [id]
    );

    return result.COUNT === 1;
  }

  async billOfLandingExist(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
          SELECT COUNT(*) FROM TTN WHERE TTN_KEY = ?;
        `,
      [id]
    );

    return result.COUNT === 1;
  }

  async wayBillExist(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
          SELECT COUNT(*) FROM RAZNAR WHERE RAZN_KEY = ?;
        `,
      [id]
    );

    return result.COUNT === 1;
  }

  async bookingExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
          SELECT COUNT(*) FROM RAZNAR2 WHERE RAZNAR2_KEY = ?;
        `,
      [id]
    );

    return result.COUNT === 1;
  }
}
