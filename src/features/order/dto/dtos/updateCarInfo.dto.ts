import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Archive } from "../../types/archive.enum";
import { objectFieldFilter } from "../../../../common/helpers/objectFieldFilter";

export class UpdateCarInfoDto {
  @ApiProperty()
  M_AM: string = null;

  @ApiProperty()
  NAVTO: string = null;

  @ApiPropertyOptional()
  LM_AM: string = null;

  @ApiProperty()
  ARHIV: boolean = null;

  @ApiPropertyOptional()
  RAZN_OD_ID: number = null;

  @ApiPropertyOptional()
  NRT_PODJOM: number = null;

  @ApiPropertyOptional()
  NRT_CH_OSN_DVIG_L: number = null;

  @ApiPropertyOptional()
  NRT_CH_OSN_DVIG_Z: number = null;

  @ApiPropertyOptional()
  RCH: number = null;

  @ApiPropertyOptional()
  RCH_Z: number = null;

  @ApiPropertyOptional()
  RPROG_Z: number = null;

  @ApiPropertyOptional()
  RPROG_L: number = null;

  @ApiPropertyOptional()
  NRT_L: number = null;

  @ApiPropertyOptional()
  NRT_Z: number = null;

  @ApiPropertyOptional()
  NRT_GRUZ_L: number = null;

  @ApiPropertyOptional()
  NRT_GRUZ_Z: number = null;

  @ApiPropertyOptional()
  NRT_L_MG: number = null;

  @ApiPropertyOptional()
  NRT_Z_MG: number = null;

  @ApiPropertyOptional()
  TOPL: string = null;

  @ApiPropertyOptional()
  FROM_1C_ID: string = null;

  static dto(data: any): UpdateCarInfoDto {
    const organizationDto = new UpdateCarInfoDto();
    return objectFieldFilter<UpdateCarInfoDto>(data, organizationDto);
  }
}
