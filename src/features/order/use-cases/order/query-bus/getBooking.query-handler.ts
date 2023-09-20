import { OrderDataQueryDtoType } from "../../../types/orderDataQueryDtoType";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { OrderQueryRepository } from "../../../query.repositories/order.query.repository";
import { GetBookingViewModel } from "../../../models/order.views/getBookingView.model";

export class GetBookingQuery {
  constructor(public query: OrderDataQueryDtoType) {}
}

@QueryHandler(GetBookingQuery)
export class GetBookingQueryHandler
  implements IQueryHandler<GetBookingQuery, GetBookingViewModel[]>
{
  constructor(private readonly orderQueryRepository: OrderQueryRepository) {}

  async execute({ query }: GetBookingQuery): Promise<GetBookingViewModel[]> {
    const data = await this.orderQueryRepository.getOrderData({
      ...query,
      tab: 3,
    });

    const results: GetBookingViewModel[] = [];

    for (const d of data) {
      let currentSecondDriver = null;

      if (d.FIO2_ID) {
        currentSecondDriver = await this.orderQueryRepository.getSecondDiverFIO(
          d.FIO2_ID
        );
      }

      results.push(
        GetBookingViewModel.toView(d, currentSecondDriver?.FULL_FIO)
      );
    }

    return results;
  }

  // параллельный запрос не всегда отрабатывает, предполагаю, что дело в том, что бд не закрывает конект и открывает новый,
  // и из-за этого выдает ошибку "write after end", которая не является критической и запрос прохрдит, но периодически валится с 500
  //
  // async execute({ query }: GetBookingQuery): Promise<GetBookingViewModel[]> {
  //   const data = await this.orderQueryRepository.getOrderData({
  //     ...query,
  //     tab: 3,
  //   });
  //
  //   return await Promise.all(
  //     data.map(async (d) => {
  //       if (d.FIO_ID) {
  //         const currentSecondDriver =
  //           await this.orderQueryRepository.getSecondDiverFIO(d.FIO_ID);
  //         return GetBookingViewModel.toView(d, currentSecondDriver?.FULL_FIO);
  //       } else {
  //         return GetBookingViewModel.toView(d, null);
  //       }
  //     })
  //   );
  // }

  // async execute({ query }: GetBookingQuery): Promise<GetBookingViewModel[]> {
  //   const data = await this.orderQueryRepository.getOrderData({
  //     ...query,
  //     tab: 3,
  //   });
  //
  //   const secondDrivers = [];
  //   data.map((d) => {
  //     if (d.FIO_ID) {
  //       secondDrivers.push(
  //         this.orderQueryRepository.getSecondDiverFIO(d.FIO_ID)
  //       );
  //     }
  //   });
  //   const secondDriverFIO = await Promise.all(secondDrivers);
  //
  //   return data.map((d) => {
  //     const currentSecondDriver = secondDriverFIO.filter(
  //       (v) => v.FIO_KEY === d.FIO_ID
  //     );
  //
  //     return GetBookingViewModel.toView(d, currentSecondDriver[0]?.FULL_FIO);
  //   });
  // }
}
