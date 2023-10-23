import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class CreateOtherEquipmentsAndObjectsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  SKLAD_OBJ_SPIS_KEY: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  MAM: string;
  @ApiProperty()
  @IsOptional()
  @MaxLength(15)
  NOMER: string;
  @ApiProperty()
  @IsOptional()
  DEL: number;
  @ApiProperty()
  @IsOptional()
  SETUP_ID: number;
  @ApiProperty()
  @IsOptional()
  @MaxLength(50)
  DESCR: string;
  @ApiProperty()
  @IsOptional()
  KEY_ID: number;
  @ApiProperty({ example: "01.06.2017" })
  @IsOptional()
  @Matches("^\\d{2}.\\d{2}.\\d{4}$")
  DATE_VVODA: Date;
  @ApiProperty()
  @IsOptional()
  @MaxLength(50)
  FROM_1C_ID: string;

  static dto(data: any): CreateOtherEquipmentsAndObjectsDto {
    const createOtherEquipmentsAndObjectsDto =
      new CreateOtherEquipmentsAndObjectsDto();
    return objectFieldFilter<CreateOtherEquipmentsAndObjectsDto>(
      data,
      createOtherEquipmentsAndObjectsDto
    );
  }
}
