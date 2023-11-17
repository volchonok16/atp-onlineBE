import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorEntity } from "../../providers/postgres/entities";
import { Repository } from "typeorm";
import { PaginationQuery } from "./pagination.query";

@Injectable()
export class ErrorRepository {
  constructor(
    @InjectRepository(ErrorEntity)
    private readonly errorRepository: Repository<ErrorEntity>
  ) {}

  async saveError(error: Partial<ErrorEntity>) {
    await this.errorRepository.save(error);
  }

  async getErrors(query: PaginationQuery) {
    const { pageNumber, sortBy } = query;
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;

    return await this.errorRepository.query(`
SELECT * FROM errors
ORDER BY "${sortBy}" DESC
LIMIT ${pageSize} OFFSET ${skip};
`);
  }
}
