import { WithId } from "../../../../common/./types/withId.type";
import { SubunitDto } from "../../dto/dtos/data-editing/subunit.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";

export class UpdateSubunitCommand {
  constructor(public dto: WithId<SubunitDto>) {}
}

@CommandHandler(UpdateSubunitCommand)
export class UpdateSubunitUseCase
  implements ICommandHandler<UpdateSubunitCommand, boolean>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute({ dto }: UpdateSubunitCommand) {
    const result = await this.dataEditingRepository.updateSubunit(dto);
    if (result === 0) throw new NotFoundException();
    return result === 1;
  }
}
