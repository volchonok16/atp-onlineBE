import { UserType } from "../types/user.type";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  password: string;

  constructor(userDto: UserType) {
    this.id = userDto.USERS_KEY;
    this.username = userDto.USER_NAME;
    this.password = userDto.PASS;
  }
}
