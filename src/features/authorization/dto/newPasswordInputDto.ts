import { IsNotEmpty, IsString, Length } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class NewPasswordInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  newPassword: string;
}
