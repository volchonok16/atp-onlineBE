import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";

export class GetEquipmentsDto {
  @ApiProperty()
  @IsOptional()
  id: number | null = null;
  @ApiProperty()
  @IsIn(["0", "1", "2"])
  column: number;
}
