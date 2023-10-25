import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class CreateOtherEquipmentsAndObjectsDto {
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
  @MaxLength(50)
  DESCR: string;
  @ApiProperty({ example: "01-06-2017" })
  @IsOptional()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATE_VVODA: Date;

  static dto(data: any): CreateOtherEquipmentsAndObjectsDto {
    const createOtherEquipmentsAndObjectsDto =
      new CreateOtherEquipmentsAndObjectsDto();
    return objectFieldFilter<CreateOtherEquipmentsAndObjectsDto>(
      data,
      createOtherEquipmentsAndObjectsDto
    );
  }
}
