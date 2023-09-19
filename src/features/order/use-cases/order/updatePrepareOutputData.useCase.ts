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
    /**
     * [The method will return RAZN_OD_ID if there is a record with the passed id
     * and in this record there is a record for the related table.
     *
     * Return RAZN_OD_ID = null if there is a record for the given id, but there
     * is no record for the related table
     *
     * Returns null if there is no entry for given id]
     */
    const data = await this.orderQueryRepository.preparedOutputDataExist(
      dto.RAZN_KEY
    );
    if (!data) throw new NotFoundException();
    if (!data.RAZN_OD_ID && dto.NORM_ZAPR)
      throw new BadRequestException(
        `Can't update NORM_ZAPR for this id record not found. Delete NORM_ZAPR field and true again.`
      );

    return await this.orderRepository.updateRaznar(dto, data.RAZN_OD_ID);
  }
}
