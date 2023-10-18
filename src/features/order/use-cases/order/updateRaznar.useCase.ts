import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderRepository } from "../../repositories/order.repository";
import { UpdateRaznarWeekPlanDto } from "../../dto/dtos/updateRaznarWeekPlan.dto";
import { NotFoundException } from "@nestjs/common";
import { OrderQueryRepository } from "../../query.repositories/order.query.repository";

export class UpdateRaznarCommand {
  constructor(public id: number, public dto: UpdateRaznarWeekPlanDto) {}
}

@CommandHandler(UpdateRaznarCommand)
export class UpdateRaznarUseCase
  implements ICommandHandler<UpdateRaznarCommand>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderQueryRepository: OrderQueryRepository
  ) {}

  async execute(command: UpdateRaznarCommand): Promise<boolean> {
    const isExists = await this.orderQueryRepository.checkRaznarId(command.id);
    if (!isExists) throw new NotFoundException();
    return this.orderRepository.updateRaznarWeekPlan(command.id, command.dto);
  }
}
