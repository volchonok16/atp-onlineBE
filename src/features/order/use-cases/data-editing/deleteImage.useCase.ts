import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class DeleteImageCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteImageCommand)
export class DeleteImageUseCase
  implements ICommandHandler<DeleteImageCommand, boolean>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ id }: DeleteImageCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.imageExists(id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.deleteImage(id);
  }
}
