import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { PopUpWindowQueryRepository } from "../query.repositories/popUpWindow.query.repository";
import { EmployeeQueryDto } from "../dto/query.dtos/employe.query.dto";

@ApiTags("Pop-Up-Window")
@Controller("api/pop-up-window")
//@UseGuards(RefreshTokenGuard)
export class PopUpWindowController {
  constructor(private popUpWindowQueryRepository: PopUpWindowQueryRepository) {}

  @Get("equipments")
  async getEquipments() {
    return await this.popUpWindowQueryRepository.getEquipments();
  }

  @Get("employees-second-names")
  async getEmployeesSecondNames(@Query() dto: EmployeeQueryDto) {
    return await this.popUpWindowQueryRepository.getEmployeesSecondNames(dto);
  }

  @Get("customers")
  async getCustomers() {
    return await this.popUpWindowQueryRepository.getCustomers();
  }

  @Get("routes")
  async getRoutes() {
    return await this.popUpWindowQueryRepository.getRoutes();
  }

  @Get("subdivision/:DATA_ID")
  async getSubdivision(@Param("DATA_ID") DATA_ID: string) {
    return await this.popUpWindowQueryRepository.getSubdivions(DATA_ID);
  }

  @Get("categories")
  async getCategories() {
    return await this.popUpWindowQueryRepository.getCategories();
  }
}
