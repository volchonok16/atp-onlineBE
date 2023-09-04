import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FlightsDto {
  @ApiPropertyOptional({ description: "The flight name" })
  @IsOptional()
  @IsString()
  name: string;
}
