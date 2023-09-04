import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";

export class OrganizationDto {
  @ApiProperty({
    description: "Organization ID",
  })
  @IsOptional()
  @IsNumber()
  DATA_KEY: number = null;

  @ApiProperty({
    description: "Full name of the customer",
  })
  @IsNotEmpty()
  @IsString()
  ZAK_: string = null;

  @ApiProperty({
    description: "№ price",
  })
  @IsNotEmpty()
  @IsNumber()
  KAT: number = null;

  @ApiProperty({
    description: "Calculation method",
  })
  @IsNotEmpty()
  @IsNumber()
  METOD: number = null;

  @ApiProperty({
    description: "Category name",
  })
  @IsNotEmpty()
  @IsNumber()
  N_KAT: number = null;

  @ApiProperty({
    description: "№ contract ",
  })
  @IsOptional()
  @IsString()
  DOGOVOR: string = null;

  @ApiProperty({
    description: "Date of conclusion of the contract",
  })
  @IsOptional()
  @IsString()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  D_DATE: string = null;

  @ApiProperty({
    description: "Position of the head",
  })
  @IsOptional()
  @IsString()
  DOLGN: string = null;

  @ApiProperty({
    description: "FIO of the head",
  })
  @IsOptional()
  @IsString()
  D_FIO: string = null;

  @ApiProperty({
    description: "Place of occurrence of costs (deprecated)",
  })
  @IsOptional()
  @IsNumber()
  MVZ: number = null;

  @ApiProperty({
    description: "Short name of the customer",
  })
  @IsOptional()
  @IsString()
  LNAME: string = null;

  @ApiProperty({
    description: "Archive",
  })
  @IsOptional()
  @IsBoolean()
  ARHIV = false;

  @ApiProperty({
    description: "Require the input of types of work",
  })
  @IsOptional()
  @IsBoolean()
  VID_RAB = false;

  @ApiProperty({
    description: "Remove",
  })
  @IsOptional()
  @IsBoolean()
  DEL = false;

  @ApiProperty({
    description: "INN",
  })
  @IsOptional()
  @IsString()
  INN: string = null;

  @ApiProperty({
    description: "Contract ID from 1C",
  })
  @IsOptional()
  @IsString()
  FROM_1C_ID: string = null;

  @ApiProperty({
    description: "The ID of the subconto code from 1C",
  })
  @IsOptional()
  @IsString()
  FROM_1C_SUBCONTO: string = null;

  @ApiProperty({
    description: "Address",
  })
  @IsOptional()
  @IsString()
  ADRESS: string = null;

  @ApiProperty({
    description: "Postal address",
  })
  @IsOptional()
  @IsString()
  POCHT_ADRESS: string = null;

  @ApiProperty({
    description: "Global",
  })
  @IsOptional()
  @IsNumber()
  GLOBAL_ZAK: number = null;

  @ApiProperty({
    description: "Hide from the order",
  })
  @IsOptional()
  @IsBoolean()
  ARHIV_RAZN = false;

  @ApiProperty({
    description: "Customer's geofences",
  })
  @IsOptional()
  @IsString()
  GEOZONES_LIST: string = null;

  @ApiProperty({
    description: 'Checkpoint ("КПП")',
  })
  @IsOptional()
  @IsString()
  KPP: string = null;

  static dto(data: any): OrganizationDto {
    const organizationDto = new OrganizationDto();
    return objectFieldFilter<OrganizationDto>(data, organizationDto);
  }
}
