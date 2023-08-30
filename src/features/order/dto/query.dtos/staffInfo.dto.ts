import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class StaffInfoDto {
  @ApiPropertyOptional({ description: 'The staff surname' })
  @IsOptional()
  @IsString()
  surname: string;
}
