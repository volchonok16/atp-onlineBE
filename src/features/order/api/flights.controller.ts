import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
import { GetEquipmentsDto } from "../dto/query.dtos/getEquipments.dto";
import { FlightsQueryRepository } from "../query.repositories/flights.query.repository";
import { FlightsViewModel } from "../models/flights.views/flightsView.model";
import { CreateFlightDto } from "../dto/dtos/flights/createFlight.dto";
import { CommandBus } from "@nestjs/cqrs";
import { CreateEquipmentCommand } from "../use-cases/flights/createEquipment.useCase";
import { Razn_odViewModel } from "../models/flights.views/razn_odView.model";
import { UpdateFlightsDto } from "../dto/dtos/flights/updateFlights.dto";
import { UpdateEquipmentCommand } from "../use-cases/flights/updateEquipment.useCase";
import { DeleteEquipmentCommand } from "../use-cases/flights/deleteEquipment.useCase";

@ApiTags("Flights")
@Controller("api/flights")
export class FlightsController {
  constructor(
    private readonly flightsQueryRepository: FlightsQueryRepository,
    private readonly commandBus: CommandBus
  ) {}

  @Get("equipments")
  @ApiOperation({
    summary: "Рейсы +",
  })
  async getEquipments(
    @Query() query: GetEquipmentsDto
  ): Promise<FlightsViewModel[]> {
    return this.flightsQueryRepository.getFlights(query);
  }

  @Post("equipments")
  @ApiOperation({
    summary: "Рейсы +",
  })
  async createEquipment(
    @Body() dto: CreateFlightDto
  ): Promise<Razn_odViewModel> {
    return this.commandBus.execute(new CreateEquipmentCommand(dto));
  }

  @Put("equipments/:OLD_RAZN_OD_KEY")
  @ApiOperation({
    summary: "Рейсы +",
  })
  async updateEquipment(
    @Param("OLD_RAZN_OD_KEY") id: number,
    @Body() dto: UpdateFlightsDto
  ): Promise<boolean> {
    return this.commandBus.execute(new UpdateEquipmentCommand(id, dto));
  }

  @Delete("equipments/:OLD_RAZN_OD_KEY")
  @ApiOperation({
    summary: "Рейсы +",
  })
  async deleteEquipment(
    @Param("OLD_RAZN_OD_KEY") id: number
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteEquipmentCommand(id));
  }
}
