import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateFlightsDto } from "../../dto/dtos/flights/updateFlights.dto";
import { FlightsRepository } from "../../repositories/flights.repository";
import { FlightsQueryRepository } from "../../query.repositories/flights.query.repository";
import { NotFoundException } from "@nestjs/common";

export class UpdateEquipmentCommand {
  constructor(public id: number, public dto: UpdateFlightsDto) {}
}

@CommandHandler(UpdateEquipmentCommand)
export class UpdateEquipmentUseCase
  implements ICommandHandler<UpdateEquipmentCommand>
{
  constructor(
    private readonly flightsRepository: FlightsRepository,
    private readonly flightsQueryRepository: FlightsQueryRepository
  ) {}

  async execute(command: UpdateEquipmentCommand): Promise<boolean> {
    const result = await this.flightsQueryRepository.checkRaznOdKeyInRaznOd(
      command.id
    );
    if (!result) throw new NotFoundException();
    return this.flightsRepository.updateEquipment(command.id, command.dto);
  }
}
