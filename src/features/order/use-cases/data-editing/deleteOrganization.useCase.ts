import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class DeleteOrganizationCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteOrganizationCommand)
export class DeleteOrganizationUseCase
  implements ICommandHandler<DeleteOrganizationCommand, boolean>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ id }: DeleteOrganizationCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.organizationExists(
      id
    );
    if (!isExists) throw new NotFoundException();

    const result = await this.dataEditingRepository.deleteOrganization(id);
    if (!result)
      throw new BadRequestException("You need to archive this organization.");

    return true;
  }
}
