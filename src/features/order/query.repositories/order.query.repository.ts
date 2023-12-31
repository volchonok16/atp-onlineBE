import { Injectable, NotFoundException } from "@nestjs/common";
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
import { CarNameForPrepareOutputDataView } from "../models/order.views/carNameForPrepareOutputDataView";
import { ProductSectionView } from "../models/order.views/productSectionView.model";
import { TransportSectionView2 } from "../models/order.views/transportSectionView2.model";
import { GetRaznarWeekDto } from "../dto/dtos/getRaznarWeek.dto";

@Injectable()
export class OrderQueryRepository {
  constructor(private firebird: FirebirdService) {}

  async getOutputData(RAZN_ID: number): Promise<OutputDataViewModel> {
    try {
      const result = await this.firebird.query<OutputDataViewModel>(
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

  async getDataForGoodsInvoiceANDBillOfLanding(
    TTN_KEY: number
  ): Promise<CreateReportDataType[]> {
    const resultFromTTN_SEL = await this.firebird.query<any>(
      ` SELECT * FROM TTN_SEL(?)`,
      [TTN_KEY]
    );

    const RAZN_ZAK_KEY = resultFromTTN_SEL[0].RAZN_ZAK_ID;

    const resultFromTTN_TRANSP = await this.firebird.query<any>(
      ` SELECT * FROM TTN_TRANSP WHERE TTN_ID = ?`,
      [TTN_KEY]
    );

    const TTN_TRANSP = resultFromTTN_TRANSP.map(
      (e) => new TransportSectionViewModel(e)
    );

    const resultFromTTN_EXT = await this.firebird.query<any>(
      ` SELECT * FROM TTN_EXT WHERE TTN_ID = ?`,
      [TTN_KEY]
    );

    const TTN_EXT = resultFromTTN_EXT.map(
      (e) => new CommoditySectionViewModel(e)
    );

    const resultForFULL_FIO = await this.firebird.query<any>(
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

    const resultForPRICEP_MAM = await this.firebird.query<any>(
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

  async getProductSectionData(id: number): Promise<ProductSectionView[]> {
    return this.firebird.query(
      `
      SELECT TTN_EXT_KEY, TTN_ID,NOM_PRICE, ARTICUL, KOL, CENA, NAIM, ED_IZM, UPAKOVKA, MEST, MASSA 
      FROM TTN_EXT
      WHERE TTN_ID = ?;
    `,
      [id]
    );
  }

  async getTransportSectionData(id: number): Promise<TransportSectionView2[]> {
    return this.firebird.query(
      `
      SELECT NAIM, VID_UPAK, DOCS, MEST, SPOSOB, CODE, N_KONT, KLASS, MASSA
      FROM TTN_TRANSP
      WHERE TTN_ID = ?;
    `,
      [id]
    );
  }

  async getCarsNamesForPrepareOutputData(): Promise<
    CarNameForPrepareOutputDataView[]
  > {
    const result = await this.firebird.query(`
      SELECT * FROM  RAZN_OD_SEL(1, null) where mk is not null;
    `);

    return result.map((r) => CarNameForPrepareOutputDataView.toView(r));
  }

  async getSecondDiverFIO(
    id: number
  ): Promise<{ FIO_KEY: number; FULL_FIO: string }> {
    const [result] = await this.firebird.query(
      `
      SELECT FIO_KEY, FULL_FIO FROM FIO WHERE FIO_KEY = ?;
    `,
      [id]
    );
    return result;
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

  async preparedOutputDataExist(
    id: number
  ): Promise<{ RAZN_OD_ID: number | null }> {
    const [result] = await this.firebird.query(
      `
          SELECT RAZN_OD_ID FROM RAZNAR WHERE RAZN_KEY = ?;
        `,
      [id]
    );

    return result?.RAZN_OD_ID;
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

  async referalIsExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT COUNT(*) FROM RAZN_NAPR_REM WHERE RAZN_N_R_KEY = ?;
    `,
      [id]
    );

    return result.COUNT === 1;
  }

  async productSectionExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT COUNT(*) FROM TTN_EXT WHERE TTN_EXT_KEY = ?;
    `,
      [id]
    );

    return result.COUNT === 1;
  }

  async transportSectionExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT COUNT(*) FROM TTN_TRANSP WHERE TTN_TRANSP_KEY = ?;
    `,
      [id]
    );

    return result.COUNT === 1;
  }

  async getRaznarWeek(param: GetRaznarWeekDto) {
    return await this.firebird.query(`SELECT * FROM  RAZNAR_WEEK(?, ?)`, [
      param.date,
      param.column,
    ]);
  }

  async checkRaznarId(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
          SELECT COUNT(*) FROM RAZNAR WHERE RAZN_KEY = ?;
        `,
      [id]
    );
    return result.COUNT === 1;
  }
}
