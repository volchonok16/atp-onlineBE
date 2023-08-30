import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataEditingRepository } from '../../repositories/dataEditing.repository';
import { NotFoundException } from '@nestjs/common';
import { DataEditingQueryRepository } from '../../query.repositories/dataEditing.query.repository';

export class DeleteNoteCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteNoteCommand)
export class DeleteNoteUseCase
  implements ICommandHandler<DeleteNoteCommand, boolean>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository,
  ) {}

  async execute({ id }: DeleteNoteCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.noteExists(id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.deleteNote(id);
  }
}
