import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidDate } from '../../../../common/decorators/isValidDate.decorator';
import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class UpdateCarForOrderDto {
  @ApiPropertyOptional()
  @IsString()
  @Matches('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
  @MaxLength(8)
  @IsOptional()
  VR_V: string | null;

  @ApiPropertyOptional()
  @IsString()
  @Matches('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
  @MaxLength(8)
  @IsOptional()
  VR_Z: string | null;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  @IsOptional()
  COMMENTAR: string | null;

  @ApiProperty({
    example: '2023-07-10',
    description: 'Date in the yyyy-MM-dd format or yyyy.MM.dd format',
    required: false,
  })
  @IsString()
  @IsValidDate()
  @IsOptional()
  END_DATE: Date | null;

  static dto(data: any): UpdateCarForOrderDto {
    const updateCarForOrderDto = new UpdateCarForOrderDto();
    return objectFieldFilter<UpdateCarForOrderDto>(data, updateCarForOrderDto);
  }
}
