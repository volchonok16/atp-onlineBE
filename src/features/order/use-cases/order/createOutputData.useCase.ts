import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OutputDataDto } from "../../dto/dtos/outputData.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { NotFoundException } from "@nestjs/common";
import { OutputDataViewModel } from "../../models/order.views/outputdataView.model";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";

export class AddWayBillNumberCommand {
  constructor(public dto: OutputDataDto) {}
}

@CommandHandler(AddWayBillNumberCommand)
export class AddWayBillNumberUseCase
  implements ICommandHandler<AddWayBillNumberCommand>
{
  constructor(
    public orderRepository: OrderRepository,
    private orderQueryRepository: OrderQueryRepository
  ) {}

  async execute({
    dto,
  }: AddWayBillNumberCommand): Promise<OutputDataViewModel | any> {
    if (dto.usersWayBillNumber !== null) {
      const isExist = await this.orderQueryRepository.wayBillExist(dto.RAZN_ID);
      if (!isExist) throw new NotFoundException();

      const isUpdated = await this.orderRepository.addWayBillNumber(
        dto.usersWayBillNumber,
        dto.RAZN_ID
      );

      if (!isUpdated) {
        throw new NotFoundException("разнарядки с таким номером не существует");
      }
    }

    return await this.orderQueryRepository.getOutputData(dto.RAZN_ID);
  }
}
