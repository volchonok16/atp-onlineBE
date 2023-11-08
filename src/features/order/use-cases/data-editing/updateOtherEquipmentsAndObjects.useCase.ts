import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { UpdateOtherEquipmentsAndObjectsForTableDocsDto } from "../../dto/dtos/data-editing/updateOtherEquipmentsAndObjectsForTableDocs.dto";

export class UpdateOtherEquipmentsAndObjectsCommand {
  constructor(public dto: UpdateOtherEquipmentsAndObjectsForTableDocsDto) {}
}

@CommandHandler(UpdateOtherEquipmentsAndObjectsCommand)
export class UpdateOtherEquipmentsAndObjectsUseCase
  implements ICommandHandler<UpdateOtherEquipmentsAndObjectsCommand>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute(command: UpdateOtherEquipmentsAndObjectsCommand): Promise<any> {
    return this.dataEditingRepository.createOrUpdateOtherEquipmentsAndObjects(
      command.dto
    );
  }
}
