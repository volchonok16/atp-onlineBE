import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Archive } from '../../types/archive.enum';
import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class UpdateStaffInfoDto {
  @ApiProperty()
  FIO: string = null;
  @ApiPropertyOptional()
  ARHIV = false;
  @ApiPropertyOptional()
  USE_OF_RAZN = false;
  @ApiPropertyOptional()
  FULL_FIO: string = null;
  @ApiPropertyOptional()
  FROM_1C_ID: string = null;

  static dto(data: any): UpdateStaffInfoDto {
    const staffInfoDto = new UpdateStaffInfoDto();
    return objectFieldFilter<UpdateStaffInfoDto>(data, staffInfoDto);
  }
}
