import { Controller, Get, Query } from "@nestjs/common";
import { ErrorRepository } from "./error.repository";
import { ApiTags } from "@nestjs/swagger";
import { PaginationQuery } from "./pagination.query";

@Controller("administration")
export class AdministrationController {
  constructor(private readonly errorRepository: ErrorRepository) {}

  @Get()
  @ApiTags("Administration")
  async getErrors(@Query() query: PaginationQuery) {
    return await this.errorRepository.getErrors(query);
  }
}
