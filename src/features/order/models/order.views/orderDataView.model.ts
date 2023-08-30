import { da } from 'date-fns/locale';
import { shortStringToBoolean } from '../../../../common/helpers/shortStringToBooleanTransform.helper';

export class OrderDataViewModel {
  // RAZN_KEY: number;
  // REMONT: string;
  // B_VOD: string;
  // AM: string;
  // NOMER: string;
  // FIO_ID: number;
  // DATS: Date;
  // GRAFIK: number;
  // TIP: string;
  // KARTA: string;
  // MK: string;
  // NAK: number;
  // KARTAI: number;
  // TIP_PL: string;
  // VR_V: Date;
  // VR_Z: Date;
  // RAZN_OD_ID: number;
  // ZAPR: string;
  // NPL: string;
  // ZAKS: string;
  // ZAKS_DISTINCT: string;
  // ZAKS_COMMA: string;
  // VES: string;
  // RAST_KM: string;
  // HODOK: string;
  // PRIM: string;
  // COMMENTAR: string;
  // RAZN_DL_ID: number;
  // PRINT: string;
  // DOP_DATE: Date;
  // END_DATE: Date;
  // NOM: number;
  // FIO: string;
  // G_REMONT: number;
  // PPROBEG: number;
  // PREDUPR: number;
  // DNR: Date;
  // DKR: Date;
  // DL: string;
  // FULL_FIO: string;
  // INFO: string;
  // DATE_UDOST: Date;
  // DATE_SPRAV: Date;
  // ZAKS_PRIM: string;
  // PODRS: string;
  // ADR_POGRS: string;
  // ADR_RAZGRS: string;
  // TIP_GRUZS: string;
  // FIO_KOND: string;
  // FIO_ID_KOND: number;
  // KASSA: number;
  // ORG_ID: number;
  // PRICEP_MAM: string;
  // PRICEP_NOMER: string;
  // RAZN_OD_ID_PRICEP: number;
  // FIO2_VOD: string;
  // FIO2_ID: number;
  // PPROBEG_AGR: number;
  // VR_POD: string;
  // VR_VOZVR: string;
  // NOM_REQ: string;
  // REG_N_GPM: string;
  // TAB_NO: string;
  // PLAN_R: string;
  // SH_CODE: string;
  // T_T: string;
  // FILE_NAME: string;
  // ROUTE: string;
  // ROUTE_AND_DESCR: string;
  // COMMAND: number;
  // GAR_NO: string;
  // VREM_REJSA: string;
  // FLIGHT_DESCR: string;
  // FLIGHT: string;
  // VMEST_CHEL: number;
  // ORG_NAME: string;
  // PRICEP_GAR_NO: string;
  // NAME_AK: string;
  // NRT_L: number;
  // NRT_Z: number;
  // NRT_TEK: number;
  // SERIJA: string;
  // USER_FULL_FIO: string;
  // PRIM_4_SORT: string;
  // VID_PEREV: string;
  // VID_SOOB: string;
  // INV_NO: string;
  // VIN: string;
  // PRICEP_VIN: string;
  // PRICEP_T_T: string;
  // WAIT_4_CANCELLATION: number;
  // ZAK1: string;
  // ZAK2: string;
  // ROUTE1: string;
  // ROUTE2: string;
  // ADR_POGR1: string;
  // ADR_POGR2: string;
  // ADR_RAZGR1: string;
  // ADR_RAZGR2: string;

  RAZN_KEY: number;
  REMONT: boolean;
  B_VOD: boolean;
  MAM: string;
  NOMER: string;
  FIO_ID: number;
  DATS: Date;
  GRAFIK: number;
  TIP: string;
  KARTA: string;
  MK: string;
  NAK: number;
  KARTAI: number;
  TIP_PL: string;
  VR_V: Date;
  VR_Z: Date;
  RAZN_OD_ID: number;
  ZAPR: string;
  NPL: string;
  ZAKS: string;
  ZAKS_DISTINCT: string;
  ZAKS_COMMA: string;
  VES: string;
  RAST_KM: string;
  HODOK: string;
  PRIM: string;
  COMMENTAR: string;
  RAZN_DL_ID: number;
  PRINT: boolean;
  DOP_DATE: Date;
  END_DATE: Date;
  NOM: number;
  FIO: string;
  G_REMONT: number;
  PPROBEG: number;
  PREDUPR: number;
  DNR: Date;
  DKR: Date;
  DL: string;
  FULL_FIO: string;
  INFO: string;
  DATE_UDOST: Date;
  DATE_SPRAV: Date;
  ZAKS_PRIM: string;
  PODRS: string;
  ADR_POGRS: string;
  ADR_RAZGRS: string;
  TIP_GRUZS: string;
  FIO_KOND: string;
  FIO_ID_KOND: number;
  KASSA: number;
  ORG_ID: number;
  PRICEP_MAM: string;
  PRICEP_NOMER: string;
  RAZN_OD_ID_PRICEP: number;
  FIO2_VOD: string;
  FIO2_ID: number;
  PPROBEG_AGR: number;
  VR_POD: string;
  VR_VOZVR: string;
  NOM_REQ: string;
  REG_N_GPM: string;
  TAB_NO: string;
  PLAN_R: string;
  SH_CODE: string;
  T_T: string;
  FILE_NAME: string;
  ROUTE: string;
  ROUTE_AND_DESCR: string;
  COMMAND: number;
  GAR_NO: string;
  VREM_REJSA: string;
  FLIGHT_DESCR: string;
  FLIGHT: string;
  VMEST_CHEL: number;
  ORG_NAME: string;
  PRICEP_GAR_NO: string;
  NAME_AK: string;
  NRT_L: number;
  NRT_Z: number;
  NRT_TEK: number;
  SERIJA: string;
  USER_FULL_FIO: string;
  PRIM_4_SORT: string;
  VID_PEREV: string;
  VID_SOOB: string;
  INV_NO: string;
  VIN: string;
  PRICEP_VIN: string;
  PRICEP_T_T: string;
  WAIT_4_CANCELLATION: number;
  ZAK1: string;
  ZAK2: string;
  ROUTE1: string;
  ROUTE2: string;
  ADR_POGR1: string;
  ADR_POGR2: string;
  ADR_RAZGR1: string;
  ADR_RAZGR2: string;

  static toView(data) {
    const result = {
      ...data,
    };
    result.REMONT = shortStringToBoolean(data.REMONT);
    result.B_VOD = shortStringToBoolean(data.B_VOD);
    result.PRINT = shortStringToBoolean(data.PRINT);

    return result;
  }
}
