import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../../repositories/order.repository';
import { OrderQueryRepository } from '../../query.repositories/order.query.repository';
import { OneOrderDataViewModel } from '../../models/order.views/oneOrderDataView.model';
import { RequestViewModel } from '../../models/order.views/requestView.model';
import { OrderViewModel } from '../../models/order.views/orderView.model';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { NotFoundException } from '@nestjs/common';

export class AddRequestToCarCommand {
  constructor(public REQ_RAZN_KEY: string, public RAZN_KEY: string) {}
}

@CommandHandler(AddRequestToCarCommand)
export class AddRequestToOrderDataUseCase
  implements ICommandHandler<AddRequestToCarCommand>
{
  constructor(
    private orderRepository: OrderRepository,
    private orderQueryRepository: OrderQueryRepository,
  ) {}

  async execute(command: AddRequestToCarCommand): Promise<OrderViewModel> {
    const orderData: OneOrderDataViewModel =
      await this.orderQueryRepository.getOneOrderData(+command.RAZN_KEY);

    if (isNil(orderData)) {
      throw new NotFoundException('orderData not found');
    }
    const request: RequestViewModel =
      await this.orderQueryRepository.getRequest(+command.REQ_RAZN_KEY);

    if (isNil(request)) {
      throw new NotFoundException('request not found');
    }
    const orderForSave = new OrderViewModel(orderData, request);

    return await this.orderRepository.createOrder(orderForSave);
  }
}
