import { OrderDataViewModel } from "./orderDataView.model";

export class OrderFoDataPreparationViewModel {
  REMONT: boolean;
  B_VOD: boolean;
  MAM: string;
  NOMER: string;
  FIO: string;
  FIO_KOND: string;
  VR_V: Date;
  VR_Z: Date;
  ORG_NAME: string;
  VID_PEREV: string;
  VID_SOOB: string;
  PRIM_4_SORT: string;
  ROUTE: any;
  COMMENTAR: string;

  constructor(data: OrderDataViewModel) {
    this.REMONT = data.REMONT;
    this.B_VOD = data.B_VOD;
    this.MAM = data.MAM;
    this.NOMER = data.NOMER;
    this.FIO = data.FIO;
    this.FIO_KOND = data.FIO_KOND;
    this.VR_V = data.VR_V;
    this.VR_Z = data.VR_Z;
    this.ORG_NAME = data.ORG_NAME;
    this.VID_PEREV = data.VID_PEREV;
    this.VID_SOOB = data.VID_SOOB;
    this.PRIM_4_SORT = data.PRIM_4_SORT;
    this.ROUTE = null;
    this.COMMENTAR = data.COMMENTAR;
  }
}
