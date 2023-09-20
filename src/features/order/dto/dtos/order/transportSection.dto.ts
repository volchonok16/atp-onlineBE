import { TransportSectionView2 } from "../../../models/order.views/transportSectionView2.model";
import { ApiProperty } from "@nestjs/swagger";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { constants } from "../../../../../common/constants/dataBaseField.constants";

export class TransportSectionDto implements TransportSectionView2 {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(constants.idLength)
  TTN_TRANSP_KEY: number = null;

  @ApiProperty({ example: 22 })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(constants.idLength)
  TTN_ID: number = null;

  @ApiProperty({ description: "Short name of the cargo", example: "Any name" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.naim)
  NAIM: string = null;

  @ApiProperty({ description: "Type of packaging", example: "42" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.vidUpak)
  VID_UPAK: string = null;

  @ApiProperty({
    description: "Documents accompany the cargo",
    example: "Any string",
  })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.docs)
  DOCS: string = null;

  @ApiProperty({ description: "Number of seats", example: "Any string" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.mest)
  MEST: number = null;

  @ApiProperty({
    description: "Method for determining mass",
    example: "Any string",
  })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.sposob)
  SPOSOB: string = null;

  @ApiProperty({ description: "Cargo code", example: "Any string" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.code)
  CODE: string = null;

  @ApiProperty({ description: "Container number", example: "Any string" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.nKont)
  N_KONT: string = null;

  @ApiProperty({ description: "Cargo class", example: "Any string" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnTransp.klass)
  KLASS: string = null;

  @ApiProperty({ description: "Gross weight, t", example: 42 })
  @IsOptional()
  @IsNumber()
  @MaxLength(constants.numeric)
  MASSA: number = null;

  static dto(data: any): TransportSectionDto {
    const transportSectionDto = new TransportSectionDto();
    return objectFieldFilter<TransportSectionDto>(data, transportSectionDto);
  }
}
