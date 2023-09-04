import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class DeleteSubunitCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteSubunitCommand)
export class DeleteSubunitUseCase
  implements ICommandHandler<DeleteSubunitCommand, boolean>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ id }: DeleteSubunitCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.subunitExists(id);
    if (!isExists) throw new NotFoundException();

    const result = await this.dataEditingRepository.deleteSubunit(id);
    if (!result)
      throw new BadRequestException("You need to archive this subunit");

    return true;
  }
}
