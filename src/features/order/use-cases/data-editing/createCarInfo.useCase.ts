import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CarInfoDto } from "../../dto/dtos/carInfo.dto";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";

export class CreateCarInfoCommand {
  constructor(public dto: CarInfoDto) {}
}

@CommandHandler(CreateCarInfoCommand)
export class CreateCarInfoUseCase
  implements ICommandHandler<CreateCarInfoCommand>
{
  constructor(private readonly dataEditingRepository: DataEditingRepository) {}

  async execute({ dto }: CreateCarInfoCommand) {
    return this.dataEditingRepository.createCarInfo(dto);
  }
}
