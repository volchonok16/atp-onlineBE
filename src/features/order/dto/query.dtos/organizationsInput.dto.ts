import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Archive } from "../../types/archive.enum";
import { Transform } from "class-transformer";

export class OrganizationsInputDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @Transform(({ value }) => eval(value))
  archive = false;

  @ApiPropertyOptional({ description: "The organization short name" })
  @IsString()
  @IsOptional()
  shortName: string;
}
