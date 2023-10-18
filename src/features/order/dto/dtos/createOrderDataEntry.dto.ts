import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";

export class CreateOrderDataEntryDto {
  @IsNumber()
  RAZN_OD_ID: number;
  @IsOptional()
  @IsNumber()
  RAZN_OD_ID_PRICEP: number;
  @IsNumber()
  @IsOptional()
  FIO_id: number;
  @IsNumber()
  @IsOptional()
  FIO2_id: number;
  @ApiProperty({ example: "01-06-2017" })
  @IsString()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATS: Date;
  @ApiProperty({ example: "01-06-2017" })
  @IsString()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  @IsOptional()
  END_DATE: Date;

  static dto(data: any): CreateOrderDataEntryDto {
    const result = { ...data };
    return objectFieldFilter(result, new CreateOrderDataEntryDto());
  }
}
