import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { constants } from "../../../../../common/constants/dataBaseField.constants";
import { Type } from "class-transformer";
import { currentDateTransform } from "../../../../../common/helpers/currentDateTransform.helper";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

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

  @ApiProperty({ description: "Without a driver" })
  @IsBoolean()
  @IsOptional()
  B_VOD = false;

  @ApiProperty({
    example: `${String(currentDateTransform())}`,
    description: "Date in the yyyy-MM-dd format",
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @MaxLength(constants.dateLength)
  DATS: Date = null;

  @ApiProperty({
    example: `${String(currentDateTransform())}`,
    description: "Date in the yyyy-MM-dd format",
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @MaxLength(constants.dateLength)
  END_DATE: Date = null;

  @ApiProperty({ description: "Type of transportation" })
  @IsString()
  @IsOptional()
  @MaxLength(constants.raznar.vidPerev)
  VID_PEREV: string = null;

  @ApiProperty({ description: "Message type" })
  @IsOptional()
  @MaxLength(constants.raznar.vidSoob)
  VID_SOOB: string = null;

  static dto(data: any): PrepareOutputDataDto {
    const result = { ...data };
    return objectFieldFilter(result, new PrepareOutputDataDto());
  }
}
