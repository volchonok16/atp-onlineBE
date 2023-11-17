import { WithId } from "../../../../common/shared/types/withId.type";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { OrganizationDto } from "../../dto/dtos/data-editing/organizationDto";
import { NotFoundException } from "@nestjs/common";

export class UpdateOrganizationCommand {
  constructor(public dto: WithId<OrganizationDto>) {}
}

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationUseCase
  implements ICommandHandler<UpdateOrganizationCommand, boolean>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute({ dto }: UpdateOrganizationCommand): Promise<boolean> {
    const result = await this.dataEditingRepository.updateOrganization(dto);

    if (result === 0) throw new NotFoundException();
    return result === 1;
  }
}
