import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TransportSectionView2 } from "../../../models/order.views/transportSectionView2.model";
import { OrderQueryRepository } from "../../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";

export class GetTransportSectionDataQuery {
  constructor(public id: number) {}
}

@QueryHandler(GetTransportSectionDataQuery)
export class GetTransportSectionQueryHandler
  implements
    IQueryHandler<GetTransportSectionDataQuery, TransportSectionView2[]>
{
  constructor(private readonly orderQueryRepository: OrderQueryRepository) {}

  async execute({
    id,
  }: GetTransportSectionDataQuery): Promise<TransportSectionView2[]> {
    const isExist = await this.orderQueryRepository.billOfLandingExist(id);
    if (!isExist) throw new NotFoundException();

    return this.orderQueryRepository.getTransportSectionData(id);
  }
}
