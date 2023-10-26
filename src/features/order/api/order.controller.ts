import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { OrderQueryRepository } from "../query.repositories/order.query.repository";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { BillOfLadingCreateDto } from "../dto/dtos/billOfLadingCreate.dto";
import { CreateBillOfLadingCommand } from "../use-cases/order/createBillOfLanding.useCase";
import { OutputDataDto } from "../dto/dtos/outputData.dto";
import { ReferralForRepairsDto } from "../dto/dtos/order/referralForRepairs.dto";
import { CreateReferralForRepairsCommand } from "../use-cases/order/referralForRepairs.useCase";
import { BillOfLandingDeleteDto } from "../dto/dtos/billOfLandingDelete.dto";
import { DeleteBillOfLandingCommand } from "../use-cases/order/deleteBillOfLanding.useCase";
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
import { CreateBookingViewModel } from "../models/order.views/createBookingView.model";
import { AddRequestToCarCommand } from "../use-cases/order/addRequestToOrderData.useCase";
import { OrderFoDataPreparationViewModel } from "../models/order.views/OrderFoDataPreparationView.model";
import { CreateOrderDto } from "../dto/dtos/order/createOrder.dto";
import { UpdateBookingDataDto } from "../dto/dtos/order/updateBookingData.dto";
import { DeleteBookingDataCommand } from "../use-cases/order/deleteBookingData.useCase";
import { CreateOrderCommand } from "../use-cases/order/createOrder.useCase";
import * as fs from "fs";
import { UpdatePrepareOutputDataCommand } from "../use-cases/order/updatePrepareOutputData.useCase";
import { CreateOrderView } from "../models/order.views/createOrderView.model";
import { deleteOrderCommand } from "../use-cases/order/deleteOrder.useCase";
import { UpdateRequestCommand } from "../use-cases/order/updateRequest.useCase";
import { UpdateReferralForRepairsCommand } from "../use-cases/order/updateReferalForRepairs.useCase";
import { DeleteReferralForRepairsCommand } from "../use-cases/order/deleteReferralForRepairs.useCase";
import { CarNameForPrepareOutputDataView } from "../models/order.views/carNameForPrepareOutputDataView";
import { CarInfoForPrepareOutputDataView } from "../models/order.views/carInfoForPrepareOutputDataView.model";
import { OrderDataQueryDto } from "../dto/query.dtos/orderData.query.dto";
import { GetBookingQuery } from "../use-cases/order/query-bus/getBooking.query-handler";
import { ProductSectionView } from "../models/order.views/productSectionView.model";
import { ProductSectionDto } from "../dto/dtos/order/productSection.dto";
import { GetProductSectionDataQuery } from "../use-cases/order/query-bus/getProductSectionData.query-handler";
import { InsertOrUpdateProductSectionCommand } from "../use-cases/order/insertOrUpdateProductSection.useCase";
import { DeleteProductSectionCommand } from "../use-cases/order/DeleteProductSection.useCase";
import { TransportSectionView2 } from "../models/order.views/transportSectionView2.model";
import { GetTransportSectionDataQuery } from "../use-cases/order/query-bus/getTransportSectionData.query-handler";
import { TransportSectionDto } from "../dto/dtos/order/transportSection.dto";
import { InsertOrUpdateTransportSectionCommand } from "../use-cases/order/insertOrUpdateTransportSection.useCase";
import { DeleteTransportSectionCommand } from "../use-cases/order/deleteTransportSection.useCase";
import { DeleteOldRaznKeyCommand } from "../use-cases/order/deleteOldRaznKey.useCase";
import { UpdateRaznarCommand } from "../use-cases/order/updateRaznar.useCase";
import { UpdateRaznarWeekPlanDto } from "../dto/dtos/updateRaznarWeekPlan.dto";
import { GetRaznarWeekDto } from "../dto/dtos/getRaznarWeek.dto";
import { CreateOrderDataEntryDto } from "../dto/dtos/createOrderDataEntry.dto";
import { CreateOrderDataForWeekPlanCommand } from "../use-cases/order/createOrderDataForWeekPlan.useCase";
import { WeekPlanViewModel } from "../models/order.views/weekPlanViewModel";

