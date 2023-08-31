import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { dbConnect_const } from '../../../common/constants/global.constants';
import { ReferralForRepairsCreateDto } from '../dto/dtos/referralForRepairsCreate.dto';
import { BillOfLadingViewModel } from '../models/order.views/billOfLadingViewModel';
import { ReferralForRepairsViewModel } from '../models/order.views/referralforrepairsView.Model';
import { format } from 'date-fns';
import { CountType } from '../types/countType';
import { UpdateCarForOrderDto } from '../dto/dtos/updateCarForOrderDto';
import { WithId } from '../../../common/./types/withId.type';
import { UpdateBookingDataDto } from '../dto/dtos/order/updateBookingData.dto';
import { CreateOrderDto } from '../dto/dtos/order/createOrder.dto';
import { OrderViewModel } from '../models/order.views/orderView.model';
import { UpdateRequestDto } from '../dto/dtos/updateRequest.dto';
import { BillOfLadingCreateDto } from '../dto/dtos/billOfLadingCreate.dto';
import { getDataAccumulater } from '../../../common/helpers/getData.accumulater';
import { FirebirdService } from '../../../common/helpers/firebird-orm/firebird';
import { Connection } from 'odbc';
import { BookingViewModel } from '../models/order.views/bookingView.model';
import { CreateBookingDataDto } from '../dto/dtos/order/createBookingDataDto';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(dbConnect_const) private firebird: Connection,
    private rawFirebird: FirebirdService,
  ) {}

  async createBillOfLanding(
    billOfLandingCreateDto: BillOfLadingCreateDto,
  ): Promise<BillOfLadingViewModel> {
    let TTN_KEY = 0;

    try {
      await this.firebird.beginTransaction();

      const firstTable = await this.firebird.query(`
        INSERT INTO TTN (
          OTPRAVIT_ID,
          POLUCHAT_ID,
          PLAT_ID,
          RAZN_ZAK_ID,
          N_TTN,
          DATE_SOST,
          DATE_DOST,
          P_POGR,
          P_RAZGR,
          OPASN_GRUZ,
          DOP_INFO,
          OTPRAVIT_DATA_FIO_ID,
          POLUCHAT_DATA_FIO_ID
        ) VALUES (
          ${billOfLandingCreateDto.OTPRAVIT_ID},
          ${billOfLandingCreateDto.POLUCHAT_ID},
          ${billOfLandingCreateDto.PLAT_ID},
          ${billOfLandingCreateDto.RAZN_ZAK_ID},
          '${billOfLandingCreateDto.N_TTN}',
          '${billOfLandingCreateDto.DATE_SOST}',
          '${billOfLandingCreateDto.DATE_DOST}',
          '${billOfLandingCreateDto.P_POGR}',
          '${billOfLandingCreateDto.P_RAZGR}',
          '${billOfLandingCreateDto.OPASN_GRUZ}',
          '${billOfLandingCreateDto.DOP_INFO}',
          ${billOfLandingCreateDto.OTPRAVIT_DATA_FIO_ID},
          ${billOfLandingCreateDto.POLUCHAT_DATA_FIO_ID}
        )
        RETURNING TTN_KEY;
      `);

      TTN_KEY = +firstTable[0]['TTN_KEY'];

      await this.firebird.query(`
        INSERT INTO TTN_EXT (
          TTN_ID,
          CODE,
          NOM_PRICE,
          ARTICUL,
          KOL,
          CENA,
          NAIM,
          ED_IZM,
          UPAKOVKA,
          MEST,
          MASSA
        ) VALUES (
          ${TTN_KEY},
          '${billOfLandingCreateDto.CODE}',
          '${billOfLandingCreateDto.NOM_PRICE}',
          '${billOfLandingCreateDto.ARTICUL}',
          ${billOfLandingCreateDto.KOL},
          ${billOfLandingCreateDto.CENA},
          '${billOfLandingCreateDto.NAIM}',
          '${billOfLandingCreateDto.ED_IZM}',
          '${billOfLandingCreateDto.UPAKOVKA}',
          '${billOfLandingCreateDto.MEST}',
          ${billOfLandingCreateDto.MASSA}
        );
      `);

      await this.firebird.query(`
        INSERT INTO TTN_TRANSP (
          TTN_ID,
          NAIM,
          DOCS,
          VID_UPAK,
          MEST,
          SPOSOB,
          CODE,
          N_KONT,
          KLASS,
          MASSA,
          DOCS_LIST,
          P5_UKAZ,
          P6_FAKT_SOST_GRUZA_PRIEM,
          P6_FAKT_SOST_GRUZA_SDACHA,
          P8_USL_PEREV,
          P8_0,
          P8_1,
          P8_2,
          P8_3,
          P_13,
          P_16
        ) VALUES (
          ${TTN_KEY},
          '${billOfLandingCreateDto.NAIM_TTN_TRANSP}',
          '${billOfLandingCreateDto.DOCS}',
          ${billOfLandingCreateDto.VID_UPAK},
          '${billOfLandingCreateDto.MEST_TTN_TRANSP}',
          '${billOfLandingCreateDto.SPOSOB}',
          '${billOfLandingCreateDto.CODE_TTN_TRANS}',
          '${billOfLandingCreateDto.N_KONT}',
          '${billOfLandingCreateDto.KLASS}',
          ${billOfLandingCreateDto.MASSA_TTN_TRANS},
          '${billOfLandingCreateDto.DOCS_LIST}',
          '${billOfLandingCreateDto.P5_UKAZ}',
          '${billOfLandingCreateDto.P6_FAKT_SOST_GRUZA_PRIEM}',
          '${billOfLandingCreateDto.P6_FAKT_SOST_GRUZA_SDACHA}',
          '${billOfLandingCreateDto.P8_USL_PEREV}',
          '${billOfLandingCreateDto.P8_0}',
          '${billOfLandingCreateDto.P8_1}',
          '${billOfLandingCreateDto.P8_2}',
          '${billOfLandingCreateDto.P8_3}',
          '${billOfLandingCreateDto.P_13}',
          '${billOfLandingCreateDto.P_16}'
        )
      `);

      await this.firebird.commit();
    } catch (error) {
      await this.firebird.rollback();
      throw error;
    }

    const result = await this.rawFirebird.query(
      `
        SELECT *
      FROM TTN
      JOIN TTN_EXT ON TTN.TTN_KEY = TTN_EXT.TTN_ID
      JOIN TTN_TRANSP ON TTN.TTN_KEY = TTN_TRANSP.TTN_ID
      WHERE TTN_KEY = ?
      `,
      [TTN_KEY],
    );
    return new BillOfLadingViewModel(result[0]);
  }

  async addWayBillNumber(
    newWayBillNumber: string,
    orderId: number,
  ): Promise<boolean> {
    try {
      const result = await this.firebird.query(
        `
        UPDATE RAZNAR
        SET NPL = ?
        WHERE RAZN_KEY = ?
      `,
        [newWayBillNumber, orderId],
      );
      return result.count > 0;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteBillOfLanding(TTN_ID: number) {
    try {
      await this.firebird.beginTransaction();

      await this.firebird.query(`DELETE FROM TTN WHERE TTN_KEY = ?;`, [TTN_ID]);

      await this.firebird.query(`DELETE FROM TTN_EXT WHERE TTN_ID = ?;`, [
        TTN_ID,
      ]);

      await this.firebird.query(`DELETE FROM TTN_TRANSP WHERE TTN_ID = ?;`, [
        TTN_ID,
      ]);

      await this.firebird.commit();
    } catch (error) {
      await this.firebird.rollback();
      throw error;
    }
  }

  async createReferralForRepairs(
    dto: ReferralForRepairsCreateDto,
  ): Promise<ReferralForRepairsViewModel> {
    let RAZN_N_R_KEY = 0;
    try {
      const result = await this.firebird.query(`
      INSERT INTO RAZN_NAPR_REM (
      NOM,
      FIO_ID,
      DATES,
      RAZN_OD_ID,
      VID_RAB,
      VR_N,
      VR_K
      ) VALUES (
     ${dto.NOM},
     ${dto.FIO_ID},
     '${dto.DATES}',
     ${dto.RAZN_OD_ID},
     '${dto.VID_RAB}',
     '${dto.VR_N}',
     '${dto.VR_K}'
      )
      RETURNING RAZN_N_R_KEY
    `);
      RAZN_N_R_KEY = +result[0]['RAZN_N_R_KEY'];

      const responseForReferral = await this.rawFirebird.query(
        `
      SELECT * FROM RAZN_NAPR_REM WHERE RAZN_N_R_KEY = ?
      `,
        [RAZN_N_R_KEY],
      );

      return new ReferralForRepairsViewModel(responseForReferral[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async createOrderData(
    currentDate: Date,
    motorcadeName: number,
  ): Promise<void> {
    const date = format(currentDate, 'yyyy-MM-dd');
    await this.firebird.query(
      `
    execute procedure razn_new_day(?, null, ?)
    `,
      [date, motorcadeName === 0 ? null : motorcadeName],
    );
    return;
  }

  async checkDoesOrderDataExist(currentDate: Date): Promise<boolean> {
    const date = format(currentDate, 'yyyy-MM-dd');
    const orderCount = await this.firebird.query<CountType>(
      `
    SELECT COUNT(*) 
    FROM W_RAZNAR 
    WHERE DATS = ?
    `,
      [date],
    );
    return orderCount[0].COUNT > 0;
  }

  async updateOrder(dto: WithId<UpdateCarForOrderDto>): Promise<boolean> {
    const data = getDataAccumulater(dto);

    const result = await this.firebird.query<any>(
      `
      UPDATE RAZNAR 
         SET ${data}
       WHERE RAZN_KEY = ? 
    `,
      [dto.id],
    );

    if (result['count'] === 0) throw new NotFoundException();
    return result['count'] === 1;
  }

  async deleteOrder(RAZN_KEY: number): Promise<boolean> {
    try {
      await this.firebird.beginTransaction();
      const result = await this.firebird.query(
        `EXECUTE PROCEDURE RAZNAR_DEL(?)`,
        [RAZN_KEY],
      );
      if (result['count'] === 0) throw new NotFoundException();
      await this.firebird.commit();
      return result['count'] === 1;
    } catch (error) {
      await this.firebird.rollback();
      throw error;
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

    const RAZN_ZAK_KEY = +result[0]['RAZN_ZAK_KEY'];

    const responseForOrder = await this.rawFirebird.query<OrderViewModel>(
      'SELECT * FROM RAZN_ZAK WHERE RAZN_ZAK_KEY = ?',
      [RAZN_ZAK_KEY],
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
      [dto.id],
    );

    return result['count'] > 0;
  }

  async createBooking(dto: CreateBookingDataDto): Promise<BookingViewModel> {
    const query = `
                    INSERT INTO RAZNAR2(
                      DATE_RAB,
                      DATA_ID,
                      ORG_ID,
                      FIO_ID,
                      FIO2_ID,
                      RAZOV,
                      PRIVL_TRANSPORT,
                      ROUTE_ID,
                      RAZN_T_T_ID,
                      RAZN_OD_ID,
                      VR_V,
                      VR_Z,
                      VR_I,
                      SUMM_VREM,
                      CENA,
                      SUMM,
                      CENA_PODR,
                      VREM_I_PODR,
                      SUMM_PODR,
                      PROFIT_PODR,
                      COMMENTAR
                    )
                    VALUES(
                      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

    await this.firebird.query(query, [
      dto.DATE_RAB,
      dto.DATA_ID,
      dto.ORG_ID,
      dto.FIO_ID,
      dto.FIO2_ID,
      dto.RAZOV,
      dto.PRIVL_TRANSPORT,
      dto.ROUTE_ID,
      dto.RAZN_T_T_ID,
      dto.RAZN_OD_ID,
      dto.VR_V,
      dto.VR_Z,
      dto.VR_I,
      dto.SUMM_VREM,
      dto.CENA,
      dto.SUMM,
      dto.CENA_PODR,
      dto.VREM_I_PODR,
      dto.SUMM_PODR,
      dto.PROFIT_PODR,
      dto.COMMENTAR,
    ]);

    const result = await this.rawFirebird.query(`
                      SELECT * FROM RAZNAR2
                       ORDER BY SSORT DESC
                        ROWS 1
                    `);

    return BookingViewModel.toView(result[0]);
  }

  async updateBooking(dto: WithId<UpdateBookingDataDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      const result = await this.rawFirebird.query(
        `
      UPDATE RAZNAR2
         SET ${data}
       WHERE RAZNAR2_KEY = ?;
    `,
        [dto.id],
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteBookingData(RAZNAR2_KEY: number): Promise<number> {
    const result = await this.firebird.query(
      `
      DELETE FROM RAZNAR2
       WHERE RAZNAR2_KEY = ?;
    `,
      [RAZNAR2_KEY],
    );

    return result['count'];
  }
}
