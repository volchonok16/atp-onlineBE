import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOtherEquipmentsAndObjectsForTableDocsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  RAZN_OD_DOCS_KEY: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  RAZN_OD_ID: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  NAIM: string;
  @ApiProperty({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  NOMER: string;
  @ApiProperty({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  KEM_VID: string;
  @ApiProperty({ example: "2017-06-01", nullable: true })
  @IsOptional()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATE_OT: Date;
  @ApiProperty({ example: "2017-06-01" })
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATE_DO: Date;
  @ApiProperty({ nullable: true })
  @IsOptional()
  D_PREDUPR: number;

  static dto(data: any): UpdateOtherEquipmentsAndObjectsForTableDocsDto {
    const updateOtherEquipmentsAndObjectsForTableDocsDtoDto =
      new UpdateOtherEquipmentsAndObjectsForTableDocsDto();
    return objectFieldFilter<UpdateOtherEquipmentsAndObjectsForTableDocsDto>(
      data,
      updateOtherEquipmentsAndObjectsForTableDocsDtoDto
    );
  }
}
