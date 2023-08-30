import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ArchiveOrNotArchiveQuery {
  @ApiProperty({
    description: 'Archive',
  })
  @IsOptional()
  @IsBoolean()
  ARHIV = false;
}
