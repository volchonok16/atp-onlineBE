import { PrepareOutputDataDto } from "../../dto/dtos/order/prepareOutputData.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PreparedOutputDataView } from "../../models/order.views/PreparedOutputDataView.model";
import { OrderRepository } from "../../repositories/order.repository";

export class CreatePrepareOutputDataCommand {
  constructor(public dto: PrepareOutputDataDto) {}
}

@CommandHandler(CreatePrepareOutputDataCommand)
export class CreatePrepareOutputDataUseCase
  implements
    ICommandHandler<CreatePrepareOutputDataCommand, PreparedOutputDataView>
{
  constructor(public orderRepository: OrderRepository) {}

  async execute({
    dto,
  }: CreatePrepareOutputDataCommand): Promise<PreparedOutputDataView> {
    await this.orderRepository.createPrepareOutputData(dto);
    return {} as PreparedOutputDataView;
  }
}
