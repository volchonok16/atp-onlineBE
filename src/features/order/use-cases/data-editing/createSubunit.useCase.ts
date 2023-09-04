import { WithId } from "../../../../common/./types/withId.type";
import { SubunitDto } from "../../dto/dtos/data-editing/subunit.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SubunitViewModel } from "../../models/dataEditing.views/subunitView.model";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { NotFoundException } from "@nestjs/common";

export class CreateSubunitCommand {
  constructor(public dto: WithId<SubunitDto>) {}
}

@CommandHandler(CreateSubunitCommand)
export class CreateSubunitUseCase
  implements ICommandHandler<CreateSubunitCommand, SubunitViewModel>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: CreateSubunitCommand): Promise<SubunitViewModel> {
    const { id, ...subunitDto } = dto;

    const isExists = await this.dataEditingQueryRepository.organizationExists(
      id
    );

    if (!isExists) throw new NotFoundException();
    return await this.dataEditingRepository.createOrUpdateSubunit(
      subunitDto as SubunitDto
    );
  }
}
