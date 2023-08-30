import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Archive } from '../../types/archive.enum';
import { booleanToShortString } from '../../../../common/helpers/booleanToShortStringTransform';
import { Transform, Type } from 'class-transformer';

export class CarsInfoInputDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @Transform(({ value }) => eval(value))
  archive = false;

  @ApiPropertyOptional({ description: 'State car number' })
  @IsOptional()
  @IsString()
  number: string;

  @ApiPropertyOptional({ description: 'The car model' })
  @IsOptional()
  @IsString()
  brand: string;
}
