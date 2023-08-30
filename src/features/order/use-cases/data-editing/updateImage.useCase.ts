import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateImageDto } from '../../dto/dtos/updateImage.dto';
import { DataEditingRepository } from '../../repositories/dataEditing.repository';
import { WithId } from '../../../../common/types/withId.type';
import { NotFoundException } from '@nestjs/common';
import { DataEditingQueryRepository } from '../../query.repositories/dataEditing.query.repository';

export class UpdateImageCommand {
  constructor(public dto: WithId<UpdateImageDto>) {}
}

@CommandHandler(UpdateImageCommand)
export class UpdateImageUseCase
  implements ICommandHandler<UpdateImageCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository,
  ) {}

  async execute({ dto }: UpdateImageCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.imageExists(dto.id);
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateImage(dto);
  }
}
