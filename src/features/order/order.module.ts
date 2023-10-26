import { Module } from "@nestjs/common";
import { OrderController } from "./api/order.controller";
import { OrderQueryRepository } from "./query.repositories/order.query.repository";
import { CatalogsController } from "./api/catalogs.controller";
import { CatalogsQueryRepository } from "./query.repositories/catalogs.query.repository";
import { OrderRepository } from "./repositories/order.repository";
import { CreateCarInfoUseCase } from "./use-cases/data-editing/createCarInfo.useCase";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateBillOfLandingUseCase } from "./use-cases/order/createBillOfLanding.useCase";
import { CreateReferralForRepairsUseCase } from "./use-cases/order/referralForRepairs.useCase";
import { UpdatePrepareOutputDataUseCase } from "./use-cases/order/updatePrepareOutputData.useCase";
import { DataEditingQueryRepository } from "./query.repositories/dataEditing.query.repository";
import { DataEditingController } from "./api/dataEditing.controller";
import { DeleteBillOfLandingUseCase } from "./use-cases/order/deleteBillOfLanding.useCase";
import { CreateOrderDataUseCase } from "./use-cases/order/createOrderData.useCase";
import { ReportGeneratorModule } from "../../common/helpers/report-generator/reportGenerator.module";
import { UpdateOrderUseCase } from "./use-cases/order/updateOrder.useCase";
import { PopUpWindowController } from "./api/popUpWindow.controller";
import { PopUpWindowQueryRepository } from "./query.repositories/popUpWindow.query.repository";
import { UpdateStaffInfoUseCase } from "./use-cases/data-editing/updateStaffInfo.useCase";
import { UpdateInternShipUseCase } from "./use-cases/data-editing/updateInternship.useCase";
import { UpdateStaffCardUseCase } from "./use-cases/data-editing/updateStaffCard.useCase";
import { CreateRefuelingCardUseCase } from "./use-cases/data-editing/createRefuelingCard.useCase";
import { UpdateRefuelingCardUseCase } from "./use-cases/data-editing/updateRefuelingCard.useCase";
import { DeleteRefuelingCardUseCase } from "./use-cases/data-editing/deleteRefuelingCard.useCase";
import { CreateAdditionalInformationUseCase } from "./use-cases/data-editing/createAdditionalInformation.useCase";
import { DataEditingRepository } from "./repositories/dataEditing.repository";
import { UpdateAdditionalInformationUseCase } from "./use-cases/data-editing/updateAdditionalInformation.useCase";
import { DeleteAdditionalInformationUseCase } from "./use-cases/data-editing/deleteAdditionalInformation.useCase";
import { UploadImagesUseCase } from "./use-cases/data-editing/uploadImage.useCase";
import { UpdateImageUseCase } from "./use-cases/data-editing/updateImage.useCase";
import { DeleteImageUseCase } from "./use-cases/data-editing/deleteImage.useCase";
import { dataEditingUseCases } from "./use-cases/data-editing";
import { orderUseCases } from "./use-cases/order";
import { UpdateRequestUseCase } from "./use-cases/order/updateRequest.useCase";
import { AddRequestToOrderDataUseCase } from "./use-cases/order/addRequestToOrderData.useCase";
import { UpdateCarInfoUseCase } from "./use-cases/data-editing/updateCarInfo.useCase";
import { DeleteCarInfoUseCase } from "./use-cases/data-editing/deleteCarInfo.useCase";
import { FirebirdService } from "../../common/helpers/firebird-orm/firebird";
import { CreateOrderUseCase } from "./use-cases/order/createOrder.useCase";
import { DeleteOldRaznKeyUseCase } from "./use-cases/order/deleteOldRaznKey.useCase";
import { UpdateRaznarUseCase } from "./use-cases/order/updateRaznar.useCase";
import { CreateOrderDataForWeekPlanUseCase } from "./use-cases/order/createOrderDataForWeekPlan.useCase";
import { DeleteFlightsUseCase } from "./use-cases/data-editing/deleteFlights.useCase";
import { CreateOrUpdateOtherEquipmentsAndObjectsUseCase } from "./use-cases/data-editing/createOrUpdateOtherEquipmentsAndObjects.useCase";
import { DeleteRaznOdDockKeyUseCase } from "./use-cases/data-editing/deleteRaznOdDockKey.useCase";
import { CreateObjectsAndOtherEquipmentsUseCase } from "./use-cases/data-editing/createObjectsAndOtherEquipments.useCase";
import { UpdateObjectsAndOtherEquipmentsUseCase } from "./use-cases/data-editing/updateObjectsAndOtherEquipments.UseCase";
import { DeleteObjectsAndOtherEquipmentsUseCase } from "./use-cases/data-editing/deleteObjectsAndOtherEquipments.useCase";

const useCases = [
  CreateCarInfoUseCase,
  CreateBillOfLandingUseCase,
  DeleteBillOfLandingUseCase,
  CreateOrderDataUseCase,
  UpdateOrderUseCase,
  UpdateRequestUseCase,
  AddRequestToOrderDataUseCase,
  UpdateCarInfoUseCase,
  DeleteCarInfoUseCase,
  UpdateStaffInfoUseCase,
  UpdateInternShipUseCase,
  UpdateStaffCardUseCase,
  CreateRefuelingCardUseCase,
  UpdateRefuelingCardUseCase,
  DeleteRefuelingCardUseCase,
  CreateAdditionalInformationUseCase,
  ...orderUseCases,
  ...dataEditingUseCases,
  UpdateAdditionalInformationUseCase,
  DeleteAdditionalInformationUseCase,
  UploadImagesUseCase,
  UpdateImageUseCase,
  DeleteImageUseCase,
  CreateOrderUseCase,
  DeleteOldRaznKeyUseCase,
  UpdateRaznarUseCase,
  CreateOrderDataForWeekPlanUseCase,
  DeleteFlightsUseCase,
  CreateOrUpdateOtherEquipmentsAndObjectsUseCase,
  DeleteRaznOdDockKeyUseCase,
  CreateObjectsAndOtherEquipmentsUseCase,
  UpdateObjectsAndOtherEquipmentsUseCase,
  DeleteObjectsAndOtherEquipmentsUseCase,
];
const repositories = [
  OrderQueryRepository,
  CatalogsQueryRepository,
  OrderRepository,
  DataEditingQueryRepository,
  PopUpWindowQueryRepository,
  DataEditingRepository,
];

@Module({
  imports: [CqrsModule, ReportGeneratorModule],
  controllers: [
    OrderController,
    CatalogsController,
    DataEditingController,
    PopUpWindowController,
  ],
  providers: [...useCases, ...repositories, FirebirdService],
})
export class OrderModule {}
