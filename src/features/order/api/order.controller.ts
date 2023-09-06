import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { OrderQueryRepository } from "../query.repositories/order.query.repository";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { BillOfLadingCreateDto } from "../dto/dtos/billOfLadingCreate.dto";
import { CreateBillOfLadingCommand } from "../use-cases/order/createBillOfLanding.useCase";
import { OutputDataDto } from "../dto/dtos/outputData.dto";
import { ReferralForRepairsDto } from "../dto/dtos/order/referralForRepairs.dto";
import { CreateReferralForRepairsCommand } from "../use-cases/order/referralForRepairs.useCase";
import { BillOfLandingDeleteDto } from "../dto/dtos/billOfLandingDelete.dto";
import { DeleteBillOfLandingCommand } from "../use-cases/order/deleteBillOfLanding.useCase";
import { OutputDataViewModel } from "../models/order.views/outputdataView.model";
import { ReferralForRepairsViewModel } from "../models/order.views/referralforrepairsView.Model";
import { OrderDataInputDto } from "../dto/dtos/orderDataInput.dto";
import { CreateOrderDataCommand } from "../use-cases/order/createOrderData.useCase";
import { BillOfLadingViewModel } from "../models/order.views/billOfLadingViewModel";
import { ReportGeneratorService } from "../../../common/helpers/report-generator/reportGenerator.service";
import { UpdateCarForOrderDto } from "../dto/dtos/updateCarForOrderDto";
import { GetCarForOrderDto } from "../dto/query.dtos/getCarForOrder.dto";
import { CarForOrderViewModel } from "../models/order.views/carForOrderView.model";
import { OrderViewModel } from "../models/order.views/orderView.model";
import { RequestLogDto } from "../dto/query.dtos/requestLog.dto";
import { RequestViewModel } from "../models/order.views/requestView.model";
import { UpdateRequestDto } from "../dto/dtos/updateRequest.dto";
import { CreateBookingDataDto } from "../dto/dtos/order/createBookingDataDto";
import { CreateBookingCommand } from "../use-cases/order/createBooking.useCase";
import { UpdateBookingCommand } from "../use-cases/order/updateBooking.useCase";
import { UpdateOrderCommand } from "../use-cases/order/updateOrder.useCase";
import { BookingViewModel } from "../models/order.views/bookingView.model";
import { AddRequestToCarCommand } from "../use-cases/order/addRequestToOrderData.useCase";
import { OrderFoDataPreparationViewModel } from "../models/order.views/OrderFoDataPreparationView.model";
import { CreateOrderDto } from "../dto/dtos/order/createOrder.dto";
import { UpdateBookingDataDto } from "../dto/dtos/order/updateBookingData.dto";
import { DeleteBookingDataCommand } from "../use-cases/order/deleteBookingData.useCase";
import { CreateOrderCommand } from "../use-cases/order/createOrder.useCase";
import * as fs from "fs";
import { AddWayBillNumberCommand } from "../use-cases/order/createOutputData.useCase";
import { CreateBillOfLandingReportDto } from "../dto/dtos/createBillOfLandingReport.dto";
import { CreateOrderView } from "../models/order.views/createOrderView.model";
import { deleteOrderCommand } from "../use-cases/order/deleteOrder.useCase";
import { UpdateRequestCommand } from "../use-cases/order/updateRequest.useCase";
import { UpdateReferralForRepairsCommand } from "../use-cases/order/updateReferalForRepairs.useCase";
import { DeleteReferralForRepairsCommand } from "../use-cases/order/deleteReferralForRepairs.useCase";
import { CarNameForPrepareOutputDataView } from "../models/order.views/carNameForPrepareOutputDataView";
import { CarInfoForPrepareOutputDataView } from "../models/order.views/carInfoForPrepareOutputDataView.model";
import { OrderDataQueryDto } from "../dto/query.dtos/orderData.query.dto";
import { PrepareOutputDataDto } from "../dto/dtos/order/prepareOutputData.dto";

@ApiTags("Order")
@Controller("api/order")
//@UseGuards(RefreshTokenGuard)
export class OrderController {
  constructor(
    private orderQueryRepository: OrderQueryRepository,
    private reportGenerator: ReportGeneratorService,
    private commandBus: CommandBus
  ) {}

  @Get("prepare-a-table-for")
  @ApiOperation({
    summary: "Разнарядка -> Подготовка данных -> Подготовить таблицу на... +",
  })
  async getOrderDataForDataPreparation(
    @Query() dto: GetCarForOrderDto
  ): Promise<OrderFoDataPreparationViewModel[]> {
    const data = await this.orderQueryRepository.getOrderData({
      ...dto,
      tab: 1,
    });

    return data.map((d) => OrderFoDataPreparationViewModel.toView(d));
  }

