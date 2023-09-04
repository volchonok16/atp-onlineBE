import { NoteDto } from "../../dto/dtos/data-editing/note.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NoteViewModel } from "../../models/dataEditing.views/noteView.model";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class CreateNoteCommand {
  constructor(public dto: NoteDto) {}
}

@CommandHandler(CreateNoteCommand)
export class CreateNoteUseCase
  implements ICommandHandler<CreateNoteCommand, NoteViewModel>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: CreateNoteCommand): Promise<NoteViewModel> {
    const isExists = await this.dataEditingQueryRepository.organizationExists(
      dto.DATA_ID
    );

    if (!isExists) throw new NotFoundException();
    return this.dataEditingRepository.createOrUpdateNote(dto);
  }
}
