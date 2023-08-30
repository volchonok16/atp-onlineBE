import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataEditingRepository } from '../../repositories/dataEditing.repository';
import { NotFoundException } from '@nestjs/common';
import { DataEditingQueryRepository } from '../../query.repositories/dataEditing.query.repository';

export class DeleteRefuelingCardCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteRefuelingCardCommand)
export class DeleteRefuelingCardUseCase
  implements ICommandHandler<DeleteRefuelingCardCommand>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository,
  ) {}

  async execute({ id }: DeleteRefuelingCardCommand): Promise<boolean> {
    const isExists =
      await this.dataEditingQueryRepository.refuelingCardExistsById(id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.deleteRefuelCard(id);
  }
}
