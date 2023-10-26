import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateOtherEquipmentsAndObjectsDto } from "../../dto/dtos/data-editing/createOtherEquipmentsAndObjects.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class UpdateObjectsAndOtherEquipmentsCommand {
  constructor(
    public id: number,
    public body: CreateOtherEquipmentsAndObjectsDto
  ) {}
}

@CommandHandler(UpdateObjectsAndOtherEquipmentsCommand)
export class UpdateObjectsAndOtherEquipmentsUseCase
  implements ICommandHandler<UpdateObjectsAndOtherEquipmentsCommand>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute(
    command: UpdateObjectsAndOtherEquipmentsCommand
  ): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.checkSkladObjSpisKey(
      command.id
    );
    if (!isExists) throw new NotFoundException();
    return this.dataEditingRepository.updateObjectsAndOtherEquipments(
      command.id,
      command.body
    );
  }
}
