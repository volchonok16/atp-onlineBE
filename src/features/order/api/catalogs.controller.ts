import { ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { CatalogsQueryRepository } from "../query.repositories/catalogs.query.repository";
import { EquipmentListDto } from "../dto/query.dtos/equipmentList.dto";
import { EquipmentListViewModel } from "../models/catalogs.views/equipmentListView.model";
import { GetEquipmentListSwaggerDecorator } from "../../../common/swagger/catalogs/getEquipmentList.swagger.decorator";
import { ExtendedInfoDto } from "../dto/query.dtos/extendedInfo.dto";
import { ExtendedInformationViewModel } from "../models/catalogs.views/extendedInformationView.model";
import { GetExtendedInfoSwaggerDecorator } from "../../../common/swagger/catalogs/getExtendedInfo.swagger.decorator";
import { DirectoriesMechanismTypesViewModel } from "../models/catalogs.views/directoriesMechanismTypesView.model";
import { DirectoriesNotesViewModel } from "../models/catalogs.views/directoriesNotesView.model";
import { DirectoriesAddressesViewModel } from "../models/catalogs.views/directoriesAddressesView.model";
import { DirectoriesGoodsTypeViewModel } from "../models/catalogs.views/directoriesGoodsTypeView.model";
import { DirectoriesTransportationTypeViewModel } from "../models/catalogs.views/directoriesTransportationTypeView.model";
import { DirectoriesCommunicationTypeViewModel } from "../models/catalogs.views/directoriesCommunicationTypeView.model";
import { GetDirectoriesMechanismTypesSwaggerDecorator } from "../../../common/swagger/catalogs/getDirectoriesMechanismTypes.swagger.decorator";
import { GetDirectoriesNotesSwaggerDecorator } from "../../../common/swagger/catalogs/getDirectoriesNotes.swagger.decorator";
import { GetDirectoriesAddressesSwaggerDecorator } from "../../../common/swagger/catalogs/getDirectoriesAddresses.swagger.decorator";
import { GetDirectoriesGoodsTypeSwaggerDecorator } from "../../../common/swagger/catalogs/getDirectoriesGoodsType.swagger.decorator";
import { GetDirectoriesTransportationTypeSwaggerDecorator } from "../../../common/swagger/catalogs/getDirectoriesTransportationType.swagger.decorator";
import { GetDirectoriesCommunicationTypeSwaggerDecorator } from "../../../common/swagger/catalogs/getDirectoriesCommunicationType.swagger.decorator";
import { RelatedDataViewModel } from "../models/catalogs.views/relatedDataView.model";
import { GetRelatedDataByIdSwaggerDecorator } from "../../../common/swagger/catalogs/getRelatedDataById.swagger.decorator";
import { TechnicalCharacteristicViewModel } from "../models/catalogs.views/technicalCharacteristicView.model";
import { GetTechnicalCharacteristicByIdSwaggerDecorator } from "../../../common/swagger/catalogs/getTechnicalCharacteristicById.swagger.decorator";
import { DocumentationByIdViewModel } from "../models/catalogs.views/documentationByIdView.model";
import { GetDocumentationByIdSwaggerDecorator } from "../../../common/swagger/catalogs/getDocumentationById.swagger.decorator";
import { DocumentationTimingControlViewModel } from "../models/catalogs.views/documentationTimingControlView.model";
import { GetDocumentationTimingControlSwaggerDecorator } from "../../../common/swagger/catalogs/getDocumentationTimingControl.swagger.decorator";
import { DocumentationRefuelingCardsByIdViewModel } from "../models/catalogs.views/documentationRefuelingCardsByIdView.model";
import { GetDocumentationRefuelingCardsByIdSwaggerDecorator } from "../../../common/swagger/catalogs/getDocumentationRefuelingCardsById.swagger.decorator";
import { AdditionalInfoNotInDemandViewModel } from "../models/catalogs.views/additionalInfoNotInDemandView.model";
import { GetAdditionalInfoNotInDemandSwaggerDecorator } from "../../../common/swagger/catalogs/getAdditionalInfoNotInDemand.swagger.decorator";
import { AdditionalInfoConservationViewModel } from "../models/catalogs.views/additionalInfoConservationView.model";
import { GetAdditionalInfoConservationSwaggerDecorator } from "../../../common/swagger/catalogs/getAdditionalInfoConservation.swagger.decorator";
import { PassesViewModel } from "../models/catalogs.views/passesView.model";
import { GetPassesSwaggerDecorator } from "../../../common/swagger/catalogs/getPasses.swagger.decorator";
import { DriverHoldingViewModel } from "../models/catalogs.views/driverHoldingView.model";
import { GetDriverHoldingSwaggerDecorator } from "../../../common/swagger/catalogs/getDriverHolding.swagger.decorator";
import { CarEquipmentViewModel } from "../models/catalogs.views/carEquipmentView.model";
import { GetCarEquipmentSwaggerDecorator } from "../../../common/swagger/catalogs/getCarEquipment.swagger.decorator";
import { AcquisitionActViewModel } from "../models/catalogs.views/acquisitionActView.model";
import { GetAcquisitionActsSwaggerDecorator } from "../../../common/swagger/catalogs/getAcquisitionActs.swagger.decorator";

@ApiTags("Catalogs")
@Controller("api/catalogs")
//@UseGuards(RefreshTokenGuard)
export class CatalogsController {
  constructor(
    private readonly catalogsQueryRepository: CatalogsQueryRepository
  ) {}

  @Get("equipment-list")
  @GetEquipmentListSwaggerDecorator()
  async getEquipmentList(
    @Query() dto: EquipmentListDto
  ): Promise<EquipmentListViewModel[]> {
    return this.catalogsQueryRepository.getEquipmentList(dto);
  }

  @Get("extended-information")
  @GetExtendedInfoSwaggerDecorator()
  async getExtendedInfo(
    @Query() dto: ExtendedInfoDto
  ): Promise<ExtendedInformationViewModel[]> {
    return this.catalogsQueryRepository.getExtendedInfo(dto);
  }

  @Get("extended-information/:id/related-data")
  @GetRelatedDataByIdSwaggerDecorator()
  async getRelatedDataById(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<RelatedDataViewModel> {
    const relatedData = await this.catalogsQueryRepository.getRelatedDataById(
      extendedInfoId
    );
    if (!relatedData) throw new NotFoundException("No information for this id");
    return relatedData;
  }

  @Get("extended-information/:id/technical-characteristic")
  @GetTechnicalCharacteristicByIdSwaggerDecorator()
  async getTechnicalCharacteristicById(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<TechnicalCharacteristicViewModel> {
    const technicalCharacteristic =
      await this.catalogsQueryRepository.getTechnicalCharacteristicById(
        extendedInfoId
      );
    if (!technicalCharacteristic)
      throw new NotFoundException("No information for this id");
    return technicalCharacteristic;
  }

  @Get("extended-information/:id/documentation")
  @GetDocumentationByIdSwaggerDecorator()
  async getDocumentationById(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<DocumentationByIdViewModel> {
    const documentation =
      await this.catalogsQueryRepository.getDocumentationById(extendedInfoId);
    if (!documentation)
      throw new NotFoundException("No information for this id");
    return documentation;
  }

  @Get("extended-information/:id/documentation/timing-control")
  @GetDocumentationTimingControlSwaggerDecorator()
  async getTimingById(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<DocumentationTimingControlViewModel[]> {
    return this.catalogsQueryRepository.getTimingById(extendedInfoId);
  }

  @Get("extended-information/:id/documentation/refueling-cards")
  @GetDocumentationRefuelingCardsByIdSwaggerDecorator()
  async getRefuelingCardsById(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<DocumentationRefuelingCardsByIdViewModel[]> {
    return this.catalogsQueryRepository.getRefuelingCardsById(extendedInfoId);
  }

  @Get("extended-information/:id/additional-info/not-in-demand")
  @GetAdditionalInfoNotInDemandSwaggerDecorator()
  async getNotInDemandInfo(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<AdditionalInfoNotInDemandViewModel[]> {
    return this.catalogsQueryRepository.getNotInDemandInfo(extendedInfoId);
  }

  @Get("extended-information/:id/additional-info/conservation")
  @GetAdditionalInfoConservationSwaggerDecorator()
  async getConservation(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<AdditionalInfoConservationViewModel[]> {
    return this.catalogsQueryRepository.getConservation(extendedInfoId);
  }

  @Get("extended-information/:id/passes")
  @GetPassesSwaggerDecorator()
  async getPasses(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<PassesViewModel[]> {
    return this.catalogsQueryRepository.getPasses(extendedInfoId);
  }

  @Get("extended-information/:id/driver-holding")
  @GetDriverHoldingSwaggerDecorator()
  async getDriverHolding(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<DriverHoldingViewModel[]> {
    return this.catalogsQueryRepository.getDriverHolding(extendedInfoId);
  }

  @Get("extended-information/:id/car-equipment")
  @GetCarEquipmentSwaggerDecorator()
  async getCarEquipment(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<CarEquipmentViewModel[]> {
    return this.catalogsQueryRepository.getCarEquipment(extendedInfoId);
  }

  @Get("extended-information/:id/car-equipment/acquisition-acts")
  @GetAcquisitionActsSwaggerDecorator()
  async getAcquisitionActs(
    @Param("id", new ParseIntPipe()) extendedInfoId: number
  ): Promise<AcquisitionActViewModel[]> {
    return this.catalogsQueryRepository.getAcquisitionActs(extendedInfoId);
  }

  @Get("directories/mechanism-types")
  @GetDirectoriesMechanismTypesSwaggerDecorator()
  async getMechanismTypes(): Promise<DirectoriesMechanismTypesViewModel[]> {
    return this.catalogsQueryRepository.getMechanismTypes();
  }

  @Get("directories/notes")
  @GetDirectoriesNotesSwaggerDecorator()
  async getNotes(): Promise<DirectoriesNotesViewModel[]> {
    return this.catalogsQueryRepository.getNotes();
  }

  @Get("directories/loading-unloading-addresses")
  @GetDirectoriesAddressesSwaggerDecorator()
  async getAddresses(): Promise<DirectoriesAddressesViewModel[]> {
    return this.catalogsQueryRepository.getAddresses();
  }

  @Get("directories/goods-types")
  @GetDirectoriesGoodsTypeSwaggerDecorator()
  async getGoodsType(): Promise<DirectoriesGoodsTypeViewModel[]> {
    return this.catalogsQueryRepository.getGoodsType();
  }

  @Get("directories/transportation-types")
  @GetDirectoriesTransportationTypeSwaggerDecorator()
  async getTransportationType(): Promise<
    DirectoriesTransportationTypeViewModel[]
  > {
    return this.catalogsQueryRepository.getTransportationType();
  }

  @Get("directories/communication-types")
  @GetDirectoriesCommunicationTypeSwaggerDecorator()
  async getCommunicationType(): Promise<
    DirectoriesCommunicationTypeViewModel[]
  > {
    return this.catalogsQueryRepository.getCommunicationType();
  }
}
