import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAdditionalInformationDto } from "../../dto/dtos/createAdditionalInformation.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/shared/types/withId.type";

export class CreateAdditionalInformationCommand {
  constructor(public dto: WithId<CreateAdditionalInformationDto>) {}
}

@CommandHandler(CreateAdditionalInformationCommand)
export class CreateAdditionalInformationUseCase
  implements ICommandHandler<CreateAdditionalInformationCommand>
{
  constructor(public dataEditingRepository: DataEditingRepository) {}

  async execute(command: CreateAdditionalInformationCommand): Promise<any> {
    return await this.dataEditingRepository.createAdditionalInformationById(
      command.dto
    );
  }
}
