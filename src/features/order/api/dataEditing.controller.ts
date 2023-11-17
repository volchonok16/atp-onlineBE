import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { DataEditingQueryRepository } from "../query.repositories/dataEditing.query.repository";
import { GetCarsInfoSwaggerDecorator } from "../../../common/swagger/order/getCarsInfo.swagger.decorator";
import { CarsInfoInputDto } from "../dto/query.dtos/carInfoInput.dto";
import { CarsInfoViewModel } from "../models/order.views/carsInfoView.model";
import { GetOrganizationsSwaggerDecorator } from "../../../common/swagger/order/getOrganizations.swagger.decorator";
import { OrganizationsInputDto } from "../dto/query.dtos/organizationsInput.dto";
import { OrganizationsViewModel } from "../models/order.views/organizationsView.model";
import { GetOrganizationByIdSwaggerDecorator } from "../../../common/swagger/order/getOrganizationById.swagger.decorator";
import { OrganizationViewModel } from "../models/dataEditing.views/organizationView.model";
import { GetStaffInfoSwaggerDecorator } from "../../../common/swagger/order/getStaffInfo.swagger.decorator";
import { StaffInfoDto } from "../dto/query.dtos/staffInfo.dto";
import { StaffInfoViewModel } from "../models/order.views/staffInfoViewModel";
import { GetRefuelingCardsSwaggerDecorator } from "../../../common/swagger/order/getRefuelingCards.swagger.decorator";
import { StaffRefuelingCardsViewModel } from "../models/order.views/staffRefuelingCardsView.model";
import { GetAdditionalInfoSwaggerDecorator } from "../../../common/swagger/order/getAdditionalInfo.swagger.decorator";
import { StaffAdditionalInfoViewModel } from "../models/order.views/staffAdditionalInfoView.model";
import { GetOrganizationsListSwaggerDecorator } from "../../../common/swagger/order/getOrganizationsList.swagger.decorator";
import { OrganizationsListInputDto } from "../dto/query.dtos/organizationListInput.dto";
import { OrganizationsListViewModel } from "../models/order.views/organizationsListView.model";
import { GetOrganizationSubunitsSwaggerDecorator } from "../../../common/swagger/order/getOrganizationSubunits.swagger.decorator";
import { OrganizationSubunitViewModel } from "../models/order.views/organizationSubunitView.model";
import { GetOrganizationExecutiveSwaggerDecorator } from "../../../common/swagger/order/getOrganizationExecutive.swagger.decorator";
import { OrganizationExecuteViewModel } from "../models/order.views/organizationExecuteView.model";
import { GetOtherEquipmentSwaggerDecorator } from "../../../common/swagger/order/getOtherEquipment.swagger.decorator";
import { OtherEquipmentViewModel } from "../models/order.views/otherEquipmentView.model";
import { GetEquipmentDocsSwaggerDecorator } from "../../../common/swagger/order/getEquipmentDocs.swagger.decorator";
import { EquipmentsDocViewModel } from "../models/order.views/equipmentsDocView.model";
import { GetFlightsSwaggerDecorator } from "../../../common/swagger/order/getFlights.swagger.decorator";
import { FlightsDto } from "../dto/query.dtos/flights.dto";
import { FlightsViewModel } from "../models/order.views/flightsView.model";
import { OrganizationDto } from "../dto/dtos/data-editing/organizationDto";
import { CreateOrganizationCommand } from "../use-cases/data-editing/createOrganization.useCase";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCarInfoCommand } from "../use-cases/data-editing/createCarInfo.useCase";
import { UpdateCarInfoCommand } from "../use-cases/data-editing/updateCarInfo.useCase";
import { DeleteCarInfoCommand } from "../use-cases/data-editing/deleteCarInfo.useCase";
import { CarInfoDto } from "../dto/dtos/carInfo.dto";
import { UpdateStaffInfoDto } from "../dto/dtos/updateStaffInfo.dto";
import { UpdateStaffInfoCommand } from "../use-cases/data-editing/updateStaffInfo.useCase";
import { UpdateInternshipCommand } from "../use-cases/data-editing/updateInternship.useCase";
import { UpdateStaffCardDto } from "../dto/dtos/updateStaffCard.dto";
import { UpdateStaffCardCommand } from "../use-cases/data-editing/updateStaffCard.useCase";
import { CreateRefuelingCardCommand } from "../use-cases/data-editing/createRefuelingCard.useCase";
import { CreateRefuelingCardDto } from "../dto/dtos/createRefuelingCard.dto";
import { UpdateRefuelingCardDto } from "../dto/dtos/updateRefuelingCard.dto";
import { UpdateRefuelingCardCommand } from "../use-cases/data-editing/updateRefuelingCard.useCase";
import { DeleteRefuelingCardCommand } from "../use-cases/data-editing/deleteRefuelingCard.useCase";
import { CreateAdditionalInformationCommand } from "../use-cases/data-editing/createAdditionalInformation.useCase";
import { CreateAdditionalInformationDto } from "../dto/dtos/createAdditionalInformation.dto";
import { DeleteOrganizationCommand } from "../use-cases/data-editing/deleteOrganization.useCase";
import { SubunitDto } from "../dto/dtos/data-editing/subunit.dto";
import { SubunitViewModel } from "../models/dataEditing.views/subunitView.model";
import { CreateSubunitCommand } from "../use-cases/data-editing/createSubunit.useCase";
import { UpdateAdditionalInformationDto } from "../dto/dtos/updateAdditionalInformation.dto";
import { UpdateAdditionalInformationCommand } from "../use-cases/data-editing/updateAdditionalInformation.useCase";
import { DeleteAdditionalInformationCommand } from "../use-cases/data-editing/deleteAdditionalInformation.useCase";
import { UploadImagesCommand } from "../use-cases/data-editing/uploadImage.useCase";
import { UploadImagesArrayDto } from "../dto/dtos/uploadImagesArray.dto";
import { UpdateImageDto } from "../dto/dtos/updateImage.dto";
import { UpdateImageCommand } from "../use-cases/data-editing/updateImage.useCase";
import { UpdateCarInfoDto } from "../dto/dtos/updateCarInfo.dto";
import { DeleteImageCommand } from "../use-cases/data-editing/deleteImage.useCase";
import { DeleteSubunitCommand } from "../use-cases/data-editing/deleteSubunit.useCase";
import { NoteViewModel } from "../models/dataEditing.views/noteView.model";
import { CreateNoteCommand } from "../use-cases/data-editing/createNote.useCase";
import { NoteDto } from "../dto/dtos/data-editing/note.dto";
import { DeleteNoteCommand } from "../use-cases/data-editing/deleteNote.useCase";
import { PriceViewModel } from "../models/dataEditing.views/priceViewModel";
import { PriceDto } from "../dto/dtos/data-editing/price.dto";
import { CreateOrUpdatePriceCommand } from "../use-cases/data-editing/createOrUpdatePriceUseCase";
import { DeletePriceCommand } from "../use-cases/data-editing/deletePrice.useCase";
import { ArchiveOrNotArchiveQuery } from "../dto/query.dtos/noteQuery.dto";
import { DeleteFlightsCommand } from "../use-cases/data-editing/deleteFlights.useCase";
import { CreateOtherEquipmentsAndObjectsForTableDocsDto } from "../dto/dtos/data-editing/createOtherEquipmentsAndObjectsForTableDocs.dto";
import { DeleteRaznOdDockKeyCommand } from "../use-cases/data-editing/deleteRaznOdDockKey.useCase";
import { RaznOdDocsViewModel } from "../models/dataEditing.views/raznOdDocsView.model";
import { SkladObjSpisViewModel } from "../models/dataEditing.views/skladObjSpisView.model";
import { CreateObjectsAndOtherEquipmentsCommand } from "../use-cases/data-editing/createObjectsAndOtherEquipments.useCase";
import { CreateOtherEquipmentsAndObjectsDto } from "../dto/dtos/data-editing/createOtherEquipmentsAndObjects.dto";
import { SkladObjSpisKeyViewModel } from "../models/dataEditing.views/skladObjSpisKeyView.model";
import { UpdateObjectsAndOtherEquipmentsCommand } from "../use-cases/data-editing/updateObjectsAndOtherEquipments.UseCase";
import { DeleteObjectsAndOtherEquipmentsCommand } from "../use-cases/data-editing/deleteObjectsAndOtherEquipments.useCase";
import { CreateOtherEquipmentsAndObjectsCommand } from "../use-cases/data-editing/createOtherEquipmentsAndObjectsUseCase";
import { UpdateOtherEquipmentsAndObjectsCommand } from "../use-cases/data-editing/updateOtherEquipmentsAndObjects.useCase";
import { UpdateOtherEquipmentsAndObjectsForTableDocsDto } from "../dto/dtos/data-editing/updateOtherEquipmentsAndObjectsForTableDocs.dto";

