import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { NotFoundException } from "@nestjs/common";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";

export class DeleteCarInfoCommand {
  constructor(public OD_KEY: number) {}
}

@CommandHandler(DeleteCarInfoCommand)
export class DeleteCarInfoUseCase
  implements ICommandHandler<DeleteCarInfoCommand, boolean>
{
  constructor(
    public dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ OD_KEY }: DeleteCarInfoCommand): Promise<boolean> {
    const isExists = await this.dataEditingQueryRepository.carInfoExists(
      OD_KEY
    );
    if (!isExists) throw new NotFoundException();

    return await this.dataEditingRepository.deleteCarInfo(OD_KEY);
  }
}
