import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { CreateOtherEquipmentsAndObjectsDto } from "../../dto/dtos/data-editing/createOtherEquipmentsAndObjects.dto";
import { SkladObjSpisKeyViewModel } from "../../models/dataEditing.views/skladObjSpisKeyView.model";

export class CreateObjectsAndOtherEquipmentsCommand {
  constructor(public dto: CreateOtherEquipmentsAndObjectsDto) {}
}

@CommandHandler(CreateObjectsAndOtherEquipmentsCommand)
export class CreateObjectsAndOtherEquipmentsUseCase
  implements ICommandHandler<CreateObjectsAndOtherEquipmentsCommand>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute(
    command: CreateObjectsAndOtherEquipmentsCommand
  ): Promise<SkladObjSpisKeyViewModel> {
    return this.dataEditingRepository.createObjectsAndOtherEquipments(
      command.dto
    );
  }
}
