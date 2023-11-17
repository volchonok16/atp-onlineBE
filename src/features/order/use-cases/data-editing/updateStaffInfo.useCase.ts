import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateStaffInfoDto } from "../../dto/dtos/updateStaffInfo.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/shared/types/withId.type";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { NotFoundException } from "@nestjs/common";

export class UpdateStaffInfoCommand {
  constructor(public dto: WithId<UpdateStaffInfoDto>) {}
}

@CommandHandler(UpdateStaffInfoCommand)
export class UpdateStaffInfoUseCase
  implements ICommandHandler<UpdateStaffInfoCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: UpdateStaffInfoCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.staffExists(dto.id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateStaffInfo(dto);
  }
}
