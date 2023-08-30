import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ExtendedInfoDto {
  @ApiPropertyOptional({ description: 'State car number' })
  @IsOptional()
  @IsString()
  number: string;

  @ApiPropertyOptional({ description: 'The car model' })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vin: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  navigatorId: string;
}
