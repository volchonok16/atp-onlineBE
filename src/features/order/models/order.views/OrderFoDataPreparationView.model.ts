import { shortStringToBoolean } from "../../../../common/helpers/shortStringToBooleanTransform.helper";

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

  static toView(data) {
    return {
      REMONT: shortStringToBoolean(data.REMONT),
      B_VOD: shortStringToBoolean(data.B_VOD),
      MAM: data.MAM,
      NOMER: data.NOMER,
      FIO: data.FULL_FIO,
      FIO_KOND: data.FIO_KOND,
      VR_V: data.VR_V,
      VR_Z: data.VR_Z,
      ORG_NAME: data.ORG_NAME,
      VID_PEREV: data.VID_PEREV,
      VID_SOOB: data.VID_SOOB,
      PRIM_4_SORT: data.PRIM_4_SORT,
      ROUTE: data.ROUTE,
      COMMENTAR: data.COMMENTAR,
    };
  }
}
