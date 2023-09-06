import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from "class-validator";
import { constants } from "../../../../../common/constants/dataBaseField.constants";

export class PrepareOutputDataDto {
  @ApiProperty({ description: "Equipment ID" })
  @IsNumber()
  @MaxLength(constants.idLength)
  @IsNotEmpty()
  RAZN_OD_ID: number = null;
  @ApiProperty({ description: "FIO ID" })
  @IsNumber()
  @MaxLength(constants.idLength)
  @IsOptional()
  FIO_ID: number = null;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  REMONT = false;
  @ApiProperty({ description: "" })
  @IsBoolean()
  @IsOptional()
  B_VOD = false;
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(constants.dateLength)
  DATS: Date; //
  @ApiProperty()
  @IsOptional()
  @MaxLength(constants.dateLength)
  END_DATE: Date; //
  @ApiProperty({ description: "Type of transportation" })
  @IsOptional()
  @MaxLength(constants.raznar.vidPerev)
  VID_PEREV: Date; //
  @ApiProperty({ description: "Message type" })
  @IsOptional()
  @MaxLength(constants.raznar.vidSoob)
  VID_SOOB: string;
}