  @Post("bill-of-landing-and-waybill")
  @ApiOperation({
    summary: "Разнарядка -> ТТН -> Создать ТТН на указанный рейс +",
  })
  async createBillOfLading(
    @Body() dto: BillOfLadingCreateDto
  ): Promise<BillOfLadingViewModel> {
    return await this.commandBus.execute(new CreateBillOfLadingCommand(dto));
  }

  @Post("create-goods-invoice-report/:id")
  @ApiOperation({
    summary: "Разнарядка -> ТТН -> Печать ТНН +",
  })
  async createGoodsInvoiceReport(): // @Body() dto: CreateGoodsInvoiceReportDto
  Promise<any> {
    return fs.readFileSync(
      `src/common/helpers/report-generator/mok-pdf-reports/TN_mok.pdf`
    );

    // const dataForReport: CreateReportDataType[] =
    //   await this.orderQueryRepository.getDataForGoodsInvoiceANDBillOfLanding(
    //     dto.billOfLandingId
    //   );
    //
    // const goodsInvoice = dataForReport[0];
    //
    // return await this.reportGenerator.createReport(
    //   goodsInvoice,
    //   dto.documentType
    // );
  }

  @Post("create-bill-of-landing-report/:id")
  @ApiOperation({
    summary: "Разнарядка -> ТТН -> Печать ТНН +",
  })
  async createBillOfLandingReport(
    @Body() dto: CreateBillOfLandingReportDto
  ): Promise<any> {
    return fs.readFileSync(
      `src/common/helpers/report-generator/mok-pdf-reports/TTN_mok.pdf`
    );

    // const dataForReport: CreateReportDataType[] =
    //   await this.orderQueryRepository.getDataForGoodsInvoiceANDBillOfLanding(
    //     dto.billOfLandingId
    //   );
    //
    // const dataForBillOfLandingReport = dataForReport[1];
    //
    // return await this.reportGenerator.createReport(
    //   dataForBillOfLandingReport,
    //   dto.documentType
    // );
  }

  @Delete("bill-of-landing-and-waybill")
  @ApiOperation({
    summary: "Разнарядка -> ТТН -> Удалить выбранную ТТН +",
  })
  async deleteBillOfLanding(@Body() dto: BillOfLandingDeleteDto) {
    return await this.commandBus.execute(
      new DeleteBillOfLandingCommand(dto.TTN_ID)
    );
  }

  @Post("output-data")
  @ApiOperation({
    summary: "Разнарядка -> Выходная информация",
  })
  @ApiBody({ type: PrepareOutputDataDto })
  createPrepareOutputData(@Body() data: any) {
    return "in progress";
  }

  @Put("output-data")
  @ApiOperation({
    summary: "Разнарядка -> Выходная информация",
  })
  cupdatePrepareOutputData() {
    return "in progress";
  }

  @Get("output-data/car-name")
  @ApiOperation({
    summary: "Разнарядка -> Выходная информация -> Таблица с машинами +",
  })
  async getCarsNamesForPrepareOutputData(): Promise<
    CarNameForPrepareOutputDataView[]
  > {
    return this.orderQueryRepository.getCarsNamesForPrepareOutputData();
  }

  @Get("output-data/car-info")
  @ApiOperation({
    summary: "Разнарядка -> Выходная информация -> Таблица с ФИО +",
  })
  async getCarInfoForPrepareOutputDataView(
    @Query() dto: OrderDataQueryDto
  ): Promise<CarInfoForPrepareOutputDataView[]> {
    const result = await this.orderQueryRepository.getOrderData({
      ...dto,
      tab: 4,
    });

    return result.map((r) => CarInfoForPrepareOutputDataView.toView(r));
  }

  @Post("output-data")
  @ApiOperation({
    summary: "Разнарядка -> Выходная информация +",
  })
  async prepareOutputData(
    @Body() dto: OutputDataDto
  ): Promise<OutputDataViewModel | any> {
    return this.commandBus.execute(new AddWayBillNumberCommand(dto));
  }

  @Post("referral-for-repairs")
  @ApiOperation({
    summary: "Разнарядка -> Направление на ремонт +",
  })
  async createReferral(
    @Body() dto: ReferralForRepairsDto
  ): Promise<ReferralForRepairsViewModel> {
    return await this.commandBus.execute(
      new CreateReferralForRepairsCommand(dto)
    );
  }

  @Put("referral-for-repairs/:RAZN_N_R_KEY")
  @ApiOperation({
    summary: "Разнарядка -> Направление на ремонт +",
  })
  async updateReferral(
    @Body() data: any,
    @Param("RAZN_N_R_KEY") id: number
  ): Promise<boolean> {
    const dto = ReferralForRepairsDto.dto(data);
    return await this.commandBus.execute(
      new UpdateReferralForRepairsCommand({ ...dto, id })
    );
  }

