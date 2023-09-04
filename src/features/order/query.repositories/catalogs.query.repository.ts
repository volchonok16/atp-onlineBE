import { Injectable } from "@nestjs/common";
import { EquipmentListDto } from "../dto/query.dtos/equipmentList.dto";
import { EquipmentListEnum } from "../types/equipmentList.enum";
import { EquipmentListViewModel } from "../models/catalogs.views/equipmentListView.model";
import { ExtendedInfoDto } from "../dto/query.dtos/extendedInfo.dto";
import { ExtendedInformationViewModel } from "../models/catalogs.views/extendedInformationView.model";
import { DirectoriesMechanismTypesViewModel } from "../models/catalogs.views/directoriesMechanismTypesView.model";
import { DirectoriesNotesViewModel } from "../models/catalogs.views/directoriesNotesView.model";
import { DirectoriesAddressesViewModel } from "../models/catalogs.views/directoriesAddressesView.model";
import { DirectoriesGoodsTypeViewModel } from "../models/catalogs.views/directoriesGoodsTypeView.model";
import { DirectoriesTransportationTypeViewModel } from "../models/catalogs.views/directoriesTransportationTypeView.model";
import { DirectoriesCommunicationTypeViewModel } from "../models/catalogs.views/directoriesCommunicationTypeView.model";
import { RelatedDataViewModel } from "../models/catalogs.views/relatedDataView.model";
import { TechnicalCharacteristicViewModel } from "../models/catalogs.views/technicalCharacteristicView.model";
import { DocumentationByIdViewModel } from "../models/catalogs.views/documentationByIdView.model";
import { DocumentationTimingControlViewModel } from "../models/catalogs.views/documentationTimingControlView.model";
import { DocumentationRefuelingCardsByIdViewModel } from "../models/catalogs.views/documentationRefuelingCardsByIdView.model";
import { AdditionalInfoNotInDemandViewModel } from "../models/catalogs.views/additionalInfoNotInDemandView.model";
import { AdditionalInfoConservationViewModel } from "../models/catalogs.views/additionalInfoConservationView.model";
import { PassesViewModel } from "../models/catalogs.views/passesView.model";
import { DriverHoldingViewModel } from "../models/catalogs.views/driverHoldingView.model";
import { CarEquipmentViewModel } from "../models/catalogs.views/carEquipmentView.model";
import { AcquisitionActViewModel } from "../models/catalogs.views/acquisitionActView.model";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";

@Injectable()
export class CatalogsQueryRepository {
  constructor(private firebird: FirebirdService) {}

  async getEquipmentList(
    queryDto: EquipmentListDto
  ): Promise<EquipmentListViewModel[]> {
    const listFilter =
      queryDto.motorcadeNumber === EquipmentListEnum.all
        ? ""
        : `WHERE NAME_AK LIKE ${this.getEquipmentListFilter(queryDto)}`;

    const result = await this.firebird.query<EquipmentListViewModel[]>(
      `SELECT * FROM RAZN_OD_SEL(1, null) ${listFilter};`
    );

    return result.map((r) => EquipmentListViewModel.toView(r));
  }

  async getExtendedInfo(
    queryDto: ExtendedInfoDto
  ): Promise<ExtendedInformationViewModel[]> {
    const extendedInfoFilter = await this.getExtendedInfoFilter(queryDto);
    return await this.firebird.query<ExtendedInformationViewModel[]>(`
    SELECT RAZN_OD_KEY, MAM, NOMER
    FROM  RAZN_OD_SEL(1, null) 
    WHERE ${extendedInfoFilter};`);
  }

  async getRelatedDataById(
    extendedInfoId: number
  ): Promise<RelatedDataViewModel> {
    const relatedData = await this.firebird.query<RelatedDataViewModel>(
      `
    SELECT RAZN_OD_EXT_KEY, 
	       RAZN_OD_ID,
	       GPS_ON,
	       GPS_MEHAN, 
	       GPS_ID,
	       GPS_DATE,
	       KOL_SHIN,
	       KOL_AKKUM,
	       SCAN_CODE,
	       DELTA_PROBEG,
	       PERIOD_TO,
	       PERIOD_TO_H,
	       AGR_TO1,
	       ZAM_M_G,
	       ZAM_M_T,
	       PERIOD_TO2,
	       PERIOD_TO2_H,
	       AGR_TO2
FROM RAZN_OD_EXT 
WHERE RAZN_OD_ID = ?;`,
      [extendedInfoId]
    );

    return relatedData[0];
  }

