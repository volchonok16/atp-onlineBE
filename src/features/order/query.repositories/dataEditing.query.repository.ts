import { Injectable } from "@nestjs/common";
import { CarsInfoInputDto } from "../dto/query.dtos/carInfoInput.dto";
import { CarsInfoViewModel } from "../models/order.views/carsInfoView.model";
import { StaffInfoDto } from "../dto/query.dtos/staffInfo.dto";
import { StaffInfoViewModel } from "../models/order.views/staffInfoViewModel";
import { StaffRefuelingCardsViewModel } from "../models/order.views/staffRefuelingCardsView.model";
import { StaffAdditionalInfoViewModel } from "../models/order.views/staffAdditionalInfoView.model";
import { OrganizationsInputDto } from "../dto/query.dtos/organizationsInput.dto";
import { OrganizationsViewModel } from "../models/order.views/organizationsView.model";
import { OrganizationViewModel } from "../models/dataEditing.views/organizationView.model";
import { OrganizationsListInputDto } from "../dto/query.dtos/organizationListInput.dto";
import { OrganizationsListViewModel } from "../models/order.views/organizationsListView.model";
import { OrganizationSubunitViewModel } from "../models/order.views/organizationSubunitView.model";
import { OrganizationExecuteViewModel } from "../models/order.views/organizationExecuteView.model";
import { OtherEquipmentViewModel } from "../models/order.views/otherEquipmentView.model";
import { EquipmentsDocViewModel } from "../models/order.views/equipmentsDocView.model";
import { FlightsDto } from "../dto/query.dtos/flights.dto";
import { FlightsViewModel } from "../models/order.views/flightsView.model";
import { NoteViewModel } from "../models/dataEditing.views/noteView.model";
import { PriceViewModel } from "../models/dataEditing.views/priceViewModel";
import { WithId } from "../../../common/types/withId.type";
import { ArchiveOrNotArchiveQuery } from "../dto/query.dtos/noteQuery.dto";
import { booleanToShortString } from "../../../common/helpers/booleanToShortStringTransform";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { rawDbResponseTransform } from "../../../common/helpers/rawDbResponseTransform.helper";

@Injectable()
export class DataEditingQueryRepository {
  constructor(private firebird: FirebirdService) {}

  async getCarsInfo(queryDto: CarsInfoInputDto): Promise<CarsInfoViewModel[]> {
    //create cars info filter
    const carsInfoFilter = this.getCarsInfoFilter(queryDto);
    //get array of cars info
    const carsInfo = await this.firebird.query(
      `
        SELECT * 
        FROM OD_sel 
        WHERE  ${carsInfoFilter}`
    );
    return carsInfo.map((e) => new CarsInfoViewModel(e));
  }

  async getStaffInfo(queryDto: StaffInfoDto): Promise<StaffInfoViewModel[]> {
    //create staff info filter
    const staffInfoFilter = await this.getStaffInfoFilter(queryDto);

    //get array of staff info
    const staffInfo = await this.firebird.query<StaffInfoViewModel[]>(
      `
        SELECT fs.FIO_KEY, fs.FIO, fs.AUTO_ID, fs.ORG_ID, fs.MAM, fs.ARHIV,
           fs.USE_OF_RAZN, fs.FULL_FIO, fs.EKIPAG,fs.N_IN_EGIPAG,fs.FROM_1C_ID,
           fs.UDOST, fs.DATE_UDOST, fs.M_AM, fs.TEL, fs.DATE_SPRAV, fs.DATE_UDOST_SPEC,
           fs.UDOST_SPEC, fs.NAVTO, fs.ORG, fs.PREDUPR, fs.DOPOK_DATE, fs.K_VOD_DATE,
           fs.INFO, fs.STAGIROVKA_PERIOD, 
           fe.KEY_ID, fe.SETUP_ID, fe.SCAN_CODE, fe.PRIM, fe.KARTA_TAHO, fe.DATE_KARTA_TAHO,
           fe.TIP_VODIT, fe.TIP_DISPET, fe.TIP_VRACH, fe.TIP_REMONT, fe.TIP_CONTROL,
           fe.TIP_KONDUKTOR, fe.TIP_NACH_A_K, fe.N_CARD_TAHOGRAF, fe.DATE_CARD_TAHOGRAF,
           fe.ZP_FROM_1C_GROUP_ID, fe.KAT_S_AI,fe.KAT_S_AII, fe.KAT_S_AIII, fe.KAT_S_AIV,
           fe.KAT_S_B, fe.KAT_S_C, fe.KAT_S_D, fe.KAT_S_E, fe.KAT_S_F, fe.KLASS, fe.KAT_A,
           fe.KAT_A1, fe.KAT_B, fe.KAT_BE, fe.KAT_B1, fe.KAT_C, fe.KAT_C1, fe.KAT_C1E,
           fe.KAT_CE, fe.KAT_D, fe.KAT_D1, fe.KAT_D1E, fe.KAT_DE, fe.KAT_E, fe.KAT_TM,
           fe.KAT_TB, fe.SETUP_ID, fe.KEY_ID, fe.FIO_EXT_KEY, fe.FIO_ID, fe.TAB_NO
        FROM FIO_SEL fs
        LEFT JOIN FIO_EXT fe 
        ON fs.FIO_KEY = fe.FIO_ID
        WHERE ${staffInfoFilter}`
    );

    return staffInfo.map((si) => StaffInfoViewModel.toView(si));
  }

