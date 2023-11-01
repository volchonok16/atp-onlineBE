import { Injectable } from "@nestjs/common";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { CreateFlightDto } from "../dto/dtos/flights/createFlight.dto";
import { createQuery } from "../../../common/helpers/firebird-orm/create";
import { Razn_odViewModel } from "../models/flights.views/razn_odView.model";
import { UpdateFlightsDto } from "../dto/dtos/flights/updateFlights.dto";
import { getDataAccumulater } from "../../../common/helpers/getData.accumulater";

@Injectable()
export class FlightsRepository {
  constructor(private firebird: FirebirdService) {}

  async createEquipment(dto: CreateFlightDto): Promise<Razn_odViewModel> {
    const { query, parameters } = createQuery(
      "RAZN_OD",
      dto,
      new Razn_odViewModel()
    );
    return await this.firebird.query(query, parameters);
  }

  async updateEquipment(id: number, dto: UpdateFlightsDto): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      await this.firebird.query(
        `
      UPDATE RAZN_OD
         SET ${data}
       WHERE RAZN_OD_KEY = ?;
    `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteEquipment(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
      DELETE FROM RAZN_OD
       WHERE RAZN_OD_KEY = ?;
    `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
