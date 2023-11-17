import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateInternshipDto } from "../../dto/dtos/updateInternship.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/shared/types/withId.type";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class UpdateInternshipCommand {
  constructor(public dto: WithId<UpdateInternshipDto>) {}
}

@CommandHandler(UpdateInternshipCommand)
export class UpdateInternShipUseCase
  implements ICommandHandler<UpdateInternshipCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: UpdateInternshipCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.internshipExists(
      dto.id
    );
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateInternship(dto);
  }
}
