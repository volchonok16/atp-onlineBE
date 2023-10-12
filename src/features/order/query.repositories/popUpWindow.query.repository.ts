import { Injectable } from "@nestjs/common";
import { EmployeeQueryDto } from "../dto/query.dtos/employe.query.dto";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";

@Injectable()
export class PopUpWindowQueryRepository {
  constructor(private firebird: FirebirdService) {}

  async getEquipments() {
    return await this.firebird.query(
      `SELECT MAM, NOMER FROM  RAZN_OD_SEL(1, null);`
    );
  }

  async getEmployeesSecondNames(dto: EmployeeQueryDto) {
    return await this.firebird.query(
      `SELECT FIO, FIO_KEY FROM fio_sel(?) where del=0;`,
      [dto.typeOfEmployee]
    );
  }

  async getCustomers() {
    return await this.firebird.query(`
    SELECT * FROM DATA_RAZN;
    `);
  }

  async getRoutes() {
    return await this.firebird.query(`
    select PL_ROUTE_KEY, ROUTE from W_PL_ROUTE where del = 0 order by ROUTE;
        `);
  }

  async getSubdivions(DATA_ID: string) {
    return await this.firebird.query(
      `
    select PODR from data_podr where data_id = ? and arhiv = 'F' order by podr;
        `,
      [+DATA_ID]
    );
  }

  async getCategories() {
    return await this.firebird.query(
      `
  SELECT PODR_KEY, PODR FROM W_PODR order by podr;
        `
    );
  }
}
