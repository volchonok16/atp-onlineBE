import { Injectable } from "@nestjs/common";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { CreateFlightDto } from "../dto/dtos/flights/createFlight.dto";
import { createQuery } from "../../../common/helpers/firebird-orm/create";
import { Razn_odViewModel } from "../models/flights.views/razn_odView.model";

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
}