  async getTechnicalCharacteristicById(
    extendedInfoId: number
  ): Promise<TechnicalCharacteristicViewModel> {
    const technicalCharacteristic =
      await this.firebird.query<TechnicalCharacteristicViewModel>(
        `
    SELECT RAZN_OD_EXT_KEY, 
           RAZN_OD_ID,
           GAR_NO,
           INV_NO,
           GOD_VIP,
           COLOR,
           MAX_MASSA,
           GRUZOP,
           VIN,
           KAT,
           KAT_SPEC,
           MESTO_RAZM,
           KATEG_TS,
           TIP_TS,
           MODEL,
           PRIMENENIE,
           TIP_TEHN_ASU_ODS,
           MOD_DV,
           N_DV,
           MOSHN,
           OB_DV,
           N_KUZ,
           N_SHAS,
           PROIZV,
           KOL_POSAD_MEST,
           VMEST_CHEL,
           KAT_VMEST,
           V_BAK,
           PROBEG_DO_AP,
           N_KOR_PERED,
           OSN_VED_MOST,
           KLASSIFIKATOR,
           EKO_STANDART,
           SEZON,
           S_ZIMA,
           S_LETO
FROM RAZN_OD_EXT 
WHERE RAZN_OD_ID = ?;`,
        [extendedInfoId]
      );
    return technicalCharacteristic[0];
  }

  async getDocumentationById(
    extendedInfoId: number
  ): Promise<DocumentationByIdViewModel> {
    const documentation = await this.firebird.query<DocumentationByIdViewModel>(
      `
    SELECT RAZN_OD_EXT_KEY, 
           RAZN_OD_ID,
           N_AKT, 
           N_AKT_DATE, 
           PRIKAZ_N, 
           PRIKAZ_N_DATE, 
           DISL, 
           OTV_ITR, 
           PRIKAZ_BAL, 
           PRIKAZ_BAL_DATE, 
           BAL_STOIM, 
           NORMA_PROB,             
           AMORTIZ,
           DATE_VIBIT,
           SVID_REG, 
           DATA_REG, 
           PASP, 
           DATA_VID,
           KEM_VID, 
           GTO,   
           GTO_DO, 
           STRAH_SVID, 
           STRAH_SVID_DATE_OT, 
           STRAH_SVID_DATE, 
           REG_N_GPM, 
           DATE_P_TAHOGRAFA
FROM RAZN_OD_EXT 
WHERE RAZN_OD_ID = ?;`,
      [extendedInfoId]
    );
    return documentation[0];
  }

  async getTimingById(
    extendedInfoId: number
  ): Promise<DocumentationTimingControlViewModel[]> {
    return this.firebird.query<DocumentationTimingControlViewModel[]>(
      `
    SELECT * 
    FROM RAZN_OD_DOCS
    WHERE RAZN_OD_ID = ?;
    `,
      [extendedInfoId]
    );
  }

  async getRefuelingCardsById(
    extendedInfoId: number
  ): Promise<DocumentationRefuelingCardsByIdViewModel[]> {
    const extendedInfoById = await this.firebird.query<
      DocumentationRefuelingCardsByIdViewModel[]
    >(
      `
    SELECT * 
    FROM RAZN_OD_ZAPR_CARDS 
    WHERE RAZN_OD_ID = ?;`,
      [extendedInfoId]
    );
    return extendedInfoById;
  }

  async getNotInDemandInfo(
    extendedInfoId: number
  ): Promise<AdditionalInfoNotInDemandViewModel[]> {
    return this.firebird.query<AdditionalInfoNotInDemandViewModel[]>(
      `
    SELECT *
    FROM RAZN_OD_NE_VOSTR RAZ
    WHERE  RAZN_OD_ID = ?
    ORDER BY DATE_OT DESC`,
      [extendedInfoId]
    );
  }

  async getConservation(
    extendedInfoId: number
  ): Promise<AdditionalInfoConservationViewModel[]> {
    return this.firebird.query<AdditionalInfoConservationViewModel[]>(
      `
    SELECT *
    FROM RAZN_OD_KONSERV RAZ
    WHERE RAZN_OD_ID = ?
    ORDER BY DATE_OT DESC;`,
      [extendedInfoId]
    );
  }

  async getPasses(extendedInfoId: number): Promise<PassesViewModel[]> {
    return this.firebird.query<PassesViewModel[]>(
      `
    SELECT *
    FROM PROPUSK
    WHERE RAZN_OD_ID = ?;
    `,
      [extendedInfoId]
    );
  }