  async getRefuelingCardsById(
    staffInfoId: number
  ): Promise<StaffRefuelingCardsViewModel | null> {
    const [staffInfoById] = await this.firebird.query<
      StaffRefuelingCardsViewModel[]
    >(
      `
        SELECT *
        FROM FIO_ZAPR_CARDS  
        WHERE FIO_ID = ?`,
      [staffInfoId]
    );

    return staffInfoById;
  }

  async getAdditionalInformationById(
    staffInfoId: number
  ): Promise<StaffAdditionalInfoViewModel | null> {
    const [staffInfoById] = await this.firebird.query<
      StaffAdditionalInfoViewModel[]
    >(
      `            
            SELECT *
            FROM FIO_DOCS 
            WHERE FIO_ID = ?
            ORDER BY DATE_DO DESC `,
      [staffInfoId]
    );

    return StaffAdditionalInfoViewModel.toView(staffInfoById);
  }

  async getOrganizations(
    queryDto: OrganizationsInputDto
  ): Promise<OrganizationsViewModel[]> {
    const organizationsFilter = this.getOrganizationsFilter(queryDto);

    const organizations = await this.firebird.query<OrganizationsViewModel[]>(`
        SELECT DATA_KEY, ZAK_, LNAME, KAT, N_KAT, METOD
        FROM W_DATA
        WHERE ${organizationsFilter} 
        ORDER BY LNAME
    `);
    return organizations;
  }

  async getOrganizationById(
    organizationId: number
  ): Promise<OrganizationViewModel> {
    const organization = await this.firebird.query<OrganizationViewModel>(
      `
    SELECT * 
    FROM DATA_EXT 
    WHERE DATA_ID = ?`,
      [organizationId]
    );

    return organization[0];
  }

  async getOrganizationList(
    dto: OrganizationsListInputDto
  ): Promise<OrganizationsListViewModel[]> {
    const organizationsFilter = this.getOrganizationsFilter(dto);
    const organizations = await this.firebird
      .query<OrganizationsListViewModel>(`
            SELECT DATA_KEY, LNAME
            FROM W_DATA
            WHERE ${organizationsFilter} 
            ORDER BY LNAME
    `);
    return organizations;
  }

  async getOrganizationSubunits(
    organizationId: number
  ): Promise<OrganizationSubunitViewModel[]> {
    const subunits = await this.firebird.query<OrganizationSubunitViewModel[]>(
      `
        SELECT * 
        FROM DATA_PODR
        WHERE DATA_ID = ?
        ORDER BY PODR`,
      [organizationId]
    );
    return subunits.map((s) => OrganizationSubunitViewModel.toView(s));
  }

  async getOrganizationExecutive(
    organizationId: number
  ): Promise<OrganizationExecuteViewModel[]> {
    const executive = await this.firebird.query<OrganizationExecuteViewModel[]>(
      `
        SELECT DATA_FIO_KEY, 
           DATA_ID, 
           DATA_PODR_ID, 
           FIO,
           DOLGN  
        FROM DATA_FIO
        WHERE DATA_ID = ?`,
      [organizationId]
    );
    return executive;
  }

  async getOtherEquipment(): Promise<OtherEquipmentViewModel[]> {
    const equipment = await this.firebird.query<OtherEquipmentViewModel[]>(`
                        SELECT * 
                        FROM SKLAD_OBJ_SPIS_SEL`);
    return equipment;
  }

  async getEquipmentById(
    equipmentId: number
  ): Promise<OtherEquipmentViewModel | null> {
    const [equipment] = await this.firebird.query<OtherEquipmentViewModel[]>(
      `
                    SELECT * 
                    FROM SKLAD_OBJ_SPIS_SEL
                    WHERE SKLAD_OBJ_SPIS_KEY = ?`,
      [equipmentId]
    );
    return equipment;
  }

  async getEquipmentDocs(
    equipmentId: number
  ): Promise<EquipmentsDocViewModel[]> {
    const equipmentDocs = await this.firebird.query<EquipmentsDocViewModel[]>(
      `
                SELECT * 
                FROM RAZN_OD_DOCS
                WHERE RAZN_OD_ID = ?`,
      [equipmentId]
    );
    return equipmentDocs;
  }

  async getFlights(queryDto: FlightsDto): Promise<FlightsViewModel[]> {
    const flightsFilter = this.getFlightsFilter(queryDto);
    const flights = await this.firebird.query<FlightsViewModel[]>(`
        SELECT * 
        FROM PL_ROUTE_SEL
        WHERE ${flightsFilter}`);
    return flights.map((f) => FlightsViewModel.toView(f));
  }

