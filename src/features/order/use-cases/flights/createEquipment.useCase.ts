import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FlightsRepository } from "../../repositories/flights.repository";
import { CreateFlightDto } from "../../dto/dtos/flights/createFlight.dto";
import { Razn_odViewModel } from "../../models/flights.views/razn_odView.model";

export class CreateEquipmentCommand {
  constructor(public dto: CreateFlightDto) {}
}

@CommandHandler(CreateEquipmentCommand)
export class CreateEquipmentUseCase
  implements ICommandHandler<CreateEquipmentCommand>
{
  constructor(private readonly flightsRepository: FlightsRepository) {}

  async execute(command: CreateEquipmentCommand): Promise<Razn_odViewModel> {
    return this.flightsRepository.createEquipment(command.dto);
  }
}
