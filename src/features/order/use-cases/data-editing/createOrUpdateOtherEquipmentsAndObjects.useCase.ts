import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { CreateOtherEquipmentsAndObjectsForTableDocsDtoDto } from "../../dto/dtos/data-editing/createOtherEquipmentsAndObjectsForTableDocs.dto";

export class CreateOrUpdateOtherEquipmentsAndObjectsCommand {
  constructor(public dto: CreateOtherEquipmentsAndObjectsForTableDocsDtoDto) {}
}

@CommandHandler(CreateOrUpdateOtherEquipmentsAndObjectsCommand)
export class CreateOrUpdateOtherEquipmentsAndObjectsUseCase
  implements ICommandHandler<CreateOrUpdateOtherEquipmentsAndObjectsCommand>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute(
    command: CreateOrUpdateOtherEquipmentsAndObjectsCommand
  ): Promise<any> {
    return this.dataEditingRepository.createOrUpdateOtherEquipmentsAndObjects(
      command.dto
    );
  }
}
