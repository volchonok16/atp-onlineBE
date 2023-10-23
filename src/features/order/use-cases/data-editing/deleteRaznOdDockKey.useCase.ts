import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";

export class DeleteRaznOdDockKeyCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteRaznOdDockKeyCommand)
export class DeleteRaznOdDockKeyUseCase
  implements ICommandHandler<DeleteRaznOdDockKeyCommand>
{
  constructor(
    private readonly dataEditingQueryRepository: DataEditingQueryRepository,
    private readonly dataEditingRepository: DataEditingRepository
  ) {}

  async execute(command: DeleteRaznOdDockKeyCommand): Promise<any> {
    const isExists = await this.dataEditingQueryRepository.checkDocsKey(
      command.id
    );
    if (!isExists) throw new NotFoundException();
    return this.dataEditingRepository.deleteOldDocs(command.id);
  }
}
