import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GetEquipmentsDto } from "../dto/query.dtos/getEquipments.dto";
import { FlightsQueryRepository } from "../query.repositories/flights.query.repository";
import { FlightsViewModel } from "../models/flights.views/flightsView.model";
import { CreateFlightDto } from "../dto/dtos/flights/createFlight.dto";
import { CommandBus } from "@nestjs/cqrs";
import { CreateEquipmentCommand } from "../use-cases/flights/createEquipment.useCase";
import { Razn_odViewModel } from "../models/flights.views/razn_odView.model";

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
}