@ApiTags("Order")
@Controller("api/order")
//@UseGuards(RefreshTokenGuard)
export class OrderController {
  constructor(
    private orderQueryRepository: OrderQueryRepository,
    private reportGenerator: ReportGeneratorService,
    private commandBus: CommandBus,
    private queryBus: QueryBus
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
  async createBillOfLandingReport(): // @Body() dto: CreateBillOfLandingReportDto
  Promise<any> {
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

  @Get("bill-of-landing-and-waybill/product-section/:TTN_KEY")
  @ApiOperation({ summary: "Разнарядка -> ТТН -> Товарный раздел" })
  async getProductSection(
    @Param("TTN_KEY") id: number
  ): Promise<ProductSectionView[]> {
    return this.queryBus.execute(new GetProductSectionDataQuery(id));
  }

  @Post("bill-of-landing-and-waybill/product-section")
  @ApiOperation({ summary: "Разнарядка -> ТТН -> Товарный раздел" })
  @ApiBody({ type: ProductSectionDto })
  async insertOrUpdateProductSection(
    @Body() data: any
  ): Promise<ProductSectionView> {
    const dto = ProductSectionDto.dto(data);
    return this.commandBus.execute(
      new InsertOrUpdateProductSectionCommand(dto)
    );
  }

  @Delete("bill-of-landing-and-waybill/product-section/:TTN_EXT_KEY")
  @ApiOperation({ summary: "Разнарядка -> ТТН -> Товарный раздел" })
  async deleteProductSection(
    @Param("TTN_EXT_KEY") id: number
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteProductSectionCommand(id));
  }

  @Get("bill-of-landing-and-waybill/transport-section/:TTN_KEY")
  @ApiOperation({ summary: "Разнарядка -> ТТН -> Транспортный раздел" })
  async getTransportSectionData(
    @Param("TTN_KEY") id: number
  ): Promise<TransportSectionView2[]> {
    return this.queryBus.execute(new GetTransportSectionDataQuery(id));
  }

  @Post("bill-of-landing-and-waybill/transport-section")
  @ApiOperation({ summary: "Разнарядка -> ТТН -> Транспортный раздел" })
  @ApiBody({ type: TransportSectionDto })
  async insertOrUpdateTransportSection(
    @Body() data: any
  ): Promise<TransportSectionView2> {
    const dto = TransportSectionDto.dto(data);
    return this.commandBus.execute(
      new InsertOrUpdateTransportSectionCommand(dto)
    );
  }

  @Delete("bill-of-landing-and-waybill/transport-section/:TTN_TRANSP_KEY")
  @ApiOperation({ summary: "Разнарядка -> ТТН -> Транспортный раздел" })
  async deleteTransportSection(
    @Param("TTN_TRANSP_KEY") id: number
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteTransportSectionCommand(id));
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

  @Put("output-data")
  @ApiOperation({
    summary: "Разнарядка -> Выходная информация",
  })
  @ApiBody({ type: OutputDataDto })
  async prepareOutputData(@Body() data: any): Promise<boolean> {
    const dto = OutputDataDto.dto(data);
    return this.commandBus.execute(new UpdatePrepareOutputDataCommand(dto));
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
  ): Promise<CreateBookingViewModel[]> {
    return this.queryBus.execute(
      new GetBookingQuery({
        ...dto,
        tab: 3,
      })
    );
  }

  @Post("/booking")
  @ApiOperation({ summary: "Разнарядка -> Заказы +" })
  @ApiBody({ type: CreateBookingDataDto })
  async createBookingData(@Body() data: any): Promise<CreateBookingViewModel> {
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

  @Get("/raznar/raznar-week")
  @ApiOperation({ summary: "Разнарядка -> Недельный план +" })
  async getRaznarWeek(
    @Query() param: GetRaznarWeekDto
  ): Promise<WeekPlanViewModel[]> {
    return this.orderQueryRepository.getRaznarWeek(param);
  }

  @Delete("/raznar/:OLD_RAZN_KEY")
  @ApiOperation({ summary: "Разнарядка -> Недельный план +" })
  async deleteOldRaznKey(@Param("OLD_RAZN_KEY") OLD_RAZN_KEY: number) {
    return this.commandBus.execute(new DeleteOldRaznKeyCommand(OLD_RAZN_KEY));
  }

  @Put("/raznar/:OLD_RAZN_KEY")
  @ApiOperation({ summary: "Разнарядка -> Недельный план +" })
  async updateRaznarForWeekPlan(
    @Param("OLD_RAZN_KEY") OLD_RAZN_KEY: number,
    @Body() body: UpdateRaznarWeekPlanDto
  ) {
    return this.commandBus.execute(new UpdateRaznarCommand(OLD_RAZN_KEY, body));
  }

  @Post("/raznar/order-data-entry")
  @ApiOperation({ summary: "Разнарядка -> Недельный план +" })
  async createOrderDataForWeekPlan(
    @Body() body: CreateOrderDataEntryDto
  ): Promise<CreateOrderView> {
    return await this.commandBus.execute(
      new CreateOrderDataForWeekPlanCommand(body)
    );
  }
}
