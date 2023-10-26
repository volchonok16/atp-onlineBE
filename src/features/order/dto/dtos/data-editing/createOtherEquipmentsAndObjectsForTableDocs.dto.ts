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

export class CreateOtherEquipmentsAndObjectsForTableDocsDtoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  RAZN_OD_DOCS_KEY: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  MAS_SKLAD_OBJ_SPIS_KEY: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  NAIM: string;
  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  NOMER: string;
  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  KEM_VID: string;
  @ApiProperty({ example: "01-06-2017" })
  @IsOptional()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATE_OT: Date;
  @ApiProperty({ example: "01-06-2017" })
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATE_DO: Date;
  @ApiProperty()
  @IsOptional()
  D_PREDUPR: number;

  static dto(data: any): CreateOtherEquipmentsAndObjectsForTableDocsDtoDto {
    const createOtherEquipmentsAndObjectsForTableDocsDtoDto =
      new CreateOtherEquipmentsAndObjectsForTableDocsDtoDto();
    return objectFieldFilter<CreateOtherEquipmentsAndObjectsForTableDocsDtoDto>(
      data,
      createOtherEquipmentsAndObjectsForTableDocsDtoDto
    );
  }
}
