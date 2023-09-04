import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRefuelingCardDto } from "../../dto/dtos/createRefuelingCard.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { WithId } from "../../../../common/types/withId.type";

export class CreateRefuelingCardCommand {
  constructor(public dto: WithId<CreateRefuelingCardDto>) {}
}

@CommandHandler(CreateRefuelingCardCommand)
export class CreateRefuelingCardUseCase
  implements ICommandHandler<CreateRefuelingCardCommand>
{
  constructor(public dataEditingRepository: DataEditingRepository) {}

  async execute({ dto }: CreateRefuelingCardCommand) {
    return await this.dataEditingRepository.createRefuelCard(dto);
  }
}
