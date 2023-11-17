import { IsIn, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetRaznarWeekDto {
  @ApiProperty({ example: "01.06.2017" })
  @IsString()
  @Matches("^\\d{2}.\\d{2}.\\d{4}$")
  date: string;
  @IsString()
  @ApiProperty()
  @IsIn(["0", "1", "2"])
  column: string;
}
