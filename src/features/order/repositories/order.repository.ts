import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReferralForRepairsCreateDto } from "../dto/dtos/referralForRepairsCreate.dto";
import { BillOfLadingViewModel } from "../models/order.views/billOfLadingViewModel";
import { ReferralForRepairsViewModel } from "../models/order.views/referralforrepairsView.Model";
import { format } from "date-fns";
import { CountType } from "../types/countType";
import { UpdateCarForOrderDto } from "../dto/dtos/updateCarForOrderDto";
import { WithId } from "../../../common/./types/withId.type";
import { UpdateBookingDataDto } from "../dto/dtos/order/updateBookingData.dto";
import { CreateOrderDto } from "../dto/dtos/order/createOrder.dto";
import { OrderViewModel } from "../models/order.views/orderView.model";
import { UpdateRequestDto } from "../dto/dtos/updateRequest.dto";
import { getDataAccumulater } from "../../../common/helpers/getData.accumulater";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { BookingViewModel } from "../models/order.views/bookingView.model";
import { CreateBookingDataDto } from "../dto/dtos/order/createBookingDataDto";
import { createQuery } from "../../../common/helpers/firebird-orm/create";
import { OrderDataViewModel } from "../models/order.views/orderDataView.model";
import { CarForOrderViewModel } from "../models/order.views/carForOrderView.model";
import { OrderDataInputDto } from "../dto/dtos/orderDataInput.dto";
import { CreateOrderView } from "../models/order.views/createOrderView.model";

@Injectable()
export class OrderRepository {
  constructor(private firebird: FirebirdService) {}