  async getDriverHolding(
    extendedInfoId: number
  ): Promise<DriverHoldingViewModel[]> {
    return this.firebird.query<DriverHoldingViewModel[]>(
      `
    SELECT *
    FROM  RAZN_OD_ZAKR
    WHERE RAZN_OD_ID = ?
    ORDER BY DATES DESC`,
      [extendedInfoId]
    );
  }

  async getCarEquipment(
    extendedInfoId: number
  ): Promise<CarEquipmentViewModel[]> {
    return this.firebird.query<CarEquipmentViewModel[]>(
      `
    SELECT *
    FROM RAZN_OD_KOMPL 
    WHERE RAZN_OD_ID = ?`,
      [extendedInfoId]
    );
  }

  async getAcquisitionActs(
    extendedInfoId: number
  ): Promise<AcquisitionActViewModel[]> {
    return this.firebird.query<AcquisitionActViewModel[]>(
      `
    SELECT  * 
    FROM RAZN_AKT_KOMPL(?) 
    ORDER BY NAIM`,
      [extendedInfoId]
    );
  }

  async getMechanismTypes(): Promise<DirectoriesMechanismTypesViewModel[]> {
    return this.firebird.query<DirectoriesMechanismTypesViewModel[]>(`
SELECT * 
FROM W_RAZN_T_T 
WHERE RAZN_T_T_KEY <> -3 
ORDER BY T_T`);
  }

  async getNotes(): Promise<DirectoriesNotesViewModel[]> {
    return this.firebird.query<DirectoriesNotesViewModel[]>(`
    SELECT *  
    FROM W_RAZN_STAND_PRIM  
    ORDER BY STAND_PRIM`);
  }

  async getAddresses(): Promise<DirectoriesAddressesViewModel[]> {
    return this.firebird.query<DirectoriesAddressesViewModel[]>(`
    SELECT * 
    FROM W_RAZN_ADRESS 
    ORDER BY ADRESS`);
  }

  async getGoodsType(): Promise<DirectoriesGoodsTypeViewModel[]> {
    return this.firebird.query<DirectoriesGoodsTypeViewModel[]>(`
    SELECT * 
    FROM W_RAZN_TIP_GRUZ 
    ORDER BY TIP_GRUZ
    `);
  }

  async getTransportationType(): Promise<
    DirectoriesTransportationTypeViewModel[]
  > {
    return this.firebird.query<DirectoriesTransportationTypeViewModel[]>(`
    SELECT * 
    FROM W_RAZN_VID_PEREV 
    ORDER BY RAZN_VID_PEREV_KEY
    `);
  }

  async getCommunicationType(): Promise<
    DirectoriesCommunicationTypeViewModel[]
  > {
    return this.firebird.query<DirectoriesCommunicationTypeViewModel[]>(`
    SELECT * 
    FROM W_RAZN_VID_SOOBSH 
    ORDER BY RAZN_VID_SOOBSH_KEY
    `);
  }

  private getExtendedInfoFilter(queryDto: ExtendedInfoDto) {
    let filter = `NOMER IS NOT NULL`;
    if (queryDto.brand)
      filter += ` AND UPPER(MAM) LIKE UPPER('%${queryDto.brand}%')`;
    if (queryDto.number)
      filter += ` AND UPPER(NOMER) LIKE UPPER('%${queryDto.number}%')`;
    if (queryDto.vin)
      filter += ` AND UPPER(VIN) LIKE UPPER('%${queryDto.vin}%')`;
    if (queryDto.navigatorId)
      filter += ` AND UPPER(GPS_ID) LIKE UPPER('%${queryDto.navigatorId}%')`;
    return filter;
  }

  private getEquipmentListFilter(queryDto: EquipmentListDto): string {
    let filter;
    switch (queryDto.motorcadeNumber) {
      case EquipmentListEnum.first:
        filter = `'Автоколонна №1'`;
        break;
      case EquipmentListEnum.second:
        filter = `'Автоколонна №2'`;
        break;
      //default: filter = `(NAME_AK = 'Автоколонна №1' OR NAME_AK = 'Автоколонна №2')`;
    }

    if (queryDto.brand)
      filter += ` AND UPPER(MAM) LIKE UPPER('%${queryDto.brand}%')`;
    if (queryDto.number)
      filter += ` AND UPPER(NOMER) LIKE UPPER('%${queryDto.number}%')`;
    return filter;
  }
}
