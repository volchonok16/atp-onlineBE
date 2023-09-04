import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRefuelingCardDto } from "../../dto/dtos/updateRefuelingCard.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/types/withId.type";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { NotFoundException } from "@nestjs/common";

export class UpdateRefuelingCardCommand {
  constructor(public dto: WithId<UpdateRefuelingCardDto>) {}
}

@CommandHandler(UpdateRefuelingCardCommand)
export class UpdateRefuelingCardUseCase
  implements ICommandHandler<UpdateRefuelingCardCommand>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: UpdateRefuelingCardCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.refuelingCardExists(
      dto.id
    );
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateRefuelCard(dto);
  }
}
