import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationQuery {
  @ApiProperty({ default: 1 })
  @IsOptional()
  pageNumber: number;

  @ApiProperty({ default: "createdAt" })
  @IsOptional()
  sortBy: "method" | "createdAt";
}
