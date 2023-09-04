import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateInternshipDto {
  @ApiProperty()
  @IsString()
  DN = "2023-08-14";
  @ApiProperty()
  @IsString()
  DK = "2023-08-14";
}
