import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRefuelingCardDto } from "../../dto/dtos/createRefuelingCard.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/shared/types/withId.type";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class CreateRefuelingCardCommand {
  constructor(public dto: WithId<CreateRefuelingCardDto>) {}
}

@CommandHandler(CreateRefuelingCardCommand)
export class CreateRefuelingCardUseCase
  implements ICommandHandler<CreateRefuelingCardCommand>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: CreateRefuelingCardCommand) {
    const isExists = await this.dataEditingQueryRepository.fioExists(dto.id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.createRefuelCard(dto);
  }
}
