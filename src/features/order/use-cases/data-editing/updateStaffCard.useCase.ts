import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateStaffCardDto } from "../../dto/dtos/updateStaffCard.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/types/withId.type";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class UpdateStaffCardCommand {
  constructor(public dto: WithId<UpdateStaffCardDto>) {}
}

@CommandHandler(UpdateStaffCardCommand)
export class UpdateStaffCardUseCase
  implements ICommandHandler<UpdateStaffCardCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: UpdateStaffCardCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.staffCardExists(
      dto.id
    );
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateStaffCard(dto);
  }
}
