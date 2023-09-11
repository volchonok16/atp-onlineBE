import { Injectable, Logger } from "@nestjs/common";
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
import { CreateBookingViewModel } from "../models/order.views/createBookingView.model";
import { CreateBookingDataDto } from "../dto/dtos/order/createBookingDataDto";
import { createQuery } from "../../../common/helpers/firebird-orm/create";
import { OrderDataInputDto } from "../dto/dtos/orderDataInput.dto";
import { CreateOrderView } from "../models/order.views/createOrderView.model";
import { ReferralForRepairsDto } from "../dto/dtos/order/referralForRepairs.dto";

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
      return false;
    }
  }

  async createReferralForRepairs(
    dto: ReferralForRepairsDto
  ): Promise<ReferralForRepairsViewModel> {
    const { query, parameters } = createQuery(
      "RAZN_NAPR_REM",
      dto,
      new ReferralForRepairsViewModel()
    );
    const result = await this.firebird.query(query, parameters);

    return ReferralForRepairsViewModel.toView(result);
  }

  async updateReferalForRepairs(
    dto: WithId<ReferralForRepairsDto>
  ): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      await this.firebird.query(
        `
        UPDATE RAZN_NAPR_REM
        SET ${data} 
        WHERE RAZN_N_R_KEY = ?;
      `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteReferralForRepairs(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
        DELETE FROM RAZN_NAPR_REM WHERE RAZN_N_R_KEY = ?;
      `,
        [id]
      );

      return true;
    } catch (e) {
      return false;
    }
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
    const { query, parameters } = createQuery<CreateOrderDto, CreateOrderDto>(
      "RAZN_ZAK",
      dto,
      new OrderViewModel()
    );
    const result = await this.firebird.query(query, parameters);

    return OrderViewModel.toView(result);
  }

  async updateRequest(dto: WithId<UpdateRequestDto>) {
    try {
      const data = getDataAccumulater(dto);

      await this.firebird.query<any>(
        `
      UPDATE REQ_RAZN 
         SET ${data}
       WHERE REQ_RAZN_KEY = ? 
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async createBooking(
    dto: CreateBookingDataDto
  ): Promise<CreateBookingViewModel> {
    const { query, parameters } = createQuery(
      "RAZNAR2",
      dto,
      new CreateBookingViewModel()
    );
    const result = await this.firebird.query(query, parameters);

    return CreateBookingViewModel.toView(result);
  }

  async updateBooking(dto: WithId<UpdateBookingDataDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      await this.firebird.query(
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
