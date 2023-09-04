import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class OrganizationsListInputDto {
  @ApiPropertyOptional({ description: "The organization short name" })
  @IsString()
  @IsOptional()
  shortName: string;
}
