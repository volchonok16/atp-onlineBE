import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OutputDataDto } from "../../dto/dtos/outputData.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { OutputDataViewModel } from "../../models/order.views/outputdataView.model";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";

export class UpdatePrepareOutputDataCommand {
  constructor(public dto: OutputDataDto) {}
}

@CommandHandler(UpdatePrepareOutputDataCommand)
export class UpdatePrepareOutputDataUseCase
  implements ICommandHandler<UpdatePrepareOutputDataCommand, boolean>
{
  constructor(
    public orderRepository: OrderRepository,
    private orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({ dto }: UpdatePrepareOutputDataCommand): Promise<boolean> {
    const data = await this.orderQueryRepository.preparedOutputDataExist(
      dto.RAZN_KEY
    );
    if (!data) throw new NotFoundException();
    const raznarUpdated = await this.orderRepository.updateRaznar(dto);
    if (!raznarUpdated) return false;

    if (!data.RAZN_OD_ID)
      throw new BadRequestException(
        `Field N_TTN, NPL and FIO_ID: ${raznarUpdated} have been updated. NORM_ZAPR not updated for this id record not found.`
      );

    return await this.orderRepository.updateRaznOd(
      data.RAZN_OD_ID,
      dto.NORM_ZAPR
    );
  }
}
