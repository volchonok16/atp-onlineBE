import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty()
  FILE_: Blob;

  @ApiProperty()
  TEXT: string | null = 'text';

  @ApiProperty()
  DATE_DO: string | null = '2023-12-15';

  @ApiProperty()
  USER_NAME: string | null = null;

  @ApiProperty()
  FILE_NAME: string | null = null;
}
