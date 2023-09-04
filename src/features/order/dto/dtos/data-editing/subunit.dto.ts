import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class SubunitDto {
  @ApiProperty({
    description: "Subunit ID",
  })
  @IsOptional()
  @IsNumber()
  DATA_PODR_KEY: number = null;

  @ApiProperty({
    description: "Subunit name",
  })
  @IsNotEmpty()
  @IsString()
  PODR = "";

  @ApiProperty({
    description: "Norm of time|weekdays",
  })
  @IsOptional()
  @IsString()
  NORMA: string = null;

  @ApiProperty({
    description: "Norm of time|day off",
  })
  @IsOptional()
  @IsString()
  NORMA_VIH: string = null;

  @ApiProperty({
    description: "Archive",
  })
  @IsOptional()
  @IsBoolean()
  ARHIV = false;

  static dto(data: any): SubunitDto {
    const subunitDto = new SubunitDto();
    return objectFieldFilter<SubunitDto>(data, subunitDto);
  }
}
