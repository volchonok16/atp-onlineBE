import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestLogDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  DATE_RAB = '2022-08-11';
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  RAZN_ID: string | null = null;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  filterByCustomer: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  filterByOrder: string;
}
