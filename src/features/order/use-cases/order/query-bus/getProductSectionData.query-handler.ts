import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProductSectionView } from "../../../models/order.views/productSectionView.model";
import { OrderQueryRepository } from "../../../query.repositories/order.query.repository";
import { NotFoundException } from "@nestjs/common";
import { GetBookingQuery } from "./getBooking.query-handler";

export class GetProductSectionDataQuery {
  constructor(public id: number) {}
}

@QueryHandler(GetProductSectionDataQuery)
export class GetProductSectionDataQueryHandler
  implements IQueryHandler<GetProductSectionDataQuery, ProductSectionView[]>
{
  constructor(private readonly orderQueryRepository: OrderQueryRepository) {}

  async execute({
    id,
  }: GetProductSectionDataQuery): Promise<ProductSectionView[]> {
    const isExist = await this.orderQueryRepository.billOfLandingExist(id);
    if (!isExist) throw new NotFoundException();

    return this.orderQueryRepository.getProductSectionData(id);
  }
}
