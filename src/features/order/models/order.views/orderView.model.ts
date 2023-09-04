import { ApiProperty } from "@nestjs/swagger";
import { OneOrderDataViewModel } from "./oneOrderDataView.model";
import { RequestViewModel } from "./requestView.model";
import { format } from "date-fns";

export class OrderViewModel {
  @ApiProperty()
  RAZN_ID: number;
  @ApiProperty()
  ZAK_ID: number;
  @ApiProperty()
  PRIM: string | null;
  @ApiProperty()
  DATA_PODR_ID: number | null;
  @ApiProperty()
  ADR_POGR: string | null;
  @ApiProperty()
  ADR_RAZGR: string | null;
  @ApiProperty()
  TIP_GRUZ: string | null;
  @ApiProperty()
  N_PL: number | null;
  @ApiProperty()
  TIP_ZAYAVKI: number | null;
  @ApiProperty()
  VES: number | null;
  @ApiProperty()
  RAST_KM: number | null;
  @ApiProperty()
  HODOK: number | null;
  @ApiProperty()
  VR_OT: string | null;
  @ApiProperty()
  VR_DO: string | null;
  @ApiProperty()
  ROUTE_ID: number | null;
  @ApiProperty()
  FLIGHT: string | null;
  @ApiProperty()
  METOD_RASCH: number | null;

  constructor(car: OneOrderDataViewModel, request: RequestViewModel) {
    this.RAZN_ID = car.RAZN_KEY;
    this.ZAK_ID = request.ZAK_ID;
    this.PRIM = request.MESTO_POD;
    this.DATA_PODR_ID = request.PODR_ID ? request.PODR_ID : null;
    this.ADR_POGR = request.ADR_POGR;
    this.ADR_RAZGR = request.ADR_RAZGR;
    this.TIP_GRUZ = request.TIP_GRUZ;
    this.N_PL = +car.NPL;
    this.TIP_ZAYAVKI = null;
    this.VES = request.VES;
    this.RAST_KM = request.RAST_KM;
    this.HODOK = request.HODOK;
    this.VR_OT = request.VR_OT
      ? request.VR_OT
      : format(new Date(), "yyyy-MM-dd HH:mm:ss");
    this.VR_DO = request.VR_DO
      ? request.VR_DO
      : format(new Date(), "yyyy-MM-dd HH:mm:ss");
    this.ROUTE_ID = null;
    this.FLIGHT = null;
    this.METOD_RASCH = null;
  }
}