  @Delete("referral-for-repairs/:RAZN_N_R_KEY")
  @ApiOperation({
    summary: "Разнарядка -> Направление на ремонт +",
  })
  async deleteReferral(@Param("RAZN_N_R_KEY") id: number): Promise<boolean> {
    return await this.commandBus.execute(
      new DeleteReferralForRepairsCommand(id)
    );
  }

  @Post("order")
  @ApiOperation({
    summary: "Разнарядка -> Разнарядка +",
  })
  async createOrderData(
    @Body() inputDto: OrderDataInputDto
  ): Promise<CreateOrderView> {
    return await this.commandBus.execute(new CreateOrderDataCommand(inputDto));
  }

  @Get("/order")
  @ApiOperation({
    summary: "Разнарядка -> Разнарядка +",
  })
  async getCarForOrderData(
    @Query() dto: GetCarForOrderDto
  ): Promise<CarForOrderViewModel[]> {
    const data = await this.orderQueryRepository.getOrderData({
      ...dto,
      tab: 2,
    });

    return data.map((d) => CarForOrderViewModel.toView(d));
  }

  @Put("/order/:RAZN_KEY")
  @ApiOperation({
    summary: "Разнарядка -> Разнарядка",
  })
  @ApiBody({ type: UpdateCarForOrderDto })
  async updateCarForOrder(
    @Param("RAZN_KEY") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateCarForOrderDto.dto(data);
    return this.commandBus.execute(new UpdateOrderCommand({ id, ...dto }));
  }

  @Delete("/order/:RAZN_KEY +")
  async deleteCarForOrder(
    @Param("RAZN_KEY") RAZN_KEY: number
  ): Promise<boolean> {
    return this.commandBus.execute(new deleteOrderCommand(RAZN_KEY));
  }

  @Post("data-preparation/create-order")
  @ApiOperation({
    summary: "Разнарядка -> Подготовка данных +",
  })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() data: any): Promise<OrderViewModel> {
    const dto = CreateOrderDto.dto(data);
    return await this.commandBus.execute(new CreateOrderCommand(dto));
  }

  @Get("data-preparation/request-log")
  @ApiOperation({
    summary: "Разнарядка -> Журнал заявок (бд пустое?)",
  })
  async getRequestLog(
    @Query() dto: RequestLogDto
  ): Promise<RequestViewModel[]> {
    return await this.orderQueryRepository.getRequestLog(dto);
  }

  @Put("data-preparation/request-log/:REQ_RAZN_KEY")
  @ApiOperation({
    summary: "Разнарядка -> Журнал заявок -> Сохранить (бд пустое?)",
  })
  @ApiBody({ type: UpdateRequestDto })
  async updateRequest(@Param("REQ_RAZN_KEY") id: number, @Body() data: any) {
    const dto = UpdateRequestDto.dto(data);
    return await this.commandBus.execute(
      new UpdateRequestCommand({ id, ...dto })
    );
  }

  @Post("data-preparation/add-request-to-car/:REQ_RAZN_KEY/:RAZN_KEY")
  @ApiOperation({
    summary:
      "Разнарядка -> Журнал заявок -> Добавить к выбранной машине (бд пустое?)",
  })
  async addRequestToOrderData(
    @Param("REQ_RAZN_KEY") REQ_RAZN_KEY: string,
    @Param("RAZN_KEY") RAZN_KEY: string
  ) {
    return await this.commandBus.execute(
      new AddRequestToCarCommand(REQ_RAZN_KEY, RAZN_KEY)
    );
  }

  @Get("/booking")
  @ApiOperation({
    summary:
      "Разнарядка -> Заказы (локальная база содержит не корректные поля таблица RAZN_OD_SEL)",
  })
  async getBooking(
    @Query() dto: GetCarForOrderDto
  ): Promise<BookingViewModel[]> {
    const data = await this.orderQueryRepository.getOrderData({
      ...dto,
      tab: 3,
    });

    return data.map((d) => BookingViewModel.toView(d));
  }

  @Post("/booking")
  @ApiOperation({ summary: "Разнарядка -> Заказы +" })
  @ApiBody({ type: CreateBookingDataDto })
  async createBookingData(@Body() data: any): Promise<BookingViewModel> {
    const dto = CreateBookingDataDto.dto(data);
    return this.commandBus.execute(new CreateBookingCommand(dto));
  }

  @Put("/booking/:RAZNAR2_KEY")
  @ApiOperation({ summary: "Разнарядка -> Заказы +" })
  @ApiBody({ type: UpdateBookingDataDto })
  async updateBookingData(
    @Param("RAZNAR2_KEY") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateBookingDataDto.dto(data);
    return this.commandBus.execute(new UpdateBookingCommand({ id, ...dto }));
  }

  @Delete("/booking/:RAZNAR2_KEY")
  @ApiOperation({ summary: "Разнарядка -> Заказы +" })
  async deleteBookingData(
    @Param("RAZNAR2_KEY") RAZNAR2_KEY: number
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteBookingDataCommand(RAZNAR2_KEY));
  }
}
