import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class DeletePriceCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeletePriceCommand)
export class DeletePriceUseCase
  implements ICommandHandler<DeletePriceCommand, boolean>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ id }: DeletePriceCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.priceExists(id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.deletePrice(id);
  }
}
