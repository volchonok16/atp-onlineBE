import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarInfoDto } from '../../dto/dtos/carInfo.dto';
import { DataEditingRepository } from '../../repositories/dataEditing.repository';
import { WithId } from '../../../../common/types/withId.type';
import { DataEditingQueryRepository } from '../../query.repositories/dataEditing.query.repository';
import { NotFoundException } from '@nestjs/common';

export class UpdateCarInfoCommand {
  constructor(public dto: WithId<CarInfoDto>) {}
}

@CommandHandler(UpdateCarInfoCommand)
export class UpdateCarInfoUseCase
  implements ICommandHandler<UpdateCarInfoCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository,
  ) {}

  async execute({ dto }: UpdateCarInfoCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.carInfoExists(
      dto.id,
    );
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.updateCarInfo(dto);
  }
}