  async createBillOfLanding(
    TTNData,
    TTN_EXTData,
    TTN_TRANSPData
  ): Promise<BillOfLadingViewModel> {
    try {
      const result = await this.firebird.executeInTransaction(async () => {
        const createTTN = createQuery("TTN", TTNData, TTNData);
        const createdTTN = await this.firebird.transactionQuery(
          createTTN.query,
          createTTN.parameters
        );

        TTN_EXTData.TTN_ID = createdTTN.TTN_KEY;
        const createTTN_EXT = createQuery("TTN_EXT", TTN_EXTData, TTN_EXTData);
        const createdTTN_EXT = await this.firebird.transactionQuery(
          createTTN_EXT.query,
          createTTN_EXT.parameters
        );

        TTN_TRANSPData.TTN_ID = createdTTN.TTN_KEY;
        const createTTN_TRANSP = createQuery(
          "TTN_TRANSP",
          TTN_TRANSPData,
          TTN_TRANSPData
        );
        const createdTTN_TRANSP = await this.firebird.transactionQuery(
          createTTN_TRANSP.query,
          createTTN_TRANSP.parameters
        );

        return { ...createdTTN, ...createdTTN_EXT, ...createdTTN_TRANSP };
      });

      return new BillOfLadingViewModel(result);
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async addWayBillNumber(
    newWayBillNumber: string,
    orderId: number
  ): Promise<boolean> {
    try {
      await this.firebird.query(
        `
        UPDATE RAZNAR
        SET NPL = ?
        WHERE RAZN_KEY = ?;
      `,
        [newWayBillNumber, orderId]
      );
      return true;
    } catch (e) {
      throw false;
    }
  }

  async deleteBillOfLanding(TTN_ID: number): Promise<boolean> {
    try {
      return await this.firebird.executeInTransaction(async () => {
        await this.firebird.transactionQuery(
          `DELETE FROM TTN WHERE TTN_KEY = ?;`,
          [TTN_ID]
        );
        await this.firebird.transactionQuery(
          `DELETE FROM TTN_TRANSP WHERE TTN_ID = ?;`,
          [TTN_ID]
        );
        return true;
      }); // TODO каскадное удаление работает нре полностью
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async createReferralForRepairs(
    dto: ReferralForRepairsCreateDto
  ): Promise<ReferralForRepairsViewModel> {
    const { query, parameters } = createQuery(
      "RAZN_NAPR_REM",
      dto,
      new ReferralForRepairsViewModel()
    );

    return await this.firebird.query(query, parameters);
  }

  async createOrderData(dto: OrderDataInputDto): Promise<CreateOrderView> {
    try {
      const date = format(dto.date, "yyyy-MM-dd");
      const motorcade = dto.motorcadeName === 0 ? null : dto.motorcadeName;
      const [result] = await this.firebird.executeInTransaction(async () => {
        await this.firebird.transactionQuery(
          `
            execute procedure razn_new_day(?, null, ?);
          `,
          [date, motorcade]
        );

        return await this.firebird.transactionQuery(
          `
          SELECT RAZN_KEY FROM RAZNAR ORDER BY RAZN_KEY DESC ROWS 1;
        `
        );
      });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async checkDoesOrderDataExist(currentDate: Date): Promise<boolean> {
    const date = format(currentDate, "yyyy-MM-dd");
    const [orderCount] = await this.firebird.query<CountType>(
      `
    SELECT COUNT(*) 
    FROM W_RAZNAR 
    WHERE DATS = ?
    `,
      [date]
    );

    return orderCount.COUNT > 0;
  }

  async updateOrder(dto: WithId<UpdateCarForOrderDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      await this.firebird.query(
        `
      UPDATE RAZNAR 
         SET ${data}
       WHERE RAZN_KEY = ? 
    `,
        [dto.id]
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async deleteOrder(id: number): Promise<boolean> {
    try {
      await this.firebird.executeInTransaction(async () => {
        await this.firebird.transactionQuery(
          `EXECUTE PROCEDURE RAZNAR_DEL(?)`,
          [id]
        );
      });
      return true;
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }

  async createOrder(dto: CreateOrderDto): Promise<OrderViewModel> {
    const result = await this.firebird.query(`
    INSERT INTO RAZN_ZAK (
      RAZN_ID,
      ZAK_ID,
      PRIM,
      DATA_PODR_ID,
      ADR_POGR,
      ADR_RAZGR,
      TIP_GRUZ,
      N_PL,
      TIP_ZAYAVKI,
      VES,
      RAST_KM,
      HODOK,
      VR_OT,
      VR_DO,
      ROUTE_ID,
      FLIGHT,
      METOD_RASCH
    ) VALUES (
    ${dto.RAZN_ID},
    ${dto.ZAK_ID},
    '${dto.PRIM}',
    ${dto.DATA_PODR_ID},
    '${dto.ADR_POGR}',
    '${dto.ADR_RAZGR}',
    '${dto.TIP_GRUZ}',
    ${dto.N_PL},
    ${dto.TIP_ZAYAVKI},
    ${dto.VES},
    ${dto.RAST_KM},
    ${dto.HODOK},
   '${dto.VR_OT}',
   '${dto.VR_DO}',
   ${dto.ROUTE_ID},
   '${dto.FLIGHT}',
   ${dto.METOD_RASCH}
    )
    RETURNING RAZN_ZAK_KEY;
    `);

    const RAZN_ZAK_KEY = +result[0]["RAZN_ZAK_KEY"];

    const responseForOrder = await this.firebird.query<OrderViewModel>( // +
      "SELECT * FROM RAZN_ZAK WHERE RAZN_ZAK_KEY = ?",
      [RAZN_ZAK_KEY]
    );

    return responseForOrder[0];
  }

  async updateRequest(dto: WithId<UpdateRequestDto>) {
    const data = getDataAccumulater(dto);

    const result = await this.firebird.query<any>(
      `
      UPDATE REQ_RAZN 
         SET ${data}
       WHERE REQ_RAZN_KEY = ? 
    `,
      [dto.id]
    );

    return result["count"] > 0;
  }

  async createBooking(dto: CreateBookingDataDto): Promise<BookingViewModel> {
    try {
      const { query, parameters } = createQuery(
        "RAZNAR2",
        dto,
        new BookingViewModel()
      );
      const result = await this.firebird.query(query, parameters);
      console.log(result);

      return BookingViewModel.toView(result);
    } catch (e) {
      console.log(e);
    }
  }

  async updateBooking(dto: WithId<UpdateBookingDataDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      const result = await this.firebird.query(
        // +
        `
      UPDATE RAZNAR2
         SET ${data}
       WHERE RAZNAR2_KEY = ?;
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteBookingData(RAZNAR2_KEY: number): Promise<boolean> {
    try {
      const result = await this.firebird.query(
        `
      DELETE FROM RAZNAR2
       WHERE RAZNAR2_KEY = ?;
    `,
        [RAZNAR2_KEY]
      );

      return true;
    } catch (e) {
      return false;
    }
  }
}
