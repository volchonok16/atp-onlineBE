import { ProductSectionView } from "../../../models/order.views/productSectionView.model";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";
import { constants } from "../../../../../common/constants/dataBaseField.constants";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class ProductSectionDto implements ProductSectionView {
  @ApiProperty({ example: 22 })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(constants.idLength)
  TTN_ID: number = null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @MaxLength(constants.idLength)
  TTN_EXT_KEY: number = null;

  @ApiProperty({ description: "Price list number", example: "Any string" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnExt.nomPrice)
  NOM_PRICE: string = null;

  @ApiProperty({ description: "Vendor code", example: "Any string" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnExt.arcticul)
  ARTICUL: string = null;

  @ApiProperty({ description: "Count", example: 42 })
  @IsOptional()
  @IsNumber()
  @MaxLength(constants.ttnExt.numeric)
  KOL: number = null;

  @ApiProperty({ description: "Price", example: 9.99 })
  @IsOptional()
  @IsNumber()
  @MaxLength(constants.ttnExt.numeric)
  CENA: number = null;

  @ApiProperty({ description: "Name", example: "Name" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnExt.naim)
  NAIM: string = null;

  @ApiProperty({ description: "Unit", example: "Parrots" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnExt.edIzm)
  ED_IZM: string = null;

  @ApiProperty({
    description: "Type of packaging",
    example: "Factory packaging",
  })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnExt.upacovka)
  UPAKOVKA: string = null;

  @ApiProperty({ description: "Number of seats", example: "Mnogo" })
  @IsOptional()
  @IsString()
  @MaxLength(constants.ttnExt.mest)
  MEST: string = null;

  @ApiProperty({ description: "Weight", example: 3 })
  @IsOptional()
  @IsNumber()
  @MaxLength(constants.ttnExt.numeric)
  MASSA: number = null;

  static dto(data: any): ProductSectionDto {
    const productSectionDto = new ProductSectionDto();
    return objectFieldFilter<ProductSectionDto>(data, productSectionDto);
  }
}
