import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";

export class OutputDataDto {
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  RAZN_ID = 1750;
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  N_TTN: string;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(20)
  @IsOptional()
  usersWayBillNumber?: string | null;
}
