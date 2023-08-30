import { ApiProperty } from '@nestjs/swagger';
import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class UpdateImageDto {
  @ApiProperty()
  TEXT: string | null = 'text';

  @ApiProperty()
  DATE_DO: string | null = '2023-12-15';

  @ApiProperty()
  USER_NAME: string | null = null;

  static dto(data: any) {
    const imageDto = new UpdateImageDto();
    return objectFieldFilter(data, imageDto);
  }
}
