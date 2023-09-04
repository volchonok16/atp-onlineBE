import { OrganizationDto } from "../../dto/dtos/data-editing/organizationDto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { OrganizationViewModel } from "../../models/dataEditing.views/organizationView.model";

export class CreateOrganizationCommand {
  constructor(public dto: OrganizationDto) {}
}

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationUseCase
  implements ICommandHandler<CreateOrganizationCommand, OrganizationViewModel>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute({
    dto,
  }: CreateOrganizationCommand): Promise<OrganizationViewModel> {
    return await this.dataEditingRepository.createOrUpdateOrganization(dto);
  }
}
