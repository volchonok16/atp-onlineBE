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
import { PrepareOutputDataDto } from "../dto/dtos/order/prepareOutputData.dto";
import { PreparedOutputDataView } from "../models/order.views/PreparedOutputDataView.model";
import { OutputDataDto } from "../dto/dtos/outputData.dto";
import { ProductSectionDto } from "../dto/dtos/order/productSection.dto";
import { ProductSectionView } from "../models/order.views/productSectionView.model";
import { upsertQuery } from "../../../common/helpers/firebird-orm/upsert";
import { TransportSectionView2 } from "../models/order.views/transportSectionView2.model";
import { TransportSectionDto } from "../dto/dtos/order/transportSection.dto";
import { UpdateRaznarWeekPlanDto } from "../dto/dtos/updateRaznarWeekPlan.dto";
import { CreateOrderDataForRaznarModel } from "../models/order.views/createOrderDataForRaznar.model";

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

  async updateRaznar(
    dto: OutputDataDto,
    id: number | undefined
  ): Promise<boolean> {
    try {
      const doUpdate = id ? true : false;
      return await this.firebird.executeInTransaction(async () => {
        const data = [];
        if (dto.NPL) data.push(`NPL = '${dto.NPL}'`);
        if (dto.FIO_ID) data.push(`FIO_ID = ${dto.FIO_ID}`);
        if (!data.length) return false;

        await this.firebird.transactionQuery(
          `
        UPDATE RAZNAR
        SET ${data.join(",")}   
        WHERE RAZN_KEY = ?;
      `,
          [dto.RAZN_KEY]
        );

        if (doUpdate) {
          await this.firebird.transactionQuery(
            `
        UPDATE RAZN_OD
        SET NORM_ZAPR = ?
        WHERE RAZN_OD_KEY = ?;
      `,
            [dto.NORM_ZAPR, id]
          );
        }
        return true;
      });
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
      }); // каскадное удаление работает не полностью, необходима транзакция
    } catch (e) {
      return false;
    }
  }

  async inserOrUpdateProductSection(
    dto: ProductSectionDto
  ): Promise<ProductSectionView> {
    const { query, parameters } = upsertQuery<
      ProductSectionDto,
      ProductSectionView
    >("TTN_EXT", "TTN_EXT_KEY", dto, new ProductSectionView());

    return await this.firebird.query(query, parameters);
  }

  async deleteProductSection(id: number): Promise<boolean> {
    try {
      await this.firebird.query("DELETE FROM TTN_EXT WHERE TTN_EXT_KEY = ?;", [
        id,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }

  async insertOrUpdateTransportSection(
    dto: TransportSectionDto
  ): Promise<TransportSectionView2> {
    const { query, parameters } = upsertQuery<
      TransportSectionDto,
      TransportSectionView2
    >("TTN_TRANSP", "TTN_TRANSP_KEY", dto, new TransportSectionView2());

    return this.firebird.query(query, parameters);
  }

  async deleteTransportSection(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
        DELETE FROM TTN_TRANSP WHERE TTN_TRANSP_KEY = ?; 
      `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async createPrepareOutputData(
    dto: PrepareOutputDataDto
  ): Promise<PreparedOutputDataView> {
    const { query, parameters } = createQuery(
      "RAZNAR",
      dto,
      new PreparedOutputDataView()
    );

    return this.firebird.query(query, parameters);
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

  async deleteOldRaznKey(OLD_RAZN_KEY: number) {
    try {
      await this.firebird.query(
        `
      DELETE FROM RAZNAR
       WHERE RAZN_KEY = ?;
    `,
        [OLD_RAZN_KEY]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async updateRaznarWeekPlan(
    id: number,
    dto: UpdateRaznarWeekPlanDto
  ): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      await this.firebird.query(
        `
      UPDATE RAZNAR
         SET ${data}
       WHERE RAZN_KEY = ?;
    `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async insertIntoRaznar(
    dto: CreateOrderDataForRaznarModel
  ): Promise<CreateOrderView> {
    const { query, parameters } = createQuery("RAZNAR", dto, "RAZN_KEY");
    return this.firebird.query(query, parameters);
  }
}