  async organizationExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT * FROM DATA WHERE DATA_KEY = ?;
    `,
      [id]
    );

    return !!result;
  }

  async noteExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT COUNT(*) FROM DATA_PRIM WHERE DATA_PRIM_KEY = ?;
    `,
      [id]
    );

    return result.COUNT > 0;
  }

  async subunitExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM DATA_PODR WHERE DATA_PODR_KEY = ?;`,
      [id]
    );

    return !!result;
  }

  async priceExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM DATA_CENA WHERE DATA_CENA_KEY = ?;`,
      [id]
    );

    return !!result;
  }

  async imageExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM FILES WHERE FILES_KEY = ?;`,
      [id]
    );

    return !!result;
  }

  async carInfoExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM OD WHERE OD_KEY = ?;`,
      [id]
    );

    return !!result;
  }

  async staffExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM FIO WHERE FIO_KEY = ?;`,
      [id]
    );

    return !!result;
  }

  async internshipExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT COUNT(*) FROM FIO_STAGIROVKA WHERE FIO_ID = ?;`,
      [id]
    );

    return result.COUNT > 1;
  }

  async staffCardExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM FIO_EXT WHERE FIO_ID = ?;`,
      [id]
    );

    return !!result;
  }

  async refuelingCardExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM FIO_ZAPR_CARDS WHERE FIO_ID = ?;`,
      [id]
    );

    return !!result;
  }

  async refuelingCardExistsById(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT COUNT(*) FROM FIO_ZAPR_CARDS WHERE FIO_ZAPR_CARDS_KEY = ?;`,
      [id]
    );

    return result.COUNT > 0;
  }

  async additionalInformationExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT * FROM FIO_DOCS WHERE FIO_DOCS_KEY = ?;`,
      [id]
    );

    return !!result;
  }

  async getImage(id: any) {
    const result = await this.firebird.query(
      `
        SELECT * FROM FILES WHERE FILES_KEY = ?;
      `,
      [id]
    );

    return result[0];
  }

  async getNote({
    id,
    ARHIV,
  }: WithId<ArchiveOrNotArchiveQuery>): Promise<NoteViewModel[]> {
    const result = await this.firebird.query(
      `
      SELECT * FROM DATA_PRIM WHERE DATA_ID = ? AND (SELECT ARHIV FROM DATA WHERE DATA_KEY = ?) = ?;
      ; 
    `,
      [id, id, booleanToShortString(ARHIV)]
    );

    return result.map((r) => NoteViewModel.toView(r));
  }

  async getPrices(id: number): Promise<PriceViewModel[]> {
    const result = await this.firebird.query(
      `
      SELECT * FROM DATA_CENA WHERE DATA_ID = ? 
       ORDER BY DATE_D DESC; 
    `,
      [id]
    );

    return result.map((r) => PriceViewModel.toView(r));
  }

  async fioExists(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `
      SELECT COUNT(*) FROM FIO WHERE FIO_KEY = ?;
    `,
      [id]
    );

    return result.COUNT > 0;
  }

  private getFlightsFilter(queryDto: FlightsDto) {
    if (queryDto.name) return `UPPER(ROUTE) LIKE UPPER('%${queryDto.name}%')`;
    return `ROUTE IS NOT NULL`;
  }

  private getCarsInfoFilter(queryDto: CarsInfoInputDto) {
    let archiveFilter = `ARHIV = '${booleanToShortString(queryDto.archive)}'`;

    if (queryDto.brand) {
      archiveFilter += ` and UPPER(M_AM) LIKE UPPER('%${queryDto.brand}%')`;
    }
    if (queryDto.number) {
      archiveFilter += ` and UPPER(NAVTO) LIKE UPPER('%${queryDto.number}%')`;
    }
    return archiveFilter;
  }

  private getOrganizationsFilter(
    queryDto: OrganizationsInputDto | OrganizationsListInputDto
  ) {
    let organizationsFilter = `DEL = '0'`;
    if (queryDto.shortName) {
      organizationsFilter += ` AND UPPER(LNAME) LIKE UPPER('%${queryDto.shortName}%')`;
    }
    if (queryDto instanceof OrganizationsInputDto) {
      organizationsFilter += ` AND ARHIV = '${booleanToShortString(
        queryDto.archive
      )}'`;
    }
    return organizationsFilter;
  }

  private async getStaffInfoFilter(queryDto: StaffInfoDto) {
    let staffInfoFilter = `DEL = 0`;
    if (queryDto.surname)
      staffInfoFilter += ` and UPPER(FIO) LIKE UPPER('%${queryDto.surname}%')`;
    return staffInfoFilter;
  }

  async getFlight(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT COUNT(*) FROM RAZN_OD WHERE RAZN_OD_KEY = ?`,
      [id]
    );
    return result.COUNT === 1;
  }

  async getDocs(id: number) {
    return this.firebird.query(
      `SELECT * FROM  RAZN_OD_DOCS where RAZN_OD_ID = ?`,
      [id]
    );
  }

  async checkDocsKey(id: number): Promise<boolean> {
    const [result] = await this.firebird.query(
      `SELECT COUNT(*) FROM RAZN_OD_DOCS WHERE RAZN_OD_DOCS_KEY = ?`,
      [id]
    );
    return result.COUNT === 1;
  }
}
