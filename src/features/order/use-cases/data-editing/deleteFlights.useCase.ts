import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";

export class DeleteFlightsCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteFlightsCommand)
export class DeleteFlightsUseCase
  implements ICommandHandler<DeleteFlightsCommand>
{
  constructor(
    private readonly dataEditingQueryRepository: DataEditingQueryRepository,
    private readonly dataEditingRepository: DataEditingRepository
  ) {}

  async execute(command: DeleteFlightsCommand): Promise<any> {
    const isExists = await this.dataEditingQueryRepository.getFlight(
      command.id
    );
    if (!isExists) throw new NotFoundException();
    return this.dataEditingRepository.deleteFlight(command.id);
  }
}
