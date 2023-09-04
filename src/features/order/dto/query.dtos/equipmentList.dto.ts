import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { EquipmentListEnum } from "../../types/equipmentList.enum";

export class EquipmentListDto {
  @ApiPropertyOptional({ description: "State car number" })
  @IsOptional()
  @IsString()
  number: string;

  @ApiPropertyOptional({ description: "The car model" })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsEnum(EquipmentListEnum)
  motorcadeNumber: EquipmentListEnum;
}