@ApiTags("Data-editing")
//@UseGuards(RefreshTokenGuard)
@Controller("api/data-editing")
export class DataEditingController {
  constructor(
    private dataEditingQueryRepository: DataEditingQueryRepository,
    private commandBus: CommandBus
  ) {}

  @Get("cars-info")
  @ApiOperation({
    summary: "Редактирование общих данных -> Данные по машинам",
  })
  @GetCarsInfoSwaggerDecorator()
  async getCarsInfo(
    @Query() queryCarInfoDto: CarsInfoInputDto
  ): Promise<CarsInfoViewModel[]> {
    return this.dataEditingQueryRepository.getCarsInfo(queryCarInfoDto);
  }

  @Post("cars-info")
  @ApiOperation({
    summary: "Редактирование общих данных -> Данные по машинам",
  })
  @ApiBody({ type: CarInfoDto })
  async createCarInfoById(@Body() data: any) {
    const dto = CarInfoDto.dto(data);
    return await this.commandBus.execute(new CreateCarInfoCommand(dto));
  }

  @Put("cars-info/:OD_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Данные по машинам",
  })
  @ApiBody({ type: UpdateCarInfoDto })
  async updateCarInfoById(@Param("OD_KEY") id: number, @Body() data: any) {
    const dto = UpdateCarInfoDto.dto(data);
    return await this.commandBus.execute(
      new UpdateCarInfoCommand({ id, ...dto })
    );
  }

  @Delete("cars-info/:OD_KEY")
  async deleteCarInfoById(@Param("OD_KEY") id: number): Promise<boolean> {
    return await this.commandBus.execute(new DeleteCarInfoCommand(id));
  }

  @Get("organizations")
  @GetOrganizationsSwaggerDecorator()
  async getOrganizations(
    @Query() dto: OrganizationsInputDto
  ): Promise<OrganizationsViewModel[]> {
    return this.dataEditingQueryRepository.getOrganizations(dto);
  }

  @Get("organizations/:id")
  @GetOrganizationByIdSwaggerDecorator()
  async getOrganizationById(
    @Param("id", new ParseIntPipe()) organizationId: number
  ): Promise<OrganizationViewModel> {
    const organization =
      await this.dataEditingQueryRepository.getOrganizationById(organizationId);
    if (!organization)
      throw new NotFoundException(
        "The additional information about the organization not found"
      );
    return organization;
  }

  @Get("staff-info")
  @GetStaffInfoSwaggerDecorator()
  async getStaffInfo(
    @Query() dto: StaffInfoDto
  ): Promise<StaffInfoViewModel[]> {
    return this.dataEditingQueryRepository.getStaffInfo(dto);
  }

  @Put("staff-info/:FIO_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Список персонала ",
  })
  @ApiBody({ type: UpdateStaffInfoDto })
  async updateStaffInfoById(
    @Param("FIO_KEY") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateStaffInfoDto.dto(data);
    return this.commandBus.execute(new UpdateStaffInfoCommand({ id, ...dto }));
  }

  @Put("staff-info/:FIO_KEY/internship")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Период стажировки",
    description: "Пустое бд, проверка SELECT * FROM FIO_STAGIROVKA ",
  })
  @ApiBody({ type: UpdateStaffInfoDto })
  async updateInternshipById(
    @Param("FIO_ID") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateStaffInfoDto.dto(data);
    return this.commandBus.execute(new UpdateInternshipCommand({ id, ...dto }));
  }

  @Put("staff-info/:FIO_KEY/staff-card")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Карточка сотрудника",
  })
  @ApiBody({ type: UpdateStaffCardDto })
  async updateStaffCardById(
    @Param("FIO_KEY") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateStaffCardDto.dto(data);
    return this.commandBus.execute(new UpdateStaffCardCommand({ id, ...dto }));
  }

  @Get("staff-info/:id/refueling-cards")
  @GetRefuelingCardsSwaggerDecorator()
  async getRefuelingCardsById(
    @Param("id", new ParseIntPipe()) staffInfoId: number
  ): Promise<StaffRefuelingCardsViewModel> {
    const staffInfo =
      await this.dataEditingQueryRepository.getRefuelingCardsById(staffInfoId);
    if (!staffInfo)
      throw new NotFoundException(
        "The refueling cards of this staff not found"
      );
    return staffInfo;
  }

  @Post("staff-info/:FIO_ID/refueling-cards")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Заправочные карты",
  })
  @ApiBody({ type: CreateRefuelingCardDto })
  async createRefuelingCardById(
    @Param("FIO_ID") id: number,
    @Body() data: any
  ) {
    const dto = CreateRefuelingCardDto.dto(data);
    return await this.commandBus.execute(
      new CreateRefuelingCardCommand({ id, ...dto })
    );
  }

  @Put("staff-info/:FIO_KEY/refueling-cards")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Период стажировки",
  })
  @ApiBody({ type: UpdateRefuelingCardDto })
  async updateRefuelingCardById(
    @Param("FIO_KEY") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateRefuelingCardDto.dto(data);
    return await this.commandBus.execute(
      new UpdateRefuelingCardCommand({ id, ...dto })
    );
  }

  @Delete("staff-info/:FIO_ZAPR_CARDS_KEY/refueling-cards")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Период стажировки",
  })
  async deleteRefuelingCardById(
    @Param("FIO_ZAPR_CARDS_KEY") id: number
  ): Promise<boolean> {
    return await this.commandBus.execute(new DeleteRefuelingCardCommand(id));
  }

  @Get("staff-info/:id/additional-information")
  @GetAdditionalInfoSwaggerDecorator()
  async getAdditionalInformationById(
    @Param("id", new ParseIntPipe()) staffInfoId: number
  ): Promise<StaffAdditionalInfoViewModel> {
    const staffInfo =
      await this.dataEditingQueryRepository.getAdditionalInformationById(
        staffInfoId
      );
    if (!staffInfo)
      throw new NotFoundException(
        "The additional information about this staff not found"
      );
    return staffInfo;
  }

  @Post("staff-info/:FIO_ID/additional-information")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Дополнительная информация",
  })
  async createAdditionalInformationById(
    @Param("FIO_ID") id: number,
    @Body() dto: CreateAdditionalInformationDto
  ) {
    return await this.commandBus.execute(
      new CreateAdditionalInformationCommand({ id, ...dto })
    );
  }

  @Put("staff-info/:FIO_DOCS_KEY/additional-information")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Дополнительная информация",
  })
  async updateAdditionalInformationById(
    @Param("FIO_DOCS_KEY") id: number,
    @Body() data: any
  ) {
    const dto = UpdateAdditionalInformationDto.dto(data);
    return await this.commandBus.execute(
      new UpdateAdditionalInformationCommand({ id, ...dto })
    );
  }

  @Delete("staff-info/:FIO_DOCS_KEY/additional-information")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Дополнительная информация",
  })
  async deleteAdditionalInformationById(
    @Param("FIO_DOCS_KEY") id: number
  ): Promise<boolean> {
    return await this.commandBus.execute(
      new DeleteAdditionalInformationCommand(id)
    );
  }

  @Put("staff-info/files/working-with-files/:FILES_KEY/save")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Файлы -> Работа с файлами -> Сохранить",
  })
  async updateImage(
    @Param("FILES_KEY") id: number,
    @Body() data: any
  ): Promise<boolean> {
    const dto = UpdateImageDto.dto(data);
    return await this.commandBus.execute(
      new UpdateImageCommand({ id, ...dto })
    );
  }

  @Get("staff-info/files/working-with-files/:FILES_KEY/look")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Файлы -> Работа с файлами -> Просмотреть",
  })
  async getImage(@Param("FILES_KEY") id: number) {
    return await this.dataEditingQueryRepository.getImage(id);
  }

  @Post("staff-info/files/upload-images/:FILES_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Файлы -> Загрузить изображения ???",
  })
  async uploadImages(@Body() dtoArray: UploadImagesArrayDto): Promise<boolean> {
    return await this.commandBus.execute(new UploadImagesCommand(dtoArray));
  }

  @Delete("staff-info/files/working-with-files/:FILES_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список персонала -> Файлы -> Удалить",
  })
  async deleteImage(@Param("FILES_KEY") id: number): Promise<boolean> {
    return await this.commandBus.execute(new DeleteImageCommand(id));
  }

  @Get("organizations-list")
  @GetOrganizationsListSwaggerDecorator()
  async getOrganizationList(
    @Query() dto: OrganizationsListInputDto
  ): Promise<OrganizationsListViewModel[]> {
    return this.dataEditingQueryRepository.getOrganizationList(dto);
  }

  @Get("organizations-list/:organizationId/subunits")
  @GetOrganizationSubunitsSwaggerDecorator()
  async getOrganizationSubunits(
    @Param("organizationId", new ParseIntPipe()) organizationId: number
  ): Promise<OrganizationSubunitViewModel[]> {
    //check organization by id(does it exist)
    const organization =
      await this.dataEditingQueryRepository.getOrganizationById(organizationId);
    if (!organization)
      throw new BadRequestException("This organization doesn`t exist");
    //find organization subunit by organization id
    return this.dataEditingQueryRepository.getOrganizationSubunits(
      organizationId
    );
  }

  @Get("organizations-list/:organizationId/executive")
  @GetOrganizationExecutiveSwaggerDecorator()
  @ApiProperty({ description: "Бд пустое, проверка SELECT * FROM DATA_FIO" })
  async getOrganizationExecutive(
    @Param("organizationId", new ParseIntPipe()) organizationId: number
  ): Promise<OrganizationExecuteViewModel[]> {
    //check organization by id(does it exist)
    const organization =
      await this.dataEditingQueryRepository.getOrganizationById(organizationId);
    if (!organization)
      throw new BadRequestException("This organization doesn`t exist");
    //find executive by organization id
    return this.dataEditingQueryRepository.getOrganizationExecutive(
      organizationId
    );
  }

  @Get("other-equipment")
  @GetOtherEquipmentSwaggerDecorator()
  async getOtherEquipment(): Promise<OtherEquipmentViewModel[]> {
    return this.dataEditingQueryRepository.getOtherEquipment();
  }

  @Get("other-equipment/:id")
  @ApiProperty({
    description: "Бд пустое, проверка: SELECT * FROM RAZN_OD_DOCS",
  })
  @GetEquipmentDocsSwaggerDecorator()
  async getEquipmentDocs(
    @Param("id", new ParseIntPipe()) equipmentId: number
  ): Promise<EquipmentsDocViewModel[]> {
    const equipment = await this.dataEditingQueryRepository.getEquipmentById(
      equipmentId
    );
    if (!equipment)
      throw new BadRequestException("the equipment with this id not found");
    return this.dataEditingQueryRepository.getEquipmentDocs(equipmentId);
  }

  @Get("flights")
  @GetFlightsSwaggerDecorator()
  async getFlights(@Query() dto: FlightsDto): Promise<FlightsViewModel[]> {
    return this.dataEditingQueryRepository.getFlights(dto);
  }

  @Post("organizations-list")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список организаций (создание и обновление)",
  })
  @ApiBody({ type: OrganizationDto })
  async createOrUpdateOrganization(
    @Body() data: any
  ): Promise<OrganizationViewModel> {
    const dto = OrganizationDto.dto(data);
    return this.commandBus.execute(new CreateOrganizationCommand(dto));
  }

  // @Put('organizations-list/:DATA_KEY')
  // async updateOrganization(
  //   @Body() dto: OrganizationDto,
  //   @Param('DATA_KEY') id: number,
  // ): Promise<boolean> {
  //   return this.commandBus.execute(
  //     new UpdateOrganizationCommand({ id, ...dto }),
  //   );
  // }

  @Delete("organizations-list/:DATA_KEY")
  async deleteOrganization(@Param("DATA_KEY") id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteOrganizationCommand(id));
  }

  @Post("organizations-list/:DATA_KEY/subunits")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список организаций -> Подразделения (создание и обновление)",
  })
  @ApiBody({ type: SubunitDto })
  async createOrUpdateSubunit(
    @Body() data: any,
    @Param("DATA_KEY") id: number
  ): Promise<SubunitViewModel | boolean> {
    const dto = SubunitDto.dto(data);
    return this.commandBus.execute(new CreateSubunitCommand({ id, ...dto }));
  }

  // @Put('organizations-list/subunits/:DATA_PODR_KEY')
  // async updateSubunit(
  //   @Body() dto: SubunitDto,
  //   @Param('DATA_PODR_KEY') id: number,
  // ): Promise<boolean> {
  //   return this.commandBus.execute(new UpdateSubunitCommand({ id, ...dto }));
  // }

  @Delete("organizations-list/subunits/:DATA_PODR_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список организаций -> Подразделения",
  })
  async deleteSubunit(@Param("DATA_PODR_KEY") id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteSubunitCommand(id));
  }

  @Get("organizations-list/note/:DATA_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Список организаций -> Примечание",
  })
  @ApiProperty({
    description: "Бд пустое, проверка: SELECT * FROM DATA_PRIM",
  })
  async getNote(
    @Param("DATA_KEY") id: number,
    @Query() query: ArchiveOrNotArchiveQuery
  ): Promise<NoteViewModel[]> {
    const isExists = await this.dataEditingQueryRepository.organizationExists(
      id
    );
    if (!isExists) throw new NotFoundException();
    return this.dataEditingQueryRepository.getNote({ id, ...query });
  }

  @Post("organizations-list/note")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список организаций -> Примечание (создание и обновление)",
  })
  @ApiBody({ type: NoteDto })
  async createOrUpdateNote(@Body() data: any): Promise<NoteViewModel> {
    const dto = NoteDto.dto(data);
    return this.commandBus.execute(new CreateNoteCommand(dto));
  }

  @Delete("organizations-list/note/:DATA_PRIM_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Список организаций -> Примечание",
  })
  async deleteNote(@Param("DATA_PRIM_KEY") id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteNoteCommand(id));
  }

  @Get("organizations-list/prices/:DATA_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Список организаций -> Цены",
    description: "БД пустое, проверка: SELECT * FROM DATA_CENA",
  })
  async getPrices(@Param("DATA_KEY") id: number): Promise<PriceViewModel[]> {
    const isExists = await this.dataEditingQueryRepository.organizationExists(
      id
    );
    if (!isExists) throw new NotFoundException();
    return this.dataEditingQueryRepository.getPrices(id);
  }

  @Post("organizations-list/prices")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Список организаций -> Цены (создание и обновление)",
  })
  @ApiBody({ type: PriceDto })
  async createOrUpdatePrice(@Body() data: any): Promise<PriceViewModel> {
    const dto = PriceDto.dto(data);
    return this.commandBus.execute(new CreateOrUpdatePriceCommand(dto));
  }

  @Delete("organizations-list/prices/:DATA_CENA_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Список организаций -> Цены",
  })
  async deletePrice(@Param("DATA_CENA_KEY") id: number): Promise<boolean> {
    return this.commandBus.execute(new DeletePriceCommand(id));
  }

  @Delete("flights/:RAZN_OD_KEY")
  @ApiOperation({
    summary: "Редактирование общих данных -> Рейсы",
  })
  async deleteFlights(@Param("RAZN_OD_KEY") id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteFlightsCommand(id));
  }

  @Get("other-equipments/docs/:SKLAD_OBJ_SPIS_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Таблица документы",
  })
  async getOtherEquipments(
    @Param("SKLAD_OBJ_SPIS_KEY") id: number
  ): Promise<RaznOdDocsViewModel> {
    return this.dataEditingQueryRepository.getDocs(id);
  }

  @Post("other-equipments/docs")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Таблица документы",
  })
  async createEquipmentsAndObjects(
    @Body() data: CreateOtherEquipmentsAndObjectsForTableDocsDto
  ): Promise<boolean> {
    return this.commandBus.execute(
      new CreateOtherEquipmentsAndObjectsCommand(data)
    );
  }

  @Put("other-equipments/docs")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Таблица документы",
  })
  async updateEquipmentsAndObjects(
    @Body() data: UpdateOtherEquipmentsAndObjectsForTableDocsDto
  ): Promise<boolean> {
    return this.commandBus.execute(
      new UpdateOtherEquipmentsAndObjectsCommand(data)
    );
  }

  @Delete("other-equipments/docs/:OLD_RAZN_OD_DOCS_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Таблица документы",
  })
  async deleteRaznOdDockKey(
    @Param("OLD_RAZN_OD_DOCS_KEY") id: number
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteRaznOdDockKeyCommand(id));
  }

  @Get("other-equipments/objects-equipments")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Объекты и иная техника",
  })
  async getObjectsAndOtherEquipments(): Promise<SkladObjSpisViewModel> {
    return this.dataEditingQueryRepository.getObjectsAndOtherEquipments();
  }

  @Post("other-equipments/objects-equipments")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Объекты и иная техника",
  })
  async createObjectsAndOtherEquipments(
    @Body() dto: CreateOtherEquipmentsAndObjectsDto
  ): Promise<SkladObjSpisKeyViewModel> {
    return this.commandBus.execute(
      new CreateObjectsAndOtherEquipmentsCommand(dto)
    );
  }

  @Put("other-equipments/objects-equipments/:SKLAD_OBJ_SPIS_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Объекты и иная техника",
  })
  async updateObjectsAndOtherEquipments(
    @Param("SKLAD_OBJ_SPIS_KEY") id: number,
    @Body() body: CreateOtherEquipmentsAndObjectsDto
  ): Promise<boolean> {
    return this.commandBus.execute(
      new UpdateObjectsAndOtherEquipmentsCommand(id, body)
    );
  }

  @Delete("other-equipments/objects-equipments/:SKLAD_OBJ_SPIS_KEY")
  @ApiOperation({
    summary:
      "Редактирование общих данных -> Иная техника и объекты -> Объекты и иная техника",
  })
  async deleteObjectsAndOtherEquipments(
    @Param("SKLAD_OBJ_SPIS_KEY") id: number
  ): Promise<boolean> {
    return this.commandBus.execute(
      new DeleteObjectsAndOtherEquipmentsCommand(id)
    );
  }
}
