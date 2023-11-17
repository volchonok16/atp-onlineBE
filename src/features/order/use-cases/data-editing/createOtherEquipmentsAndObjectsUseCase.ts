import { CreateOtherEquipmentsAndObjectsForTableDocsDto } from "../../dto/dtos/data-editing/createOtherEquipmentsAndObjectsForTableDocs.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";

export class CreateOtherEquipmentsAndObjectsCommand {
  constructor(public dto: CreateOtherEquipmentsAndObjectsForTableDocsDto) {}
}

@CommandHandler(CreateOtherEquipmentsAndObjectsCommand)
export class CreateOtherEquipmentsAndObjectsUseCase
  implements ICommandHandler<CreateOtherEquipmentsAndObjectsCommand>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute(
    command: CreateOtherEquipmentsAndObjectsCommand
  ): Promise<boolean> {
    return this.dataEditingRepository.createOrUpdateOtherEquipmentsAndObjects({
      ...command.dto,
      RAZN_OD_DOCS_KEY: null,
    });
  }
}
