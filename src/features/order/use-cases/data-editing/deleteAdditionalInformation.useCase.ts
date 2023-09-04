import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class DeleteAdditionalInformationCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteAdditionalInformationCommand)
export class DeleteAdditionalInformationUseCase
  implements ICommandHandler<DeleteAdditionalInformationCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ id }: DeleteAdditionalInformationCommand): Promise<boolean> {
    const isExists =
      await this.dataEditingQueryRepository.additionalInformationExists(id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.DeleteAdditionalInformation(id);
  }
}
