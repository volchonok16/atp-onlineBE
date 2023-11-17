import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FlightsRepository } from "../../repositories/flights.repository";
import { FlightsQueryRepository } from "../../query.repositories/flights.query.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteEquipmentCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteEquipmentCommand)
export class DeleteEquipmentUseCase
  implements ICommandHandler<DeleteEquipmentCommand>
{
  constructor(
    private readonly flightsRepository: FlightsRepository,
    private readonly flightsQueryRepository: FlightsQueryRepository
  ) {}

  async execute(command: DeleteEquipmentCommand): Promise<boolean> {
    const result = await this.flightsQueryRepository.checkRaznOdKeyInRaznOd(
      command.id
    );
    if (!result) throw new NotFoundException();
    return this.flightsRepository.deleteEquipment(command.id);
  }
}
