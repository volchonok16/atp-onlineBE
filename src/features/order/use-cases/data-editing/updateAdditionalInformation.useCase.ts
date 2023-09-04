import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateAdditionalInformationDto } from "../../dto/dtos/updateAdditionalInformation.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/types/withId.type";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class UpdateAdditionalInformationCommand {
  constructor(public dto: WithId<UpdateAdditionalInformationDto>) {}
}

@CommandHandler(UpdateAdditionalInformationCommand)
export class UpdateAdditionalInformationUseCase
  implements ICommandHandler<UpdateAdditionalInformationCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: UpdateAdditionalInformationCommand): Promise<boolean> {
    const isExists =
      await this.dataEditingQueryRepository.additionalInformationExists(dto.id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateAdditionalInformation(dto);
  }
}
