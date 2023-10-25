import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteObjectsAndOtherEquipmentsCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteObjectsAndOtherEquipmentsCommand)
export class DeleteObjectsAndOtherEquipmentsUseCase
  implements ICommandHandler<DeleteObjectsAndOtherEquipmentsCommand>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute(
    command: DeleteObjectsAndOtherEquipmentsCommand
  ): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.checkSkladObjSpisKey(
      command.id
    );
    if (!isExists) throw new NotFoundException();
    return this.dataEditingRepository.deleteObjectsAndOtherEquipments(
      command.id
    );
  }
}
