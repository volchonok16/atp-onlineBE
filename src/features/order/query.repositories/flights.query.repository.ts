import { Injectable } from "@nestjs/common";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { GetEquipmentsDto } from "../dto/query.dtos/getEquipments.dto";
import { FlightsViewModel } from "../models/flights.views/flightsView.model";

@Injectable()
export class FlightsQueryRepository {
  constructor(private firebird: FirebirdService) {}

  async getFlights(dto: GetEquipmentsDto): Promise<FlightsViewModel[]> {
    return this.firebird.query(`SELECT * FROM  RAZN_OD_SEL(?, ?)`, [
      dto.column,
      dto.id,
    ]);
  }
}
