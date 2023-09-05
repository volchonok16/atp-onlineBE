import { ApiProperty } from "@nestjs/swagger";
import { OneOrderDataViewModel } from "./oneOrderDataView.model";
import { RequestViewModel } from "./requestView.model";
import { format } from "date-fns";

export class OrderViewModel {
  @ApiProperty()
  RAZN_ID: number = null;
  @ApiProperty()
  ZAK_ID: number = null;
  @ApiProperty()
  PRIM: string = null;
  @ApiProperty()
  DATA_PODR_ID: number = null;
  @ApiProperty()
  ADR_POGR: string = null;
  @ApiProperty()
  ADR_RAZGR: string = null;
  @ApiProperty()
  TIP_GRUZ: string = null;
  @ApiProperty()
  N_PL: number = null;
  @ApiProperty()
  TIP_ZAYAVKI: number = null;
  @ApiProperty()
  VES: number = null;
  @ApiProperty()
  RAST_KM: number = null;
  @ApiProperty()
  HODOK: number = null;
  @ApiProperty()
  VR_OT: string = null;
  @ApiProperty()
  VR_DO: string = null;
  @ApiProperty()
  ROUTE_ID: number = null;
  @ApiProperty()
  FLIGHT: string = null;
  @ApiProperty()
  METOD_RASCH: number = null;

  static dto(car: OneOrderDataViewModel, request: RequestViewModel) {
    return {
      RAZN_ID: car.RAZN_KEY,
      ZAK_ID: request.ZAK_ID,
      PRIM: request.MESTO_POD,
      DATA_PODR_ID: request.PODR_ID ? request.PODR_ID : null,
      ADR_POGR: request.ADR_POGR,
      ADR_RAZGR: request.ADR_RAZGR,
      TIP_GRUZ: request.TIP_GRUZ,
      N_PL: +car.NPL,
      TIP_ZAYAVKI: null,
      VES: request.VES,
      RAST_KM: request.RAST_KM,
      HODOK: request.HODOK,
      VR_OT: request.VR_OT
        ? request.VR_OT
        : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      VR_DO: request.VR_DO
        ? request.VR_DO
        : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      ROUTE_ID: null,
      FLIGHT: null,
      METOD_RASCH: null,
    };
  }

  static toView(data) {
    const result = {
      ...data,
    };
    result.VR_OT = format(data.VR_OT, "HH:mm");
    result.VR_DO = format(data.VR_DO, "HH:mm");

    return result;
  }
}
